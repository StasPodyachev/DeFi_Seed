import React, { FC } from 'react';
import styled from '@emotion/styled';

import LinkWrap from './LinkWrap';
import SafeText from './text/SafeText';

const StyledAnchor = styled(SafeText)({
  textDecoration: 'underline',
});

const MetamaskBrowserLink: FC = (): JSX.Element => {
  const { host, pathname } = location;
  const url = `https://metamask.app.link/dapp/${host}${pathname}`;

  return (
    <LinkWrap href={url} target="_blank">
      <StyledAnchor content="https://metamask.app.link" variant="body1" />
    </LinkWrap>
  );
};

export default MetamaskBrowserLink;
