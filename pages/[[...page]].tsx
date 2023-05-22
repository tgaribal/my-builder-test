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
import * as fs from 'fs';

const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY)
builder.apiVersion = 'v3';

const locale='en-CA';
const userName = "Ahmed"

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {

  const page = (
    await builder
      .get('page', {
        userAttributes: {
          urlPath: '/'+ (params?.page?.join('/') || ''),
          loggedIn: true,
          userName,
          builderEmployee: true
        },
        apiVersion: 'v3',
        options: {
          includeRefs: true,
          noTraverse: false,
          locale,
          enrich: true
        },
      })
      .toPromise()) || null
    
      // console.log('PAGEPAGE', page?.meta)
      const serverResults = { text: 'headerText', person: { name: 'tim', employer: 'Builder'} }

     //need to import fs 
      // Define the PNG file path
      // const pngFilePath = './my-image.png';
      // const bitmap = fs.readFileSync(pngFilePath);

      // console.log('bitmap data:', bitmap);
      // fetch('https://builder.io/api/v1/upload', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer bpk-861aae28bd494e9880e5badcddcf89c8',
      //     'Content-Type': 'image/png'
      //   },
      //   body: bitmap
      // }).then(res => {
      //   console.log('RESPONSE: ', res)
      // });

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
//  console.log("STATIC PATHS")
  // const pages = await builder.getAll('page', {
  //   limit: 100,
  //   options: { noTargeting: true },
  //   omit: 'data.blocks'
  // }) || null;
  // console.log("PAGES PAGES pages", pages)
  
  // const paths = pages.map((thing:any) => {
  //   // console.log('PAGES PAAGES: ', thing?.data?.url)
  //   const page = `${thing?.data?.url}`;
  //   return page;
  // });
  const paths:any = [];
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
        <>
        <BuilderContent content={page} model="page"> 
          {(data, loading, content) => {
            console.log('BUILDER CONTENT DATA: ', {data, content} )
            return(
              <div>{data?.title}</div>
            )
           }}
      </BuilderContent>

              <BuilderComponent
                model="page" 
                content={page} 
                data={{ loggedIn: false, testDataToPass, serverResults }}
                locale={locale}
                contentLoaded={(data, content)=> {
                //   // console.log('hellur', data, content, content.id, content.name, content.testVariationId, content.testVariationName)
                //   // console.log('CONTNET LOADED: ', data, content)
                   console.log('CONTENT LOADED DATA: ', {data, content} )
                //     // analytics.page({
                //     //   variantId
                //     // }) 
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
                  }} 
                  >
                This is default component
              </BuilderComponent>
              </>
        //     )
        //   }}
        //   </BuilderContent>
          )
        }
    </>
  )
}