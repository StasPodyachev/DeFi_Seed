import {
  PositionField,
  PositionFieldValue,
  PoolField,
  PoolFieldValue,
  PositionTokenValues,
  UserBackField,
  UserBackFieldValue,
} from '@models/form';
import { FormState } from '@models/state';
import { isEmail } from '@validations';
import { EXCHANGERS } from '@constants/dictionaries';

const hasAvailableToken = (value: PositionFieldValue, tokenBuy: PositionTokenValues) => {
  if (typeof value !== 'object') return false;

  return !!(value.availableTokens || []).find((item) => item.value === tokenBuy.value);
};

type UpdatePositionFormValues = {
  state: FormState;
  field: PositionField;
  value: PositionFieldValue;
};

export const updatePositionFormValues = ({ state, field, value }: UpdatePositionFormValues) => {
  const { positionForm, curveTokensValues, oneInchTokensValues } = state;

  if (field === 'exchange' && typeof value === 'object') {
    const [_, curve, oneInch] = EXCHANGERS;
    const isCurveSelected = value.value === curve.value;
    const isOneInchSelected = value.value === oneInch.value;

    if (isCurveSelected && !positionForm.tokenSell.isAvailableCurve) {
      positionForm.tokenSell = { ...positionForm.tokenSell, ...curveTokensValues[0] };
    }

    if (isOneInchSelected && !positionForm.tokenSell.isAvailableOneInch) {
      positionForm.tokenSell = { ...positionForm.tokenSell, ...oneInchTokensValues[0] };
    }

    if (
      (isCurveSelected && positionForm.tokenSell.isAvailableCurve && !positionForm.tokenBuy.isAvailableCurve) ||
      (isOneInchSelected && positionForm.tokenSell.isAvailableOneInch && !positionForm.tokenBuy.isAvailableOneInch)
    ) {
      const availableTokens = positionForm.tokenSell.availableTokens || [{}];
      positionForm.tokenBuy = { ...positionForm.tokenBuy, ...availableTokens[0] };
    }

    positionForm.exchange = value;
  }

  if (field === 'leverage' && typeof value === 'object') {
    positionForm.leverage = +value.value;
  }

  if (field === 'tokenSell' && typeof value === 'object') {
    if (!hasAvailableToken(value, positionForm.tokenBuy)) {
      const availableTokens = value.availableTokens || [{}];
      positionForm.tokenBuy = { ...positionForm.tokenBuy, ...availableTokens[0] };
    }
    positionForm.tokenSell = { ...positionForm.tokenSell, ...value };
  }

  if (field === 'tokenSellAmount' && typeof value === 'string') {
    positionForm.tokenSell.amountStr = value;
    positionForm.tokenSell.amount = +value;
  }

  if (field === 'tokenBuy' && typeof value === 'object') {
    positionForm.tokenBuy = { ...positionForm.tokenBuy, ...value };
  }

  if (field === 'tokenBuyAmount' && typeof value === 'number') {
    positionForm.tokenBuy.amount = value;
  }

  if (field === 'tokenBuyAmountRaw' && typeof value === 'string') {
    positionForm.tokenBuy.amountRaw = value;
  }

  if (field === 'path' && typeof value === 'string') {
    positionForm.path = value;
  }

  if (field === 'marketRate' && typeof value === 'number') {
    positionForm.marketRate = value;
  }

  if (field === 'marginCall' && typeof value === 'number') {
    positionForm.marginCall = value;
  }

  if (field === 'approvedAmount' && typeof value === 'number') {
    positionForm.approvedAmount = value;
  }

  if (field === 'isConfirmed' && typeof value === 'boolean') {
    positionForm.isConfirmed = value;
  }

  if (field === 'isUpdateApprovedAmount' && typeof value === 'boolean') {
    positionForm.isUpdateApprovedAmount = value;
  }

  if (field === 'isLoading' && typeof value === 'boolean') {
    positionForm.isLoading = value;
  }

  if (field === 'toggleTokens') {
    const { tokenSell } = positionForm;
    const { tokenBuy } = positionForm;
    positionForm.tokenSell = { ...tokenBuy, amount: tokenSell.amount, amountStr: `${tokenSell.amount}` };
    positionForm.tokenBuy = { ...tokenSell, amount: 0, amountRaw: '' };
  }

  positionForm.isApprovedTokens =
    positionForm.approvedAmount !== 0 && positionForm.approvedAmount >= positionForm.tokenSell.amount;
};

type UpdatePoolFormValues = {
  state: FormState;
  field: PoolField;
  value: PoolFieldValue;
};

export const updatePoolFormValues = ({ state, field, value }: UpdatePoolFormValues) => {
  if (field === 'token' && typeof value === 'object') {
    state.poolForm = { ...state.poolForm, ...value };
  }

  if (field === 'amount' && typeof value === 'string') {
    state.poolForm.amountStr = value;
    state.poolForm.amount = +value;
  }

  if (field === 'approvedAmount' && typeof value === 'number') {
    state.poolForm.approvedAmount = value;
  }

  if (field === 'isUpdateApprovedAmount' && typeof value === 'boolean') {
    state.poolForm.isUpdateApprovedAmount = value;
  }

  if (field === 'isConfirmedDeposit' && typeof value === 'boolean') {
    state.poolForm.isConfirmedDeposit = value;
  }

  if (field === 'isConfirmedWithdraw' && typeof value === 'boolean') {
    state.poolForm.isConfirmedWithdraw = value;
  }

  state.poolForm.isApprovedTokens =
    state.poolForm.approvedAmount !== 0 && state.poolForm.approvedAmount >= state.poolForm.amount;
};

type UpdateUserBackFormValues = {
  state: FormState;
  field: UserBackField;
  value: UserBackFieldValue;
};

export const updateBagReportFormValues = ({ state, field, value }: UpdateUserBackFormValues) => {
  if (field === 'email' && typeof value === 'string') {
    state.bugReportForm.email = value;
  }

  if (field === 'title' && typeof value === 'string') {
    state.bugReportForm.title = value;
  }

  if (field === 'description' && typeof value === 'string') {
    state.bugReportForm.description = value;
  }

  state.bugReportForm.isError = !isEmail(state.bugReportForm.email) || !state.bugReportForm.title;
};

export const updateFeatureFormValues = ({ state, field, value }: UpdateUserBackFormValues) => {
  if (field === 'email' && typeof value === 'string') {
    state.featureForm.email = value;
  }

  if (field === 'title' && typeof value === 'string') {
    state.featureForm.title = value;
  }

  if (field === 'description' && typeof value === 'string') {
    state.featureForm.description = value;
  }

  state.featureForm.isError = !isEmail(state.featureForm.email) || !state.featureForm.title;
};

export const updateFeedbackFormValues = ({ state, field, value }: UpdateUserBackFormValues) => {
  if (field === 'rate' && typeof value === 'number') {
    state.feedbackForm.rate = value;
  }

  if (field === 'email' && typeof value === 'string') {
    state.feedbackForm.email = value;
  }

  if (field === 'description' && typeof value === 'string') {
    state.feedbackForm.feedback = value;
  }

  state.feedbackForm.isError = !isEmail(state.feedbackForm.email) || !state.feedbackForm.feedback;
};
