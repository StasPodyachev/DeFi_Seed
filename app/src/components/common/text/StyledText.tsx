import React, { FC, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import Typography, { TypographyProps } from './Typography';
import LinkWrap, { LinkWrapProps } from '../LinkWrap';

type StyledTextProps = {
  tid: string;
  values?: object;
  styledText: 'bold' | 'color' | 'boldColor' | 'a';
  styledTextColor?: string | undefined;
  aProps?: LinkWrapProps;
} & TypographyProps;

type WordsStyleProps = {
  theme: Pick<StyledTextProps, 'styledText' | 'styledTextColor'>;
};

const StyledSpan = styled('span')<WordsStyleProps>(({ theme: { styledText, styledTextColor } }) => ({
  fontWeight: styledText === 'bold' || styledText === 'boldColor' ? '700' : undefined,
  color: styledText === 'color' || styledText === 'boldColor' ? styledTextColor : undefined,
}));

const StyledLinkWrap = styled(LinkWrap)<WordsStyleProps>(({ theme: { styledTextColor } }) => ({
  color: styledTextColor,
  textDecoration: 'underline',
  cursor: 'pointer',
}));

const StyledText: FC<StyledTextProps> = ({
  tid = '',
  values = {},
  styledText = 'bold',
  styledTextColor,
  aProps = {},
  ...props
}): JSX.Element => {
  const { t } = useTranslation();
  const theme = {
    styledText,
    styledTextColor,
  };

  return (
    <Typography {...props}>
      <Trans i18nKey={tid} values={values} t={t}>
        {styledText === 'a' ? <StyledLinkWrap theme={theme} {...aProps} /> : <StyledSpan theme={theme} />}
      </Trans>
    </Typography>
  );
};

const areEqual = (prevProps: StyledTextProps, nextProps: StyledTextProps) =>
  prevProps.tid === nextProps.tid &&
  JSON.stringify(prevProps.values) === JSON.stringify(nextProps.values) &&
  prevProps.color === nextProps.color;

export default memo(StyledText, areEqual);
