import { ReactNode, SyntheticEvent, FC } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Text from '../common/text/Text';

type DetailsCollapsableProps = {
  title: string | ReactNode;
  children: ReactNode;
  id?: string;
  isOpen?: boolean;
  TitleProps?: object;
  onChange?: (e: SyntheticEvent, expanded: boolean) => void;
};

const DetailsCollapsable: FC<DetailsCollapsableProps> = ({
  id = 'panel',
  isOpen,
  title,
  TitleProps = {},
  children,
  onChange,
}): JSX.Element => {
  let AccordionProps = {};

  if (typeof isOpen === 'boolean' && typeof onChange === 'function') {
    AccordionProps = { isOpen, onChange };
  }

  return (
    <Accordion {...AccordionProps}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${id}-content`} id={`${id}-header`}>
        {typeof title === 'string' && <Text tid={title} {...TitleProps} />}
        {typeof title === 'object' && title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default DetailsCollapsable;
