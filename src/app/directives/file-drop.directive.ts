import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter();

  constructor() { }

  @HostListener('drop', ['$event'])
    onDrop($event) {
      $event.preventDefault();

      let transfer = $event.dataTransfer;
      this.filesDropped.emit(transfer.files);
      this.filesHovered.emit(false);
    }

  @HostListener('dragover', ['$event'])
    onDragOver($event) {
      event.preventDefault();
      this.filesHovered.emit(true);
    }

  @HostListener('dragleave', ['$event'])
    onDragLeave($event){
      this.filesHovered.emit(false);
    }

  @HostListener('dragenter', ['$event'])
    onDragEnter($event) {
      event.preventDefault();
    }
}
