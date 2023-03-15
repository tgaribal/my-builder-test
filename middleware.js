import { NextResponse } from 'next/server'
import { encodeOptions } from '@lib/utils';
export const config = {
    matcher: '/query/:path*',
  }

export default function middleware(request) {

    // console.log('HELLO REQUEST: ', request);
    if (request.nextUrl.pathname.startsWith('/query')) {
      const pathname = request.nextUrl.pathname;
      const searchParams = request.nextUrl.searchParams
      console.log(searchParams)
      const something = encodeOptions({
        user: searchParams.get('user'),
        kw: searchParams.get('kw')
      })
      console.log('HELLO SOMETHING: ', something)

      console.log('HELLO REQUEST NEXTURL: ', `${pathname}/${something}`, request.url);

    return NextResponse.rewrite(new URL(`${pathname}/${something}`, request.nextUrl))
  }
  return NextResponse.next()
}
