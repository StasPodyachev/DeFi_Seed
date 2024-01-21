import { ReactNode, Fragment, FC, memo } from 'react';

import { redirect } from '@utils/navigation';

export type LinkWrapProps = {
  href?: string;
  hrefAs?: string;
  target?: string;
  nofollow?: boolean;
  className?: string;
  children?: ReactNode;
};

const LinkWrap: FC<LinkWrapProps> = ({ href, hrefAs, target, nofollow, className, children }): JSX.Element => {
  const hrefProps: object = target ? { target, rel: `noopener noreferrer${nofollow ? ' nofollow' : ''}` } : {};

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (!target) {
            e.preventDefault();
            redirect(href, hrefAs);
          }
        }}
        className={className}
        {...hrefProps}
      >
        {children}
      </a>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default memo(LinkWrap);
