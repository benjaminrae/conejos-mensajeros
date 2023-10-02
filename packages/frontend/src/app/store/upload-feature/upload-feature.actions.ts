import { createAction, props } from '@ngrx/store';
import { UploadState } from './types';

export const loadUploads = createAction(
  '[UPLOADS] Load uploads',
  props<{ payload: UploadState }>(),
);
