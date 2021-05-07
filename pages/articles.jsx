import Link from 'next/link'
import SimpleLayout from '../components/layout/simple'
import ArticlesJumbo from '../components/jumbo/articles'
import apiClient from '../components/api/api_client'

export default function Articles(initialData) {
  return (
    <SimpleLayout preContainer={<ArticlesJumbo />}>
      <div className="row">
      {initialData.articles && initialData.articles.map((each, index) => {
          return(
            <div className="col-md-4" key={index}>
              <div className="card mb-4 shadow-sm">
                <Link href={`/articles/${each.slug}`}>
                  <a>
                  <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                  </a>
                </Link>
                <div className="card-body">
                  <h3>{each.title}</h3>
                  <p className="card-text">{each.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SimpleLayout>
  )
}

export async function getServerSideProps({req}) {
  return {props: {articles: await apiClient.getArticles()}}  
}