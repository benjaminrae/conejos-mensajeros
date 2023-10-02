import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui/ui.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  file!: File;
  formData = new FormData();

  uploadForm = this.fb.group({
    file: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly uiService: UiService,
    private readonly uploadService: UploadService,
  ) {}

  submitForm() {
    this.uiService.showLoading();
    this.getFormData();

    const response$ = this.uploadService.uploadFile(this.formData);

    response$.subscribe(async () => {
      this.uiService.showSuccessModal('Your upload has started');
      this.uiService.hideLoading();
      await this.uiService.navigate('/my-uploads');
    });
  }

  getFormData() {
    if (this.file) {
      this.formData.append('file', this.file);
    }
  }

  onFileChange(event: Event) {
    if ((event.target as HTMLInputElement).files!.length > 0) {
      this.file = (event.target as HTMLInputElement).files![0];
    }
  }
}
