import React, { Fragment, FC, useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import Flex from '@mui/material/Stack';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BugReportIcon from '@mui/icons-material/BugReport';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FeedIcon from '@mui/icons-material/Feed';

import theme from '@theme';
import ROUTES from '@constants/routes';
import { DialogTitle } from '@components';
import UserBackItem from './UserBackItem';
import BugReport from './BugReport';
import Feature from './Feature';
import Feedback from './Feedback';
import SuccessSent from './SuccessSent';

const USER_BACK_LIST = [
  {
    id: 'liveChat',
    Icon: QuestionAnswerIcon,
    title: 'USER_BACK.LIVE_CHAT.TITLE',
  },
  {
    id: 'bugReport',
    Icon: BugReportIcon,
    title: 'USER_BACK.BUG_REPORT.TITLE',
    subTitle: 'USER_BACK.BUG_REPORT.SUB_TITLE',
  },
  {
    id: 'feature',
    Icon: AutoAwesomeIcon,
    title: 'USER_BACK.FEATURE.TITLE',
    subTitle: 'USER_BACK.FEATURE.SUB_TITLE',
  },
  {
    id: 'feedback',
    Icon: FeedIcon,
    title: 'USER_BACK.FEEDBACK.TITLE',
    subTitle: 'USER_BACK.FEEDBACK.SUB_TITLE',
  },
];

type UserBackDialogProps = {
  onClose: () => void;
};

const UserBackDialog: FC<UserBackDialogProps> = ({ onClose }): JSX.Element => {
  const [selected, setSelected] = useState<string | null>(null);
  const [successSent, setSuccessSent] = useState(false);

  useEffect(() => {
    if (selected === 'liveChat') {
      window.open(ROUTES.TELEGRAM_SUPPORT);
    }
  }, [selected]);

  const resetSelected = () => {
    setSelected(null);
  };

  const onSuccess = () => {
    resetSelected();
    setSuccessSent(true);
  };

  switch (selected) {
    case 'bugReport':
      return <BugReport onSuccess={onSuccess} onBack={resetSelected} onClose={onClose} />;

    case 'feature':
      return <Feature onSuccess={onSuccess} onBack={resetSelected} onClose={onClose} />;

    case 'feedback':
      return <Feedback onSuccess={onSuccess} onBack={resetSelected} onClose={onClose} />;

    default:
      return (
        <Fragment>
          <DialogTitle onClose={onClose} />
          <DialogContent>
            {!successSent ? (
              <Flex gap={2} flexDirection="column" padding={theme.spacing(4, 2, 2)}>
                {USER_BACK_LIST.map(({ id, ...item }) => (
                  <UserBackItem key={id} {...item} onClick={() => setSelected(id)} />
                ))}
              </Flex>
            ) : (
              <SuccessSent />
            )}
          </DialogContent>
        </Fragment>
      );
  }
};

export default UserBackDialog;
