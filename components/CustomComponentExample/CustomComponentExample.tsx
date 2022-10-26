import * as React from "react";
import { Builder, withChildren } from "@builder.io/react";

export const ExampleButton = (props: any) => {
    const buttonStyle = {
        backgroundColor: `${props.buttonColor}`,
      };
      console.log('button props: ', props)
    return (
      <div {...props.attributes}>
        <button style={buttonStyle}>
            {props.buttonText}
            <img src={props.icon}></img>
        </button>
        <div>{props.children}</div>
      </div>
    )
  };

const wrap = (WrappedComponent:any) => (props:any) => {
  console.log('WRAPPED PROPS: ', props);
  return (
    <WrappedComponent {...props.attributes}
        {...props}
        className={[props.className, props.attributes?.className].filter(Boolean).join(' ')}
        style={{ ...props.style, ...props?.attributes?.style }}/>
  )
}

Builder.registerComponent(withChildren(wrap(ExampleButton)), {
  name: "Example Button",
  noWrap: true,
  screenshot: 'https://cdn.builder.io/api/v1/image/assets%2Fe37b966ec695434bb21e97442a4a9f46%2F7fb971c038f34dafa45a645f5d278eb3',
  defaultChildren: [
    { 
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'I am child text block!' } }
    }
  ],
  inputs: [
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Click me!",
      helperText: "the text to display on your button"
    },
    {
      name: "icon",
      type: "file",
      allowedFileTypes: ['jpeg', 'png', 'gif', 'pdf', 'svg']
    },
    {
        name: "buttonColor",
        type: "color",
        defaultValue: "#FFF"
    },
    {
      name: "isAutoScroll",
      friendlyName:
        "Auto scroll - !DON'T USE, PLEASE MAKE SURE THIS IS rTOGGLED OFF!",
      type: "boolean",
      defaultValue: false,
      advanced: true,
      helperText: "PLEASE DO NOT USE, THIS SHOULD BE OFF!",
    },
  ],
});