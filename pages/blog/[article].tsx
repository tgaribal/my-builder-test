import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { getLayoutProps, getRibbonProps, getCustomCss } from '@lib/get-component-props'
import '@builder.io/widgets';
import '@components/testerWithChildern';

const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY)

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ article: string }>) {
  
  const articleData =
    (await builder
      .get('article', {
        query: {
          'data.articleSlug': params?.article,
        },
        userAttributes: {
          locale: 'en-US'
        }
      })
      .toPromise()) || null;

  const articlePageTemplate =
    (await builder
      .get('article-page')
      .toPromise()) || null;

      // console.log('TEMPLATE: ', articleData, articlePageTemplate)
  return {
    props: {
      articleData,
      articlePageTemplate,
      ...(await getLayoutProps()),
      ...(await getRibbonProps()),
      ...(await getCustomCss()),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

// returns a list
export async function getStaticPaths() {

  return {
    paths: [], //pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}



// React Component
export default function Article({
  articleData,
  articlePageTemplate
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  // console.log('ARTICLE DATA: ', articleData)
  // console.log('ARTICLE PAGE TEMPLATE: ', articlePageTemplate)
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  // builder.trackConversion(100);
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!articleData && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BuilderComponent model="article-page" content={articlePageTemplate} data={{ article: articleData?.data }} />
    </>
  )
}
