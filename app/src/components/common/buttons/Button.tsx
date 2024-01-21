import { FC, ElementType, Fragment, ReactNode, memo } from 'react';
import styled from '@emotion/styled';
import ButtonComponent, { ButtonProps as ButtonPropsComponent } from '@mui/material/Button';

import Text from '../text/Text';
import Loader from '../loader/Loader';

type StyledButtonProps = {
  theme: {
    width: string | undefined;
  };
};

const StyledButton = styled(ButtonComponent)<StyledButtonProps>(({ theme: { width } }) => ({
  width,
}));

const textVariant = {
  small: 'body1',
  medium: 'body2',
  large: 'body2',
} as const;

export type ButtonProps = {
  title?: string;
  tValues?: object;
  loading?: boolean;
  width?: string;
  component?: ElementType;
  children?: ReactNode;
} & ButtonPropsComponent;

const Button: FC<ButtonProps> = ({
  title,
  tValues = {},
  size = 'medium',
  loading,
  width,
  onClick,
  children,
  ...props
}): JSX.Element => (
  <StyledButton {...props} size={size} theme={{ width }} onClick={(e) => !loading && onClick?.(e)}>
    {!loading ? (
      <Fragment>
        {title && <Text tid={title} values={tValues} variant={textVariant[size]} fontWeight={600} />}
        {children}
      </Fragment>
    ) : (
      <Loader />
    )}
  </StyledButton>
);

export default memo(Button);
