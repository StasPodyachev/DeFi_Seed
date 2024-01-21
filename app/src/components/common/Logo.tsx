import { FC } from 'react';
import Image from 'next/image';

import { getStaticAssetPath } from '@utils';
import ROUTES from '@constants/routes';
import LinkWrap from './LinkWrap';

const Logo: FC = ({}): JSX.Element => (
  <LinkWrap href={ROUTES.HOME}>
    <Image src={getStaticAssetPath('logo-version.svg')} width={53} height={34} alt="d4x logo" />
  </LinkWrap>
);

export default Logo;
