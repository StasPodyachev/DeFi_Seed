import { FC } from 'react';
import Image from 'next/image';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import { getStaticAssetPath } from '@utils';
import ROUTES from '@constants/routes';
import LinkWrap from '../common/LinkWrap';
import Text from '../common/text/Text';

const Footer: FC = (): JSX.Element => (
  <Flex
    component="footer"
    justifyContent="center"
    alignItems="center"
    height="72px"
    sx={{ backgroundColor: theme.palette.primary.dark }}
  >
    <Flex gap={0.5} alignItems="center">
      <Text
        tid="COMMON.POWERED_BY"
        variant="subtitle1"
        paddingBottom={theme.spacing(0.5)}
        color={theme.palette.grey[400]}
      />
      <LinkWrap href={ROUTES.GODEFX_LAB} target="_blank">
        <Image src={getStaticAssetPath('godefx-lab.svg')} width={90} height={24} alt="godefx lab" />
      </LinkWrap>
    </Flex>
  </Flex>
);

export default Footer;
