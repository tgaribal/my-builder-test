
import { BuilderContent, builder } from "@builder.io/react";
import { ReadStream } from "fs";
import { useEffect, useState } from 'react';

export const Navigation = (props: any) => {
    //client-side
    const [navData, setNavData] = useState<any[]>([]);

    useEffect(() => {
        // console.log('whaaaa outside setProperties')
        const setBuilderProperties = async () => {
            // console.log('whaaaa before')
            const siteSettings = (await builder.get('site-settings', { options: {includeRefs: true} }).toPromise() || null);
            // console.log('whaaaa after')
            // console.log('whaaaa', siteSettings)
            setNavData([siteSettings]);
        }

        setBuilderProperties();
    }, []);

    // const createNewAuthor = async(url = 'https://builder.io/api/v1/write/author/d76c027403464df1a156365af6168841_fb859711e12a4d25ac3e3f8472da2e2e?apiKey=d76c027403464df1a156365af6168841') => {
    //     let data = await fetch('https://cdn.builder.io/api/v2/content/author?apiKey=d76c027403464df1a156365af6168841&query.id=d76c027403464df1a156365af6168841_fb859711e12a4d25ac3e3f8472da2e2e&limit=1')
    //     data = await data.json()
    //     let author = { data: {}};
    //     author.data = {...data.results[0].data};

    //     author.data.name = 'testing'
    //     console.log('DATA: ', author, data)

    //     const response = await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             Authorization: 'Bearer bpk-463e1b332701495b960d9d6c95c17f83'
    //         },
    //         body: JSON.stringify(data)
    //     }); 
    //     console.log('RESPONSE: ', response);
    //     return response.json();
    // }



    // const dataObject = {
    //     query: [
    //         {
    //           "property": "urlPath",
    //           "operator": "is", // can be `startsWith` to match any urls that starts with value
    //           "value": "/write-api/success" // must start with /
    //         }
    //       ],
    //     name: 'test content entry',
    //     data: {
    //        userName: 'test name',
    //        review: 'Testing',
    //        productSlug: 'demo-product',
    //        date: new Date(),
    //        rating: 4,
    //        authorReference: {
    //         '@type': '@builder.io/core:Reference',
    //         id: '026dc09cf19b4546bdb21aee320261a0',
    //         model: 'author',
    //        },
    //        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flower_July_2011-2_1_cropped.jpg/1200px-Flower_July_2011-2_1_cropped.jpg"
    //      },
    //     published: 'published'
    //    }
    //    const postData = async (url: string, data: any) => {
    //      const response = await fetch(url, {
    //        body: JSON.stringify(data),
    //        headers: {
    //          Authorization: "Bearer bpk-0209a684b0634c38bcf15808f0487182",
    //          "Content-Type": "application/json"
    //        },
    //     //    method: "PATCH"
    //        method: "POST"
    //      })
         
    //      return response.json();
    //    }

    const handleClick = (e: any) => {
        console.log('click', e)
        // uploadImage();
        // createNewAuthor();
        // postData('https://builder.io/api/v1/write/reviews', dataObject)
        //  .then((data) => {
        //    console.log('data: ', data);
           
        //  }) 
    }  

    return <>
        {/* client-side */}
        {/* {navData.map((nav: any) => { */}

        {/* server-side */}
        {props?.siteSettings?.map((nav: any) => { 
            return(
                <BuilderContent content={nav} key={nav.id} model="site-settings">{ (data: any, loading, fullContent) => {
                        // console.log('VARIANT DATA: ', data);
                        // console.log('FULLCONTENT: ', fullContent?.id)
                        if (loading) {
                            return "Loading..."
                        }
                        return <>
                            <ul onClick={handleClick} style={{display: 'flex', padding: 0, listStyle: 'none', justifyContent: 'center'}}>
                                {
                                    data?.navigationLinks?.map((link: any) => {
                                        // return <div key={link.linkText+link.linkUrl} style={{ position: 'relative', padding: '20px', cursor: 'pointer' }}>
                                        //     {link.linkText}
                                        //     <ul style={{ display: 'none', position: "absolute", flexDirection: 'column', left: '20px', zIndex: 1000, background: 'white', padding: 0}}>
                                        //         {link.subLinks?.map((sublink: any) => {
                                        //             return <a key={sublink.linkUrl} href={sublink.linkUrl } style={{ textDecoration: 'none', color: 'black', padding: '5px', border: '1px solid black' }}>
                                        //                 {sublink.linkText}
                                        //             </a>
                                        //         })}
                                        //     </ul>
                                        // </div>
                                        return link?.linkText
                                    })
                                }
                            </ul>
                            {props.children}
                        </>
                    }}</BuilderContent>
                )
            })}
        </>

//     const Flyout = (links: any) => {
//         // console.log('LINK GROUP: ', links)
//         return (
//             links?.navigationLinks?.map((link: any ,i: number) => {
//                 // console.log('LINK: ', link)
                    
//                 return <a key={i} className="nav-lins" href={link.linkUrl}>{link.linkText}</a>

//             })
//         ) || null;
    
//     }

//     // // console.log('PROPS: ', props)
//     const navigationChunk = props?.siteSettings?.map((item: any,i: number)=> {
//         // console.log('ITEM: ', item)
//         return (
//             <>
//             <BuilderContent
//                 model="site-settings"
//                 content={item}
//                 key={item.id}
//                 >{(data) => <Flyout { ...(data ? data : []) } key={'flyout-'+i}/>
//             }</BuilderContent>
//             </>
//         )
//     })
//     return navigationChunk || null;

}


