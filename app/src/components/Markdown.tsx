import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Typography } from './Typography';

const MaximMarkdown = (props: any) => {
  const options = {
    overrides: {
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
      span: {
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

export { MaximMarkdown };

interface MaximMarkdown {}
