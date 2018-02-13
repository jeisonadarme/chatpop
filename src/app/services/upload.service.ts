import { Upload } from './../models/upload';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ChatService } from './../services/chat.service';

@Injectable()
export class UploadService {

  constructor(private chatService: ChatService) { }

  pushUpload(upload: Upload, chatId: string) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`uploads/${upload.file.name}`)
      .put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      // upload progress
      console.log("progress", snapshot);
      upload.progress = 
      (uploadTask.snapshot.bytesTransferred / 
        uploadTask.snapshot.totalBytes) * 100;
    },
      (error) => {
        // upload error
        console.log(error);
      },
      () => {
        // upload succes
        console.log(uploadTask.snapshot);
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.size = uploadTask.snapshot.metadata.size;
        upload.contentType = uploadTask.snapshot.metadata.contentType;
        this.saveFileData(upload, chatId);
      }
    )
  }

  public saveFileData(upload: Upload, chatId: string){
    this.chatService.sendMedia(upload.url, upload.contentType, upload.size, chatId);
  }
}
