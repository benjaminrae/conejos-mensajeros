import { createFeature, createReducer, on } from '@ngrx/store';
import { UploadState } from './types';
import { loadUploads } from './upload-feature.actions';

const initialUploadState: UploadState = {
  uploads: [],
};

export const uploadFeature = createFeature({
  name: 'uploads',
  reducer: createReducer(
    initialUploadState,

    on(
      loadUploads,
      (currentState, { payload: { uploads } }): UploadState => ({
        ...currentState,
        uploads,
      }),
    ),
  ),
});

export const { name, reducer, selectUploadsState, selectUploads } =
  uploadFeature;
