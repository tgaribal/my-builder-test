import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import builderConfig from '@config/builder'
// loading widgets dynamically to reduce bundle size, will only be included in bundle when is used in the content
import '@builder.io/widgets/dist/lib/builder-widgets-async'

builder.init('e37b966ec695434bb21e97442a4a9f46')

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string[] }>) {
    console.log('HELLO: ', params)
  const article =
    (await builder
      .get('article', {
        query: {
          'data.articleSlug': params?.slug,
        },
      })
      .toPromise()) || null

    const page =
    (await builder
      .get('article-template-example')
      .toPromise()) || null

  return {
    props: {
      page,
      article
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default function Page({
  page,
  article
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const isPreviewingInBuilder = useIsPreviewing()
  const show404 = !page && !isPreviewingInBuilder
    console.log('HELLO', page, article)
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!page && <meta name="robots" content="noindex" />}
      </Head>
      {show404 ? (
        <DefaultErrorPage statusCode={404} />
      ) : (
        <BuilderComponent model="article-template-example" content={page} data={{ article: article }} />
      )}
    </>
  )
}