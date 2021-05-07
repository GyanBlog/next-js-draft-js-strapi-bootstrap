import SimpleLayout from '../../components/layout/simple'
import draftToHtml from 'draftjs-to-html';
import { useSession, getSession } from 'next-auth/client'
import React from 'react'
import Link from 'next/link'
import ErrorPage from 'next/error'
import contentProcessor from '../../components/helper/contentProcessor'
import apiClient from '../../components/api/api_client'

export default function Article(props) {
  if (props.error) {
    return <SimpleLayout>
      <ErrorPage statusCode={props.error.statusCode} />
    </SimpleLayout>
  }
  const [ session, loading ] = useSession();

  const body = draftToHtml(JSON.parse(props.body));
  const showEditOption = props.myArticle;
  return (
    <SimpleLayout>
      <h1>{props.title}</h1>
      {showEditOption && 
        <Link href={`/nodes/${props.id}/edit`}>
          <a>
            Edit
          </a>
        </Link>
      }
      <h4>Author: {props.author.username}</h4>
      <div dangerouslySetInnerHTML={{__html: body}}></div>
    </SimpleLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    let data = await apiClient.getArticleBySlug(context.query.slug[0]);
    if (!data || data.length == 0) {
      return {props: {error: {statusCode: 404}}}
    }

    //process author
    // console.log(data);
    data = await contentProcessor.processAuthor(data, session.user);
    return {props: data[0]}
  } catch(error) {
    return {props: {error: {statusCode: 404}}}
  }
}