import React from 'react';
import Link from 'next/link';
import { Builder, builder } from '@builder.io/react';

const testExample = (options: any) => {
  console.log(options)
}

const text = 'default text test';

export const TestCustomComponent = (props: any) => {

  return (
    <>
      <h2>{props.inputVal}</h2>
    
      <>
        {props.list.map((item: any, index: any) => {

          return <div key={item.number+index}>{item.reviewText}</div>
        })}
      </>
    </>
  );
};

Builder.registerComponent(TestCustomComponent, {
  name: 'Test Custom Comp',
  inputs: [
    {
      name: 'inputVal',
      type: 'text',
      defaultValue: `${text}`,
      onChange: (options: any) => {
        console.log('KAHSDFKHASDKFHAKSDHFALKSHD: ', options)
      },
    },
    {
      name: 'json',
      type: 'json',
      defaultValue: []
    },
    {
      name: 'list',
      type: 'list',
      defaultValue: [{ 
        defaultText:  'default text of this thing'
      }],
      subFields: [
        {
          name: 'reviewText',
          type: 'string',
          defaultValue: '"You guys are the best"'
        },
        {
          name: 'number',
          type: 'string',
          required: true,
          defaultValue: '1',
          // onChange: (options: any) => {
          //   console.log('KAHSDFKHASDKFHAKSDHFALKSHD: ')
          // },
          regex: {
            // pattern to test, like "^\/[a-z]$" 
            pattern: "^[1-9]?[0-9]{1}$|^100$",
            // flags for the RegExp constructor, e.g. "gi"  */
            options: "g",
            // message to display to end-users if the regex fails
            message: "must use a number between 1 and 10 "
          }
        },
        {
          name: 'reviewAuthor',
          type: 'string',
          defaultValue: 'Jane Smith',
        },
      ],
      onChange: (options: any) => {
        console.log('OPTIONS NUMBER: ', options.get('number'))
        options.get('list').forEach((item: any) => console.log(item._data.get('number')))
        console.log('OPTIONS subfields: ', options.get('list'))

        if (options.get('list').length > 4) {
          console.log('in on change isError');
          options.set('list', options.get('list').slice(0, 4))
        }
      }
    }
  ]
});

// 


  // function CustomComponent(props: any) {
  //   const handleSubmit = () => {
  //     props.builderState.context.handleSubmit();
  //   };
  //   return (
  //     <div onClick={handleSubmit} >
  //       {props.inputVal}
  //       { props?.area?.city}
  //       {props?.area?.count}
  //       {props?.area?.stateCode}
  //     </div>
  //   )
  // }

  // Builder.registerComponent(CustomComponent, {
  //   name: "CustomComponent",
  //   inputs: [
  //      {
  //       name: "inputVal",
  //       type: "string" 
  //      }, {
  //       name: "area",
  //       type: "object",
  //       subFields: [
  //           {
  //               name: "city",
  //               type: "string",
  //               defaultValue: "San Francisco"
  //           },
  //           {
  //               name: "county",
  //               type: "string",
  //               defaultValue: "San Francisco"
  //           },
  //           {
  //               name: "stateCode",
  //               type: "string",
  //               defaultValue: "CA"
  //           },
  //       ]
  //      } 
  //   ]
  // });
