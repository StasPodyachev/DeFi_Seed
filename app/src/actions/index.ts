import { dialogsActions } from '@reducers/dialogsReducer';
import { layoutActions } from '@reducers/layoutReducer';
import { formActions } from '@reducers/formReducer';
import { userActions } from '@reducers/userReducer';
import { transactionsActions } from '@reducers/transactionsReducer';

import * as positionsActions from './positionsActions';
import * as poolsActions from './poolsActions';
import * as tokensActions from './tokensActions';
import * as userBackActions from './userBackActions';
import * as addressesActions from './addressesActions';

const actionCreators = {
  ...userActions,
  ...layoutActions,
  ...dialogsActions,
  ...formActions,
  ...transactionsActions,
  ...positionsActions,
  ...poolsActions,
  ...tokensActions,
  ...userBackActions,
  ...addressesActions,
};

export default actionCreators;
