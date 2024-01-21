import { FC } from 'react';
import Image from 'next/image';
import Flex from '@mui/material/Stack';

import { SOCIAL_LINKS } from '@constants/dictionaries';
import LinkWrap from './LinkWrap';

const Socials: FC = (): JSX.Element => (
  <Flex gap={2}>
    {SOCIAL_LINKS.map((item) => (
      <LinkWrap target="_blank" href={item.href} key={item.href}>
        <Image src={item.iconUrl} alt={item.alt} width={40} height={40} />
      </LinkWrap>
    ))}
  </Flex>
);

export default Socials;
