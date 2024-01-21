import React, { useEffect } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { NotFound } from '@components';

const withError = (Component: React.ComponentType<any | string>) => {
  const HOComponent = (props: any): JSX.Element => {
    const { error: tokensError } = useTypedSelector((store) => store.tokens);
    const { error: positionsError } = useTypedSelector((store) => store.positions);
    const { error: poolsError } = useTypedSelector((store) => store.pools);
    const { resetTokens, resetPositions, resetPools } = useActions();

    const hasError = !!tokensError || !!positionsError || !!poolsError;

    useEffect(() => {
      return () => {
        if (tokensError) resetTokens();
        if (positionsError) resetPositions();
        if (poolsError) resetPools();
      };
    }, []);

    if (hasError) {
      return <NotFound />;
    }

    return <Component {...props} />;
  };

  return HOComponent;
};

export default withError;
