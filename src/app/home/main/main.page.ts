import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FilesService } from 'src/app/providers/files.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  allLines: string[] = [];
  allPrograms = [];
  allWords: string[] = [];
  files: File[] = [];
  selectedFile: File;
  showOperadoresTable = true;
  showOperandosTable = true;
  showFileSelector = true;
  showTable = true;
  table = [];

  constructor(
    private navController: NavController,
    private fileService: FilesService
    ) { }

  ngOnInit() {
  }

  calcularMetricas() {
    this.navController.navigateForward('/home/tabs/metrics');
  }

  verDB() {
    this.navController.navigateForward('/home/tabs/saved');
  }
}
