import { builder, BuilderComponent, Builder } from '@builder.io/react'
import '@builder.io/widgets';

// const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
// builder.init(BUILDER_API_KEY)

// export const getStaticProps = async () => {

//   const content = await builder.get('ribbon').promise() || null;

//   return { 
//     props: { content }, 
//     revalidate: true,
//     notFound: !content
//   }
// }

export default function BuilderRibbon({ ribbon }: any) {
    return (
        <BuilderComponent
            model="ribbon"
            content={ribbon}
            // options={{
            //   query: { "data.isFooterContent": "true" }
            // }}
            ></BuilderComponent>
    )

}


// Register your components for use in the visual editor!
// https://www.builder.io/blog/drag-drop-react
export const SiteRibbon = (props: any) => {
    return <div className="this is the className">{props.text} <a href={props.linkUrl}>{props.linkText}</a></div>

}

Builder.registerComponent(SiteRibbon, { 
  name: 'Site Ribbon',
  // noWrap: true,
  inputs: [
      { 
        name: 'text', 
        type: 'text'
      }, {
        name: 'linkUrl', 
        type: 'url'
      }, {
        name: 'linkText', 
        type: 'text'
      }]
})
