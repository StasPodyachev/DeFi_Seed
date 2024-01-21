import { api } from '@services/request';
import { UserBackPayload } from '@models/api';
import { getQueryParamsStr } from '@utils/url';
import { URLS } from '@constants/api';

export const fetchUserBack = (payload: UserBackPayload) => () =>
  api.post(`${URLS.FEEDBACK}?${getQueryParamsStr(payload)}`);
