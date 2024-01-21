import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormState } from '@models/state';
import {
  PositionField,
  PositionFieldValue,
  PositionForm,
  PoolField,
  PoolFieldValue,
  PoolForm,
  UserBackField,
  FeedbackForm,
  UserBackFieldValue,
  BugReportForm,
  FeatureForm,
} from '@models/form';
import { TokensApi } from '@models/api';
import {
  getPositionTokensValues,
  getPositionCurveTokensValues,
  getPositionOneInchTokensValues,
  getInitialPositionFormValues,
  getPoolTokensValues,
  getInitialPoolFormValues,
} from '@utils/api/form';
import {
  updatePositionFormValues,
  updatePoolFormValues,
  updateFeedbackFormValues,
  updateBagReportFormValues,
  updateFeatureFormValues,
} from '@utils/form';

type UpdatePositionValuesAction = {
  field: PositionField;
  value: PositionFieldValue;
};

type UpdatePoolValuesAction = {
  field: PoolField;
  value: PoolFieldValue;
};

type UpdateUserBackValuesAction = {
  field: UserBackField;
  value: UserBackFieldValue;
};

const initialState: FormState = {
  positionForm: {} as PositionForm,
  uniswapTokensValues: [],
  curveTokensValues: [],
  oneInchTokensValues: [],
  poolForm: {} as PoolForm,
  poolTokensValues: [],
  bugReportForm: { isError: true } as BugReportForm,
  featureForm: { isError: true } as FeatureForm,
  feedbackForm: { isError: true } as FeedbackForm,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getTokensValuesSuccess(state, action: PayloadAction<{ data: TokensApi; chainId: number }>) {
      const positionTokenValues = getPositionTokensValues(action.payload.data, action.payload.chainId);
      const poolTokenValues = getPoolTokensValues(action.payload.data, action.payload.chainId);

      state.positionForm = getInitialPositionFormValues(positionTokenValues);
      state.uniswapTokensValues = positionTokenValues;
      state.curveTokensValues = getPositionCurveTokensValues(positionTokenValues);
      state.oneInchTokensValues = getPositionOneInchTokensValues(positionTokenValues);

      state.poolForm = getInitialPoolFormValues(poolTokenValues);
      state.poolTokensValues = poolTokenValues;
    },
    updatePositionValues(state, action: PayloadAction<UpdatePositionValuesAction>) {
      updatePositionFormValues({
        state,
        field: action.payload.field,
        value: action.payload.value,
      });
    },
    updatePoolValues(state, action: PayloadAction<UpdatePoolValuesAction>) {
      updatePoolFormValues({
        state,
        field: action.payload.field,
        value: action.payload.value,
      });
    },
    updateBugReportValues(state, action: PayloadAction<UpdateUserBackValuesAction>) {
      updateBagReportFormValues({
        state,
        field: action.payload.field,
        value: action.payload.value,
      });
    },
    resetBugReportValues(state) {
      state.bugReportForm = initialState.bugReportForm;
    },
    updateFeatureValues(state, action: PayloadAction<UpdateUserBackValuesAction>) {
      updateFeatureFormValues({
        state,
        field: action.payload.field,
        value: action.payload.value,
      });
    },
    resetFeatureValues(state) {
      state.featureForm = initialState.featureForm;
    },
    updateFeedbackValues(state, action: PayloadAction<UpdateUserBackValuesAction>) {
      updateFeedbackFormValues({
        state,
        field: action.payload.field,
        value: action.payload.value,
      });
    },
    resetFeedbackValues(state) {
      state.feedbackForm = initialState.feedbackForm;
    },
  },
});

export const formActions = formSlice.actions;

export const formReducer = formSlice.reducer;
