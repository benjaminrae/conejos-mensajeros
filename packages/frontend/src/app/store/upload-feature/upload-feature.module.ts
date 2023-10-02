import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { uploadFeature } from './upload-feature.reducer';

@NgModule({
  declarations: [],
  imports: [[StoreModule.forFeature(uploadFeature)]],
})
export class UploadFeatureModule {}
