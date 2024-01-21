import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import Typography, { TypographyProps } from './Typography';

export type TextProps = {
  tid: string;
  values?: object;
} & TypographyProps;

const Text: FC<TextProps> = ({ tid, values = {}, ...props }): JSX.Element => {
  const { t } = useTranslation();

  return <Typography {...props}>{t(tid, values)}</Typography>;
};

const areEqual = (prevProps: TextProps, nextProps: TextProps) =>
  prevProps.tid === nextProps.tid && JSON.stringify(prevProps.values) === JSON.stringify(nextProps.values);

export default memo(Text, areEqual);
