export const performSharesValue = (totalAmount: bigint | unknown, userAmount: bigint | unknown) => {
  if (typeof totalAmount !== 'bigint' || typeof userAmount !== 'bigint') {
    return '0.00';
  }

  const _userAmount = +userAmount.toString();
  const _totalAmount = +totalAmount.toString();

  if (_userAmount === 0 || _totalAmount === 0) {
    return '0.00';
  }

  return ((_userAmount / _totalAmount) * 100).toFixed(2);
};
