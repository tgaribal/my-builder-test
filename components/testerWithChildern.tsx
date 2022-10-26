import React from "react";
import { Builder, BuilderBlocks } from "@builder.io/react";
import scratchOverlay from "src/assets/backgrounds/scratch-overlay.jpg";

type TextAndImageVariant = "light" | "dark" | "darkWithScratches";

interface TextAndImageProps {
  title: string;
  subtitle: string;
  builderBlock: any;
}

export const TextAndImage: React.FC<TextAndImageProps> = (props) => {
  return (
    <>
        <div>
        {props.title}
        </div>
        <div>
        {props.subtitle}
        </div>
        
        <BuilderBlocks 
            blocks={[...props.builderBlock.children]} 
            parentElementId={props.builderBlock.id} 
            dataPath="this.children" />
        {/* {console.log('children: ', props.builderBlock.children)}
        <BuilderBlocks 
            blocks={[props.builderBlock.children[1]]} 
            parentElementId={props.builderBlock.id} 
            dataPath="this.children"/> */}
    </>
  );
};

Builder.registerComponent(TextAndImage, {
  name: "CustomGrid",
  canHaveChildren: true,
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: "A short title",
    },
    {
      name: "subtitle",
      type: "text",
      defaultValue: "A short subtitle",
    },
  ],
  defaultChildren: [
    // {
    //   "@type": "@builder.io/sdk:Element",
    //   component: {
    //     name: "Text",
    //     options: {
    //       text: "Write text paragraph here",
    //     },
    //   },
    // },
    // {
    //   "@type": "@builder.io/sdk:Element",
    //   component: {
    //     name: "Text",
    //     options: {
    //       text: "Write text paragraph 2 here",
    //     },
    //   },
    // },
  ]
});