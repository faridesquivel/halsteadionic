import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../providers/files.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.page.html',
  styleUrls: ['./file.page.scss'],
})
export class FilePage implements OnInit {

  allLines: string[] = [];
  allPrograms: any[] = [];
  allWords: string[] = [];
  files: File[] = [];
  selectedFile: File;
  showOperadoresTable = true;
  showOperandosTable = true;
  showFileSelector = true;
  showTable = true;
  table = [];
  constructor(
    private filesService: FilesService
  ) { }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.allPrograms = [];
    for (const iterator of this.files) {
      // const file = this.files[0];
      const reader = new FileReader();

      reader.onload = (ev: any) => {
        console.log('Event is ready: ', ev);
        const ff = ev.target.result;
        const allLines = ff.toString().split(/\r\n|\n/);
        this.allLines = allLines;
        this.allLines.forEach((line) => {
          line.trim();
        });
        console.log('Will push all lines into programs', this.allLines);
        this.allPrograms.push(this.allLines);
        this.filesService.setPrograms(this.allPrograms);
        console.log('PROGRAMAS SON: ', this.allPrograms);
      };

      reader.onerror = (ev) => {
          alert(ev.target);
      };

      reader.readAsText(iterator);
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    console.log('FILES ARE NOW: ', this.files);
    this.allPrograms = [];
    for (const iterator of this.files) {
      // const file = this.files[0];
      const reader = new FileReader();

      reader.onload = (ev: any) => {
        console.log('Event is ready: ', ev);
        const ff = ev.target.result;
        const allLines = ff.toString().split(/\r\n|\n/);
        this.allLines = allLines;
        this.allLines.forEach((line) => {
          line.trim();
        });
        console.log('Will push all lines into programs', this.allLines);
        this.allPrograms.push(this.allLines);
        console.log('PROGRAMAS SON: ', this.allPrograms);
      };

      reader.onerror = (ev) => {
          alert(ev.target);
      };

      reader.readAsText(iterator);
    }
  }
}
