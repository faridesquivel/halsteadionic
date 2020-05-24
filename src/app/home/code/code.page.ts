import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/providers/files.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {
  allPrograms = [];
  files: File[] = [];
  constructor(
    private filesService: FilesService
  ) { }

  ngOnInit() {
    this.filesService.programs.subscribe((data) => {
      this.allPrograms = data;
      console.log('Los programas son: ', data);
    });
  }

}
