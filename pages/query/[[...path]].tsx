import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import builderConfig from '@config/builder'
// loading widgets dynamically to reduce bundle size, will only be included in bundle when is used in the content
import '@builder.io/widgets/dist/lib/builder-widgets-async'
import { useEffect, useState } from 'react'
import { queryParamHeaders } from 'lib/query-param-headers.js';
import { decodeOptions } from '@lib/utils'

const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY)

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {

  const options = decodeOptions(params?.path[params.path.length-1]);
  console.log(params)
  console.log('HELLO PARAMS: ', {params, options} )
  let queryString = '';
  if (options.kw || options.user) {
    const searchParams = new URLSearchParams(options);
    queryString = searchParams.toString();
  }
  const headers = queryParamHeaders[options.kw] ? queryParamHeaders[options.kw] : queryParamHeaders.default;

  const queryParamPage = (await builder
      .get('query-param-page', {
        userAttributes: {
          urlPath: "/query/testing",
          queryParams: queryString
        },
      })
      .toPromise()) || null;

  return {
    props: {
      queryParamPage,
      headers
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('query-param-page', {
    options: { noTargeting: true },
    fields: 'data.url',
  })
  // console.log('QUERY PARAM: ', pages)
  return {
    paths: [], // pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function QueryParamPage({
  queryParamPage,
  headers
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  const isPreviewingInBuilder = useIsPreviewing()
  const show404 = !queryParamPage && !isPreviewingInBuilder

  // console.log("query params: ", router.query.user, content)

  // useEffect(() => {
  //   if (window.location.search) {
  //     const url = new URL(window.location.href);
  //     // const params = new URLSearchParams(url.search);

  //     const keyword = router.query.kw;
  //     const newHeaders = queryParamHeaders[keyword] ? queryParamHeaders[keyword] : queryParamHeaders.default;
  //     setHeaders(newHeaders)
      
      
  //     async function fetchContent() {
  //       const userAttributes = {
  //         urlPath: window.location.pathname,
  //         queryParams: url.search
  //       }
  //       builder.setUserAttributes(userAttributes);
  
  //       const content = await builder
  //         .get('query-param-page')
  //         .promise();
  //       console.log('USE EFFECT CONTENT: ', content)

  //       setContent(content);
  //     }

  //     fetchContent();

  //   }
  // }, [router.query]);
  
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!queryParamPage && <meta name="robots" content="noindex" />}
      </Head>
      {show404 ? (
        <DefaultErrorPage statusCode={404} />
      ) : (
        <BuilderComponent model="query-param-page" content={queryParamPage} data={headers}/>
      )}
    </>
  )
}
