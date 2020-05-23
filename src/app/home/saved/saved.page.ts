import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/providers/files.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  savedPrograms = [];
  constructor(
    private fileService: FilesService
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    try {
      await this.fileService.fetchPrograms();
      this.fileService.savedPrograms.subscribe((data) => {
        if (data) {
          this.savedPrograms = data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteSaved() {
    this.fileService.deletePrograms();
  }
}
