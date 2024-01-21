import { FC } from 'react';
import Flex from '@mui/material/Stack';

import Text from '../../common/text/Text';
import Tooltip from '../../common/Tooltip';

export type PageTitleProps = {
  title: string;
  tooltip?: string;
};

const PageTitle: FC<PageTitleProps> = ({ title, tooltip = '' }): JSX.Element => {
  const titleComponent = <Text component="h1" variant="h1" tid={title} />;

  if (!tooltip) {
    return titleComponent;
  }

  return (
    <Flex gap={0.5} alignItems="center">
      {titleComponent}
      <Tooltip title={tooltip} />
    </Flex>
  );
};

export default PageTitle;
