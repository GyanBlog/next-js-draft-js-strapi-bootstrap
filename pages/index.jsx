import Head from 'next/head'
import SimpleLayout from '../components/layout/simple'
import apiClient from '../components/api/api_client'

export default function Home(initialData) {
  return (
    <SimpleLayout>
      <section className="jumbotron text-center">
        <div className="container">
          <h1>Subscribe to GyanBlog</h1>
          <p className="lead text-muted">
            Learn and Share
          </p>
        </div>
      </section>

      <div className="row">
      <div>
        {initialData.articles && initialData.articles.map((each, index) => {
          return(
            <div key={index}>
              <h3>{each.title}</h3>
              <p>{each.body}</p>
            </div>
          )
        })}
      </div>
      </div>
    </SimpleLayout>
  )
}

export async function getServerSideProps({req}) {
  try {
    let articles = await apiClient.getArticles();
    console.log(articles);
    return {props: {articles: articles}};
  } catch (e) {
    console.log('caught error');
    return {props: {articles: []}};
  }
}