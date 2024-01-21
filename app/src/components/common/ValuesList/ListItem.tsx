import { FC } from 'react';
import Flex from '@mui/material/Stack';
import styled from '@emotion/styled';

import theme from '@theme';
import Text from '../../common/text/Text';
import StyledText from '../../common/text/StyledText';

type WrapProps = {
  theme: {
    opacity: number | undefined;
  };
};

const Wrap = styled(Flex)<WrapProps>(({ theme: { opacity } }) => ({
  opacity,
}));

type ListItemProps = {
  title: string;
  tValues: object;
  value: string;
  vValues: object;
  ValueProps?: object;
  opacity?: number;
};

const ListItem: FC<ListItemProps> = ({ title, tValues, value, vValues, ValueProps = {}, opacity }): JSX.Element => (
  <Wrap gap={2} justifyContent="space-between" alignItems="center" theme={{ opacity }}>
    <Text tid={title} values={tValues} variant="body1" />
    <StyledText
      tid={value}
      values={vValues}
      variant="body1"
      color={theme.palette.grey[400]}
      styledText="boldColor"
      styledTextColor={theme.palette.success.main}
      textAlign="right"
      whiteSpace="nowrap"
      {...ValueProps}
    />
  </Wrap>
);

export default ListItem;
