import { Builder, BuilderBlocks, BuilderElement } from '@builder.io/react';
import { Component } from '@builder.io/sdk';
import React, { useState } from 'react';

interface ITabData {
  children?: BuilderElement;
  disabled: boolean;
  label: string;
}

export interface ITabsProps {
  builderBlock?: BuilderElement; 
  data: ITabData[];
}

export const Tabs: React.FC<ITabsProps> = ({ builderBlock, data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log('tim DATA: ', data)
  console.log('tim builderBlock: ', builderBlock)

  if (data) {
    <div>
      {data}
    </div>
    const tabData = data.map((dataItem, i) => ({
      children: (
        <BuilderBlocks
          blocks={dataItem.children}
          child
          dataPath={`component.options.data.${selectedIndex}.children`}
          parentElementId={builderBlock?.id}
        />
      ),
      disabled: dataItem.disabled,
      id: i.toString(),
      label: dataItem.label,
    }));
    console.log('tim TAB DATA: ', tabData)
    return <div></div>
    // (
    //   <div
    //     ariaLabel={`crate-tab-${builderBlock?.id}`}
    //     data={tabData}
    //     selectedIndex={selectedIndex}
    //     setSelectedIndex={setSelectedIndex}
    //   />
    // );
  }

  return <></>;
};

export const builderComponent: Component = {
    canHaveChildren: true,
    description: 'Tabs from crate',
    inputs: [
      {
        defaultValue: [
          {
            children: [
              {
                '@type': '@builder.io/sdk:Element',
                component: {
                  name: 'Text',
                  options: {
                    text: 'Delete this layer and add whatever you want!',
                  },
                },
              },
            ],
            disabled: false,
            label: 'Tab',
          },
        ],
        description:
          'Array of tab data that is used to render the tablist and tab panel',
        name: 'data',
        required: true,
        subFields: [
          {
            defaultValue: false,
            name: 'disabled',
            type: 'boolean',
          },
          {
            defaultValue: 'Tab',
            name: 'label',
            type: 'string',
          },
          {
            // defaultValue: [
            //   {
            //     '@type': '@builder.io/sdk:Element',
            //     component: {
            //       name: 'Text',
            //       options: {
            //         text: 'Delete this layer and add whatever you want!',
            //       },
            //     },
            //   },
            // ],
            name: 'children',
            type: 'uiBlocks',
          },
        ],
        type: 'list',
      },
    ],
    name: 'Tabs',
    noWrap: true,
  };

Builder.registerComponent(Tabs, builderComponent);
