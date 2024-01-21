import { FC, Fragment } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';
import { AddressType } from '@models';
import { getExplorer } from '@utils';
import LinkWrap from './LinkWrap';
import Text from './text/Text';

const Wrap = styled('div')({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
});

const AnchorText = styled(Text)({
  textDecoration: 'underline',
});

export type ExplorerLinkProps = {
  chainId: number;
  address: AddressType;
  wrap?: boolean;
  AnchorProps?: object;
};

const ExplorerLink: FC<ExplorerLinkProps> = ({ chainId, address, wrap = true, AnchorProps = {} }): JSX.Element => {
  const { name, link } = getExplorer(chainId);

  if (!name || !link) return <Fragment />;

  const linkComponent = (
    <LinkWrap href={link(address, 'tx')} target="_blank">
      <AnchorText tid={name} variant="body1" color={theme.palette.success.light} {...AnchorProps} />
    </LinkWrap>
  );

  if (wrap) {
    return <Wrap>{linkComponent}</Wrap>;
  }

  return linkComponent;
};

export default ExplorerLink;
