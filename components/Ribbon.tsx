import { BuilderComponent, Builder } from '@builder.io/react'
import '@builder.io/widgets';

export default function BuilderRibbon({ ribbon }: any) {
    return (
        <BuilderComponent
            model="ribbon"
            content={ribbon}
            data={{ userName: "Gustavo" }}
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
  inputs: [
      { 
        name: 'text', 
        type: 'text',
        localized: true,
        defaultValue: 'this is the default'

      }, {
        name: 'linkUrl', 
        type: 'url'
      }, {
        name: 'linkText', 
        type: 'text'
      }]
})
