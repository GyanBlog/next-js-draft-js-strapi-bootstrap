import { getSession } from 'next-auth/client'
import axios from 'axios'

class ApiClient {

  async getAuthHeader () {
    let header = {}
    const session = await getSession();
    if (session.jwt) {
      header = {Authorization: `Bearer ${session.jwt}`};
    }
  
    return header;
  }

  async saveArticle(args) {
    console.log('Saving Article', args);
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/articles`, 
        {
          title: args.title,
          body: args.body
        },
        {
          headers: headers,
        }
      )
      return data;
    } catch (e) {
      return e;
    }
  }

  async updateArticle(args) {
    console.log('Updating Article', args);
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${args.id}`, 
        {
          title: args.title,
          body: args.body
        },
        {
          headers: headers,
        }
      )
      return data;
    } catch (e) {
      return e;
    }
  }

  async getArticleById(id) {
    try {
      let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`
      )
      return data;
    } catch (e) {
      return e;
    }
  }

  async getArticleBySlug(slug) {
    let {data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles?slug=${slug}`
    );
    return data;
  }

  async getArticles() {
    let {data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles`
    );
    return data;
  }

  async uploadInlineImageForArticle(file) {
    const headers = await this.getAuthHeader();
    const formData = new FormData();
    formData.append('files', file);
    try {
      let { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`, 
        formData,
        {
          headers: headers,
        }
      )
      return data;
    } catch (e) {
      console.log('caught error');
      console.error(e);
      return null;
    }
  }
}

module.exports = new ApiClient();
