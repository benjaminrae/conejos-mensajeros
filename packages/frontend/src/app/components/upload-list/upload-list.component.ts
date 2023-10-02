import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/services/upload/upload.service';
import { Upload } from 'src/app/store/upload-feature/types';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
})
export class UploadListComponent implements OnInit {
  uploads$!: Observable<Upload[]>;

  constructor(private readonly uploadService: UploadService) {}

  ngOnInit(): void {
    this.uploadService.getUploads();

    this.uploads$ = this.uploadService.selectUploads();
  }
}
