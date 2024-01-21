import { FC, ElementType } from 'react';
import TypographyComponent, { TypographyProps as TypographyComponentProps } from '@mui/material/Typography';

export type TypographyProps = {
  component?: ElementType;
} & TypographyComponentProps;

const Typography: FC<TypographyProps> = ({ content, component = 'span', ...props }): JSX.Element => (
  <TypographyComponent component={component} {...props} />
);

export default Typography;
