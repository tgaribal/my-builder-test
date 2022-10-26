import React from 'react';
import Link from 'next/link';
import { Builder, builder, withChildren,  } from '@builder.io/react';

const testExample = (options: any) => {
  console.log(options)
}

const text = 'default text test';

// export const TestCustomComponent = (props: any) => {
//   console.log('PROPS: ', props.builderState);

//   return (
//     <>
//       <h2>{props.inputVal}</h2>
    
//       <>
//         {props.list.map((item: any, index: any) => {

//           return <div key={item.number+index}>{item.reviewText}</div>
//         })}
//       </>
//     </>
//   );
// };

export const TestCustomComponent = (props:any) => (
    <>
      <h2>{props.inputVal}</h2>
    
      <>
        {props.list.map((item: any, index: any) => {
          return <div key={item.number+index}>{item.reviewText}</div>
        })}
      </>
    </>
  );




Builder.registerComponent(TestCustomComponent, {
  name: 'Test Custom Comp & 👍 ',
  screenshot: 'https://static.wikia.nocookie.net/elmos-world-fanon/images/d/d9/Hqdefault-1.jpg',
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

  export const ContactBlock = (props: any) => {

    return (
      <>
        <h2>{props.header}</h2>
        <h3>{props.subheader}</h3>
        {props.children}

      </>
    );
  };

  Builder.registerComponent(withChildren(ContactBlock), {
    name: 'ContactBlock',
    // noWrap: true,
    inputs: [
      {
        name: 'header',
        type: 'text',
        // required: true,
        defaultValue: 'here is a default value',
        localized: true
      },
      {
        name: 'subheader',
        type: 'string',
        defaultValue: 'Whether you’re starting a new project or feeling stuck on a current one, contact us today.',
      },
      {
        name: 'backgroundImage',
        type: 'file',
        // required: true
        // defaultValue: image,
      },
      {
        name: 'backgroundOverlay',
        type: 'string',
        enum: ['blue', 'blue-gradient'],
        defaultValue: 'blue',
      },
  // THESE ARE NOT POPULATING:
      {
        name: 'buttonOne',
        type: 'object',
        defaultValue: {
          buttonText: 'Contact YOU',
          buttonLink: 'this'
        },
        subFields: [
          {
            name: 'buttonText',
            type: 'string'
          },
          {
            name: 'buttonLink',
            type: 'string'
          },
        ],
      },
      {
        name: 'buttonTwo',
        type: 'object',
        subFields: [
          {
            name: 'buttonText',
            type: 'string',
            defaultValue: 'Book a call ',
          },
          {
            name: 'buttonLink',
            type: 'string',
            defaultValue: '/book-a-call',
          },
        ],
      },
    ],
  });
  
