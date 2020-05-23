import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/providers/files.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
export class MetricsPage implements OnInit {
  allLines: string[] = [];
  allPrograms = [];
  showOperadoresTable = true;
  showOperandosTable = true;
  showFileSelector = true;
  showTable = true;
  table = [];
  constructor(
    private filesService: FilesService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  getMetrics(array) {
    for (const iterator of array) {
      
    }
  }

  ionViewWillEnter() {
    this.filesService.programs.subscribe((data) => {
      this.allPrograms = data;
      if (this.allPrograms) {
        this.getMetrics(this.allPrograms);
      }
    });
  }

  saveProgram(prog) {
    console.log('Listo para guardar: ', prog);
    this.loadingController
    .create({ keyboardClose: true, message: 'Guardando...' })
    .then(loadingEl => {
      loadingEl.present();
      this.filesService.saveMetric(prog).then((user) => {
        loadingEl.dismiss();
        this.alertController.create({
          header: 'Listo',
          message: 'Se ha guardado el programa',
          buttons: ['OK']
        }).then((ca) => {
          ca.present();
        });
      }).catch(err => {
        loadingEl.dismiss();
        this.alertController.create({
          header: 'Error guardando el programa en memoria',
          message: JSON.stringify(err),
          buttons: ['OK']
        }).then((ca) => {
          ca.present();
        });
      });
    });
  }

}
