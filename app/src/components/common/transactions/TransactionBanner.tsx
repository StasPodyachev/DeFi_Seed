import { FC } from 'react';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';
import Box from '@mui/material/Box';

import theme from '@theme';
import { AddressType } from '@models';
import ExplorerLink from '../ExplorerLink';
import Text from '../text/Text';
import Loader from '../loader/Loader';

const Wrap = styled(Flex)({
  width: '100%',
  maxWidth: 375,
  margin: theme.spacing(0, 'auto', 2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  outline: `1px solid ${theme.palette.grey[400]}`,
});

const StyledLoader = styled(Loader)({
  marginLeft: theme.spacing(0.5),
  verticalAlign: 'baseline',
});

export type TransactionBannerProps = {
  title: string;
  txAddress: AddressType;
  chainId: number;
};

const TransactionBanner: FC<TransactionBannerProps> = ({ title, txAddress, chainId }): JSX.Element => (
  <Wrap gap={1} flexDirection="column">
    <Box position="relative">
      <Text tid={title} variant="body1" />
      <StyledLoader width={12} height={3} />
    </Box>
    {txAddress && chainId && <ExplorerLink address={txAddress} chainId={chainId} />}
  </Wrap>
);

export default TransactionBanner;
