import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, BuilderContent, builder, useIsPreviewing } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { getLayoutProps, getRibbonProps, getCustomCss } from '@lib/get-component-props'
import '@components/TestCustomComponent/TestCustomComponent';
import '@components/CustomComponentExample/CustomComponentExample';
import '@components/CloudinaryImage';
import '@builder.io/widgets';

const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY)

const locale = 'en-US'

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {

  const page = (
    await builder
      .get('page', {
        userAttributes: {
          urlPath: '/'+ (params?.page?.join('/') || '')
        },
        options: {
          includeRefs: true,
          noTraverse: false,
          locale
        },
        locale
      })
      .toPromise()) || null
    
      // console.log('PAGEPAGE', page)
      const serverResults = { text: 'headerText', person: { name: 'tim', employer: 'Builder'} }
      
  return {
    props: {
      page,
      serverResults,
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

  const pages = await builder.getAll('page', {
    limit: 100,
    options: { noTargeting: true },
    fields: 'data.url',
  })
  
  // console.log('PAGESSSS', pages.length)
  const paths = pages.map((thing) => {
    // console.log(thing)
    const page = `${thing.data?.url}`;
    return page;
  });
 
  return {
    paths,
    fallback: true,
  }
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   }
// }
function handleSubmit() {
  console.log('hello!!!')
}

export default function Page({
  page,
  serverResults
}:  InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const isPreviewingInBuilder = useIsPreviewing()
  const show404 = !page && !isPreviewingInBuilder
  // console.log('client page: ', page);

  const testFn = () => {
    console.log('hello');
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  const testDataToPass = { name: 'someName', number: 123 }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!page && <meta name="robots" content="noindex" />}
       
      </Head>
      {show404 ? (
        <DefaultErrorPage statusCode={404} />
      ) : (
        <BuilderContent content={page} model="page"> 
          {(variant, loading, content) => {
            // console.log('VARIANTE: ', variant)
            // console.log('VARIANTE full: ', content)
            return (
              <BuilderComponent
                model="page" 
                content={page} 
                data={{ loggedIn: true, testDataToPass, serverResults }}
                locale={locale}
                // options={{
                //   includeRefs: true,
                //   options: {
                //     noTraverse: false
                //   }
                // }}
                contentLoaded={(data, content)=> {
                  // console.log('hellur', data, content, content.id, content.name, content.testVariationId, content.testVariationName)
                  // console.log('CONTNET LOADED: ', data, content)

                    // analytics.page({
                    //   variantId
                    // }) 
                }}
                context={{
                  handleSubmit, 
                  clickOnPage: (e: any) => {
                    console.log('EVENT: ', e.target.dataset)
                    // if(e.target.dataset) {
                      //   state.testingEvent = e.target.dataset
                      // }
                      builder.track('add-to-bag')
                      builder.track('custom-event');
                      builder.track('whateverYouWant');
                      builder.track('click-by-model', { meta: {modelClicked: 'page', isTesting: true}});
                      console.log('CLICK')
                      builder.trackConversion(99);
                    }
                  }} >
                This is default component
              </BuilderComponent>
            )
          }}
          </BuilderContent>
          )
        }
    </>
  )
}