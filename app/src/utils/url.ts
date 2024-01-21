export const getQueryParamsStr = (params: Record<string, string | number | boolean>) =>
  Object.keys(params).reduce((result, param) => {
    const urlParam = `${param}=${encodeURIComponent(params[param])}`;

    return !result ? urlParam : `${result}&${urlParam}`;
  }, '');
