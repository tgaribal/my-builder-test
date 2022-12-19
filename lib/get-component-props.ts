import { builder } from "@builder.io/react";

export async function getLayoutProps() {
    const siteSettings = await builder.get('site-settings', { options: {includeRefs: true} }).toPromise() || null
    console.log('THIS SOME SITESETTINGS: ', siteSettings)
    return {
        siteSettings
    }
}

export async function getRibbonProps() {
    const ribbon = await builder.get('ribbon', { options: { urlPath: "/test"} }).toPromise()|| null
    console.log('THIS SOME RIBBONS: ', ribbon.name);
    return {
        ribbon
    }
}

export async function getCustomCss() {
    const customCss = await builder.getAll('custom-css', { options: { noTraverse: false }})|| null
    console.log('THIS SOME CUSTOMCSS: ', customCss[0].name);
    return {
        customCss
    }
}