import { Component, Input } from '@angular/core';
import { UploadService } from 'src/app/services/upload/upload.service';
import { Upload } from 'src/app/store/upload-feature/types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  @Input() upload!: Upload;

  constructor(private readonly uploadService: UploadService) {}

  fileIcon(mimetype: string) {
    if (mimetype.includes('image')) {
      return '🖼️';
    }

    if (mimetype.includes('video')) {
      return '🎥';
    }

    if (mimetype.includes('audio')) {
      return '🎵';
    }

    if (mimetype.includes('pdf')) {
      return '📃';
    }

    if (mimetype.includes('text')) {
      return '📄';
    }

    return '📁';
  }

  onDownloadClick() {
    this.uploadService.downloadFile(this.upload.url).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.upload.filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }
}
