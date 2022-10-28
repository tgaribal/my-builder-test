import { builder } from "@builder.io/react";

export async function getLayoutProps() {
    const siteSettings = await builder.get('site-settings', { options: {includeRefs: true} }).toPromise() || null
    // console.log('helllasldkalskdas: ', await builder.getAll('site-settings', { options: {includeRefs: true} }))
    return {
        siteSettings
    }
}

export async function getRibbonProps() {
    const ribbon = await builder.get('ribbon', { options: { urlPath: "/test"} }).toPromise()|| null
    // console.log('RIBBONS!!', ribbon);
    return {
        ribbon
        // ribbon: await builder.getAll('ribbon').toPromise() || null
    }
}

export async function getCustomCss() {
    const customCss = await builder.getAll('custom-css', { options: { noTraverse: false }})|| null
    // console.log('ALL CSS!!', customCss[0]);
    return {
        customCss
        // ribbon: await builder.getAll('ribbon').toPromise() || null
    }
}