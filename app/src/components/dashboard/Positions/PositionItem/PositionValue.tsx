import { FC, ReactNode } from 'react';
import Flex from '@mui/material/Stack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styled from '@emotion/styled';

import theme from '@theme';
import Text from '../../../common/text/Text';
import SafeText, { SafeTextProps } from '../../../common/text/SafeText';
import LinkWrap from '../../../common/LinkWrap';

const StyledLinkWrap = styled(LinkWrap)({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  textDecoration: 'underline',
  color: theme.palette.common.white,
});

export type PositionValueProps = {
  title: string;
  tValues: object;
  value: string | ReactNode;
  ValueProps?: Omit<SafeTextProps, 'content'>;
  url?: string;
};

const DashboardPositionValue: FC<PositionValueProps> = ({
  title,
  tValues,
  value,
  ValueProps = {},
  url,
}): JSX.Element => {
  let valueComponent = value;

  if (typeof value === 'string') {
    valueComponent = <SafeText {...ValueProps} content={value} variant="subtitle2" />;
  }

  if (url) {
    valueComponent = (
      <StyledLinkWrap href={url} target="_blank">
        {valueComponent}
        <OpenInNewIcon fontSize="small" />
      </StyledLinkWrap>
    );
  }

  return (
    <Flex gap={1} justifyContent="space-between" alignItems="center">
      <Text tid={title} values={tValues} variant="subtitle2" color={theme.palette.grey[400]} />
      {valueComponent}
    </Flex>
  );
};

export default DashboardPositionValue;
