import useTypedSelector from '@hooks/useTypedSelector';
import { EXCHANGERS } from '@constants/dictionaries';

const usePositionTokensValues = () => {
  const {
    positionForm: { exchange },
    uniswapTokensValues,
    curveTokensValues,
    oneInchTokensValues,
  } = useTypedSelector((state) => state.form);
  const { hasData } = useTypedSelector((state) => state.tokens);

  if (!hasData) {
    return [];
  }

  const [uniswap, curve, oneInch] = EXCHANGERS;

  switch (exchange.value) {
    case uniswap.value:
      return uniswapTokensValues;
    case curve.value:
      return curveTokensValues;
    case oneInch.value:
      return oneInchTokensValues;
    default:
      return uniswapTokensValues;
  }
};

export default usePositionTokensValues;
