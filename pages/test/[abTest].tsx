// import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder, BuilderContent } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { getLayoutProps, getRibbonProps, getCustomCss } from '@lib/get-component-props'
import { Link } from '@components/Link/Link'
import '@components/TestCustomComponent/TestCustomComponent';
import '@builder.io/widgets';

const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY)

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ abTest: string }>) {

  const abPage = await builder.get('ab-test-page', {
          options: {
            includeUnpublished: true,
            includeRefs: true,
          },
          userAttributes: {
            urlPath: '/test/' + (params?.abTest || '')
          },
        }).promise() || null
    // console.log('PAGE PAGE: ', abPage, abPage?.data?.testPage?.id, params)
    // console.log('PAGE id: ', abPage, params)
    // console.log('PAGE tesPageId: ', abPage?.data?.testPage?.id)
    //   console.log('PAGE variationId: ', abPage?.variationId)
    //   console.log('PAGE testVariationId: ', abPage?.testVariationId)

  return {
    props: {
      abPage,
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

// React Component
export default function Page({
  abPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  // if (abPage) console.log('PAGE VARIANT: ', abPage)

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  const isLive = !Builder.isEditing && !Builder.isPreviewing

  if (!abPage && isLive) {
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
         
      <BuilderContent content={abPage} isStatic={true} model="ab-test-page" options={{ includeRefs: true }}>
        {(data, loading, content) => {
          // console.log('other: ', content)
          // console.log('PAGE VARIANT data!!!!: ', data)
          // console.log('PAGE VARIANT content!: ', content)
          // if (!data?.testPage?.value) return <div>HELLO</div>;
          return (
            <BuilderComponent 
              model="page"
              data={ data }
              content={ data?.testPage?.value }
              options={{ includeRefs: true }} >
              This is default component
            </BuilderComponent>
          )
          }}
      </BuilderContent>
    </>
  )
}
