import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MyFileName, ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status';
import { UploadDownloadService } from 'src/app/_services/upload-download.service';
import { Guid } from 'guid-typescript';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent{

  @Input() public disabled: boolean = false;
  @Output() public uploadStatus: EventEmitter<ProgressStatus>;
  @Output() public myfile !: EventEmitter<MyFileName>;
  @ViewChild('inputFile') inputFile!: ElementRef ;

  constructor(private service: UploadDownloadService) {
    this.uploadStatus = new EventEmitter<ProgressStatus>();
    this.myfile = new EventEmitter<MyFileName>();
  }

  myFileString : string[] = [];
  myFileName :string='';
  public upload(event:any) {
    if (event.target.files && event.target.files.length > 0) {
      this.myFileString = event.target.files[0].name.split(".");
      this.myFileName = Guid.create().toString() + '.' + this.myFileString[this.myFileString.length-1];
      const file = event.target.files[0];
      this.myfile.emit({name : event.target.files[0].name, myFilename : this.myFileName});
      this.uploadStatus.emit( {status: ProgressStatusEnum.START});
      this.service.uploadFile(file,this.myFileName).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage:data.loaded });
                break;
              case HttpEventType.DownloadProgress:
                this.inputFile.nativeElement.value = '';
                this.uploadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
                break;
              }
            }
        },
        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatus.emit( {status: ProgressStatusEnum.ERROR});
        }
      );
      
    }
  }

}
