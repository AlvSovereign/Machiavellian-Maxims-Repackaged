import React from 'react';
import { Typography } from './Typography';

const Markdown = (props: any) => {
  const options = {
    overrides: {
      h2: {
        component: (props: any) => (
          <Typography
            component='h2'
            colour='red'
            classes='mb-4'
            variant='title'
            {...props}
          />
        )
      },
      p: {
        component: (props: any) => (
          <Typography
            classes='mb-4'
            colour='black'
            component='blockquote'
            variant='paragraph'
            {...props}
          />
        )
      },
      // span: {
      //   props: {
      //     className: `${classes.root} ${classes.content}`
      //   },
      //   component: (props: any) => (
      //     <Typography
      //       gutterBottom
      //       align={mobile ? 'center' : 'left'}
      //       variant={mobile ? 'h6' : 'h5'}
      //       component={'p'}
      //       {...props}
      //     />
      //   )
      // },
      a: {
        component: (props: any) => (
          <Typography
            colour='red'
            component='a'
            variant='paragraph'
            {...props}
          />
        )
      }
    }
  };
  return <Markdown options={options} {...props} />;
};

export { Markdown };

interface MarkdownProps {}
