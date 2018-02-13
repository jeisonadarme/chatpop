import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { UploadService } from './../services/upload.service';
import { ChatMiddlewareService } from './../services/chat-middleware.service';
import { Upload } from './../models/upload';
import * as _ from 'lodash';
import 'firebase/storage'

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  currentUpload: Upload;
  dropzoneActivate: boolean = false;
  @ViewChild('scroller') private feedContainer: ElementRef;
  currentChatId: string;

  constructor( private upSvc: UploadService, private chatMiddlewareService: ChatMiddlewareService) { }

  ngOnInit() {
    this.chatMiddlewareService.currentChatId.subscribe(id => this.currentChatId = id);
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  dropzoneState($event: boolean) {
    this.dropzoneActivate = $event;
  }

  handleDrop(fileList: FileList){ 
    let filesIndex = _.range(fileList.length);

    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(fileList[idx]);
      this.upSvc.pushUpload(this.currentUpload, this.currentChatId);
    })
  }
}
