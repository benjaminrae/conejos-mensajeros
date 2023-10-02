import { type ActionReducerMap, type MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { type ApplicationState } from './types';
import { uiFeature } from './ui-feature/ui-feature.reducer';
import { uploadFeature } from './upload-feature/upload-feature.reducer';
import { userFeature } from './user-feature/user-feature.reducer';

export const reducers: ActionReducerMap<ApplicationState> = {
  ui: uiFeature.reducer,
  user: userFeature.reducer,
  uploads: uploadFeature.reducer,
};

export const metaReducers: Array<MetaReducer<ApplicationState>> =
  !environment.production ? [] : [];
