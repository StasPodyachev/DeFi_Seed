import React, { FC } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { UserBackField, UserBackFieldValue } from '@models/form';
import { UserBackPayload } from '@models/api';
import { Input } from '@components';
import FormWrap, { FormWrapProps } from './FormWrap';

type BugReportProps = {
  onSuccess: () => void;
} & Pick<FormWrapProps, 'onBack' | 'onClose'>;

const BugReport: FC<BugReportProps> = ({ onSuccess, onBack, onClose }): JSX.Element => {
  const form = useTypedSelector((state) => state.form.bugReportForm);
  const { updateBugReportValues, fetchUserBack, resetBugReportValues } = useActions();

  const handleChange = (field: UserBackField) => (value: UserBackFieldValue) => {
    updateBugReportValues({ field, value });
  };

  const onSend = () => {
    const payload: UserBackPayload = {
      email: form.email || '',
      bug_title: form.title || '',
      bug_desc: form.description || '',
    };

    fetchUserBack(payload);
    onSuccess();
    resetBugReportValues();
  };

  return (
    <FormWrap
      title="USER_BACK.BUG_REPORT.TITLE"
      subTitle="USER_BACK.BUG_REPORT.SUB_TITLE_2"
      OnSendProps={{ onClick: onSend, disabled: form.isError }}
      {...{ onBack, onClose }}
    >
      <Input
        value={form.email}
        variant="simple"
        type="email"
        placeholder="USER_BACK.FORM.EMAIL"
        onChange={handleChange('email')}
        width="100%"
      />
      <Input
        value={form.title}
        variant="simple"
        placeholder="USER_BACK.FORM.TITLE"
        onChange={handleChange('title')}
        width="100%"
      />
      <Input
        value={form.description}
        variant="simple"
        placeholder="USER_BACK.FORM.BUG_DESC"
        onChange={handleChange('description')}
        multiline
        minRows={5}
        width="100%"
      />
    </FormWrap>
  );
};

export default BugReport;
