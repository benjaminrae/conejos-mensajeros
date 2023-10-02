import { createFeature, createReducer, on } from '@ngrx/store';
import { type UserState } from './types';
import { loginUser, logoutUser } from './user-feature.actions';

const initialUserState: UserState = {
  id: '',
  token: '',
  email: '',
  isLogged: false,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialUserState,

    on(
      loginUser,
      (currentState, { payload }): UserState => ({
        ...currentState,
        ...payload,
        isLogged: true,
      }),
    ),

    on(
      logoutUser,
      (currentState): UserState => ({
        ...currentState,
        id: '',
        token: '',
        isLogged: false,
      }),
    ),
  ),
});

export const {
  name,
  reducer,
  selectUserState,
  selectIsLogged,
  selectToken,
  selectId,
  selectEmail,
} = userFeature;
