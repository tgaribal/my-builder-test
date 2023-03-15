import type { AppProps } from 'next/app'
import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import { Navigation } from '@components/Navigation'
import BuilderRibbon from '@components/Ribbon'
import '@components/Ribbon';
import '../components/Link/link.css';
import '@components/RichImage';
import '@components/Navigation';

builder.init('e37b966ec695434bb21e97442a4a9f46')

export default function MyApp({ Component, pageProps }: any) {
  // console.log('pageProps ', pageProps)

  return (
    <>
      <BuilderRibbon ribbon={pageProps.ribbon}></BuilderRibbon>
      <Navigation  siteSettings={pageProps.siteSettings} />
      <Component {...pageProps} />
    </>
  )
}


