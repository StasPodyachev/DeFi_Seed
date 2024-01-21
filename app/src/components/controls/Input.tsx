import { FC, ChangeEvent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import InputComponent from '@mui/material/Input';

import theme from '@theme';

type StyledInputProps = {
  theme: {
    width: string | undefined;
  };
};

const SimpleInput = styled(InputComponent)<StyledInputProps>(({ theme: { width } }) => ({
  width,
  minHeight: theme.spacing(6),

  '& .MuiInput-input': {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(20),
    fontWeight: 400,
    textAlign: 'left',
  },
}));

const StyledInput = styled(InputComponent)<StyledInputProps>(({ theme: { width } }) => ({
  width,
}));

export type InputProps = {
  value: string;
  variant?: 'default' | 'simple';
  type?: 'text' | 'number' | 'email';
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  multiline?: boolean;
  minRows?: number | string;
  width?: string;
  onChange?: (value: string) => void;
};

const Input: FC<InputProps> = ({ variant = 'default', onChange, placeholder = '', width, ...props }): JSX.Element => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const CommonProps = {
    onChange: handleChange,
    placeholder: t(placeholder) || '',
    theme: { width },
  };

  if (variant === 'simple') {
    return <SimpleInput {...props} {...CommonProps} />;
  }

  return <StyledInput {...props} {...CommonProps} />;
};

const areEqual = (prevProps: InputProps, nextProps: InputProps) =>
  prevProps.value === nextProps.value &&
  prevProps.error === nextProps.error &&
  prevProps.disabled === nextProps.disabled;

export default memo(Input, areEqual);
