import { FC, ReactNode, MouseEvent } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';

import { getStaticAssetPath } from '@utils';

const StyledButton = styled(ButtonBase)({
  position: 'absolute',
  top: 'calc(50% - 20px)',
  left: 'calc(50% - 20px)',
  zIndex: 1,
});

type PositionTokensValuesWrapProps = {
  onToggleClick: () => void;
  children: ReactNode;
};

const PositionTokensValuesWrap: FC<PositionTokensValuesWrapProps> = ({ onToggleClick, children }): JSX.Element => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleClick();
  };

  return (
    <Flex gap={1} flexDirection="column" position="relative">
      {children}
      <StyledButton onClick={handleClick}>
        <Image src={getStaticAssetPath('verticalArrows.svg')} width={40} height={40} alt="vertical-arrows" />
      </StyledButton>
    </Flex>
  );
};

export default PositionTokensValuesWrap;