// import { BuilderContent } from "@builder.io/react";

// export const Navigation = (props: any) => {
//     console.log('props.siteSettings', props.siteSettings)
//     return <BuilderContent content={props.siteSettings} model="site-settings">{ (data: any) => {
//         console.log('DATA: ', data)
//         return <>
//             <ul style={{display: 'flex', padding: 0, listStyle: 'none', justifyContent: 'center'}}>
//                 {
//                     data?.navigationLinks?.map((link: any) => {
//                         return <div key={link.linkUrl}  style={{ position: 'relative', padding: '20px', cursor: 'pointer' }}>
//                             {link.linkText}
//                             <ul style={{ display: 'none', position: "absolute", flexDirection: 'column', left: '20px', zIndex: 1000, background: 'white', padding: 0}}>
//                                 {link.subLinks?.map((sublink: any) => {
//                                     return <a key={sublink.linkUrls} href={sublink.linkUrl } style={{ textDecoration: 'none', color: 'black', padding: '5px', border: '1px solid black' }}>
//                                         {sublink.linkText}
//                                     </a>
//                                 })}
//                             </ul>
//                         </div>
//                     })
//                 }
//             </ul>
            
//             {props.children}
//         </>
// }}</BuilderContent>

// }

// import { BuilderContent } from "@builder.io/react";

// export const NavTwo = (props: any) => {
//     return <BuilderContent model="nav-2">{(data, loading, content) => {
//         console.log(data)
//         return(
//             <>
//             <div>HEllo</div>
//             </>
//         )
//     }}</BuilderContent>
// }
// import { BuilderContent } from "@builder.io/react"

// export const Navigation = (props: any) => {
//     console.log('PROPS: ', props)
//     const Flyout = (links: any) => {
//         console.log('LINK GROUP: ', links)
//         return (
//             links?.navigationLinks?.map((link:any) => {
//                 console.log('LINK: ', link)
//                 return <a key={link} className="nav-lins" href={link.linkUrl}>{link.linkText}</a>
//             })
//         ) || null;
//     }

//     const navGroup = props?.navTwo?.map((item:any,i:any)=> {
//         console.log('ITEM: ', item.id)
//         return (
//             <>
//                 <BuilderContent
//                     model="site-settings"
//                     content={item}
//                     key={item.id}
//                     >{(data) => <Flyout { ...(data ? data : []) } key={'flyout-'+i}/>
//                 }</BuilderContent>
//             </>
//         )
//     })
//     return navGroup || null;
// }