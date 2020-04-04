import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Typography } from './Typography';

const MaximMarkdown = (props: any) => {
  const variant = props.isCard ? 'small' : 'paragraph';
  const options = {
    overrides: {
      blockquote: {
        component: (props: any) => (
          <Typography
            classes='mb-4'
            colour='black'
            component='blockquote'
            font='serif'
            variant={variant}
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
            font='serif'
            variant={variant}
            {...props}
          />
        )
      },
      a: {
        component: (props: any) => (
          <Typography
            colour='red'
            component='a'
            font='serif'
            variant={variant}
            {...props}
          />
        )
      }
    }
  };
  return <Markdown options={options} {...props} />;
};

export { MaximMarkdown };

interface MaximMarkdown {
  isCard?: boolean;
}
