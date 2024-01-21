import { FC, memo } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';

import { getStaticAssetPath } from '@utils';

type ImageProps = {
  width?: number;
  height?: number;
  fixed?: boolean;
  className?: string;
};

const Loader: FC<ImageProps> = ({ width = 50, height = 12, fixed, className }): JSX.Element => {
  if (fixed) {
    return (
      <Box position="fixed" top="calc(50% - 12px)" left="calc(50% - 50px)">
        <Image src={getStaticAssetPath('loader.svg')} width={100} height={24} alt="loader" />
      </Box>
    );
  }

  return (
    <Image src={getStaticAssetPath('loader.svg')} width={width} height={height} alt="loader" className={className} />
  );
};

export default memo(Loader);
