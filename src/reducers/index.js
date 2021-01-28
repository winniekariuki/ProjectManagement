 
import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { organisation } from './organisation.reducer';
import {opportunity} from './opportunity.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  organisation,
  opportunity,
  users,
  alert
});

export default rootReducer;