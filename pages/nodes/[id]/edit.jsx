import SimpleLayout from '../../../components/layout/simple'
import apiClient from '../../../components/api/api_client'
import EditArticle from '../../../components/editor/editArticle';

import React, { Component } from 'react'

export default class EditNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.article.id,
      title: props.article.title,
      body: props.article.body,
    };
  }

  render() {
    return (
      <SimpleLayout>
      <div className="row">
        <div className="col-8">
          <EditArticle 
            article={this.state}
          />
        </div>
        <div className="col-4">
          Hey
        </div>
      </div>
    </SimpleLayout>
    )
  }
}

export async function getServerSideProps(context) {
  try {
    let data = await apiClient.getArticleById(context.query.id);
    return {props: {
      article: data
    }}
  } catch(error) {
    return {props: {}}
  }
}