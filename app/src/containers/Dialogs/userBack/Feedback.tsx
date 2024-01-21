import React, { FC } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { UserBackField, UserBackFieldValue } from '@models/form';
import { UserBackPayload } from '@models/api';
import { Input, StarGroup } from '@components';
import FormWrap, { FormWrapProps } from './FormWrap';

type FeedbackProps = {
  onSuccess: () => void;
} & Pick<FormWrapProps, 'onBack' | 'onClose'>;

const Feedback: FC<FeedbackProps> = ({ onSuccess, onBack, onClose }): JSX.Element => {
  const form = useTypedSelector((state) => state.form.feedbackForm);
  const { updateFeedbackValues, fetchUserBack, resetFeedbackValues } = useActions();

  const handleChange = (field: UserBackField) => (value: UserBackFieldValue) => {
    updateFeedbackValues({ field, value });
  };

  const onSend = () => {
    const payload: UserBackPayload = {
      email: form.email || '',
      feedback: form.feedback || '',
      rate: form.rate || 0,
    };

    fetchUserBack(payload);
    onSuccess();
    resetFeedbackValues();
  };

  return (
    <FormWrap
      title="USER_BACK.FEEDBACK.TITLE"
      subTitle="USER_BACK.FEEDBACK.SUB_TITLE"
      OnSendProps={{ onClick: onSend, disabled: form.isError }}
      {...{ onBack, onClose }}
    >
      <StarGroup value={form.rate} onChange={handleChange('rate')} />
      <Input
        value={form.email}
        variant="simple"
        type="email"
        placeholder="USER_BACK.FORM.EMAIL"
        onChange={handleChange('email')}
        width="100%"
      />
      <Input
        value={form.feedback}
        variant="simple"
        placeholder="USER_BACK.FORM.FEEDBACK"
        onChange={handleChange('description')}
        multiline
        minRows={5}
        width="100%"
      />
    </FormWrap>
  );
};

export default Feedback;
