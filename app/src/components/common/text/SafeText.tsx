import { FC, memo } from 'react';
import Typography, { TypographyProps } from './Typography';

export type SafeTextProps = {
  content: string | number;
} & TypographyProps;

const SafeText: FC<SafeTextProps> = ({ content, ...props }): JSX.Element => (
  <Typography dangerouslySetInnerHTML={{ __html: `${content}` }} {...props} />
);

export default memo(SafeText);
