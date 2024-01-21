import React, { FC } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { UserBackField, UserBackFieldValue } from '@models/form';
import { UserBackPayload } from '@models/api';
import { Input } from '@components';
import FormWrap, { FormWrapProps } from './FormWrap';

type FeatureProps = {
  onSuccess: () => void;
} & Pick<FormWrapProps, 'onBack' | 'onClose'>;

const Feature: FC<FeatureProps> = ({ onSuccess, onBack, onClose }): JSX.Element => {
  const form = useTypedSelector((state) => state.form.featureForm);
  const { updateFeatureValues, fetchUserBack, resetFeatureValues } = useActions();

  const handleChange = (field: UserBackField) => (value: UserBackFieldValue) => {
    updateFeatureValues({ field, value });
  };

  const onSend = () => {
    const payload: UserBackPayload = {
      email: form.email || '',
      idea_title: form.title || '',
      idea_desc: form.description || '',
    };

    fetchUserBack(payload);
    onSuccess();
    resetFeatureValues();
  };

  return (
    <FormWrap
      title="USER_BACK.FEATURE.TITLE"
      subTitle="USER_BACK.FEATURE.SUB_TITLE"
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
        placeholder="USER_BACK.FORM.IDEA_TITLE"
        onChange={handleChange('title')}
        width="100%"
      />
      <Input
        value={form.description}
        variant="simple"
        placeholder="USER_BACK.FORM.IDEA_DESC"
        onChange={handleChange('description')}
        multiline
        minRows={5}
        width="100%"
      />
    </FormWrap>
  );
};

export default Feature;
