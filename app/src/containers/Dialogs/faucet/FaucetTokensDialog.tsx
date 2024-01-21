import React, { Fragment, FC } from 'react';
import Image from 'next/image';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Flex from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import theme from '@theme';
import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import sessionStore from '@utils/sessionStore';
import { DIALOGS, SESSION_STORE_KEY } from '@constants';
import { DialogTitle, SafeText, Text, Button } from '@components';
import MetamaskButtonContainer from '../../MetamaskButton';

const FaucetTokensDialog: FC = (): JSX.Element => {
  const { list, faucetTokens } = useTypedSelector((state) => state.tokens);
  const { getFaucetTokens, resetFaucetTokens, closeDialog } = useActions();
  const isEmptyFaucetTokens = Object.keys(faucetTokens).length === 0;
  const title = isEmptyFaucetTokens ? 'FAUCET.GET_ALL_TOKENS.TITLE' : '';

  const setHiddenDialogSession = () => {
    sessionStore.post(SESSION_STORE_KEY.IS_HIDDEN_FAUCET_TOKENS_DIALOG, true);
  };

  const onClose = () => {
    setHiddenDialogSession();
    resetFaucetTokens();
    closeDialog({ name: DIALOGS.FAUCET_TOKENS });
  };

  const handleClick = () => {
    setHiddenDialogSession();
    getFaucetTokens();
  };

  return (
    <Fragment>
      <DialogTitle title={title} onClose={onClose} />
      <DialogContent>
        <Flex gap={1} flexDirection="column" width="100%">
          {!isEmptyFaucetTokens &&
            list.map(({ iconUrl, symbol, address, decimals }) => {
              const faucetToken = faucetTokens[symbol];

              if (!faucetToken || faucetToken.loading) {
                return <Skeleton key={symbol} height={36} />;
              }

              const isSuccess = faucetToken.status === 200;
              const statusText = isSuccess
                ? 'FAUCET.GET_ALL_TOKENS.SUCCESS'
                : `FAUCET.GET_ALL_TOKENS.${faucetToken.error}`;

              return (
                <Flex key={symbol} gap={1} alignItems="center">
                  <Image src={iconUrl} width={24} height={24} alt={symbol} />
                  <SafeText content={symbol} variant="body1" fontWeight={600} minWidth={50} />
                  <Text
                    tid={statusText}
                    variant="body1"
                    color={isSuccess ? theme.palette.success.main : theme.palette.error.main}
                    flex={1}
                  />
                  <MetamaskButtonContainer size="small" {...{ symbol, address, decimals }} />
                </Flex>
              );
            })}
        </Flex>
      </DialogContent>
      {isEmptyFaucetTokens && (
        <DialogActions>
          <Button title="COMMON.TAKE_TEST_COINS" onClick={handleClick} />
        </DialogActions>
      )}
    </Fragment>
  );
};

export default FaucetTokensDialog;
