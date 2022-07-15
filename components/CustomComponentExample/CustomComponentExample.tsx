import * as React from "react";
import { Builder } from "@builder.io/react";

export const ExampleButton = (props: any) => {
    const buttonStyle = {
        backgroundColor: `${props.buttonColor}`,
      };
    return (
  <button style={buttonStyle}>
      {props.buttonText}
      <img src={props.icon}></img>
  </button>
)};

Builder.registerComponent(ExampleButton, {
  name: "Example Button",
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
    }
  ],
});