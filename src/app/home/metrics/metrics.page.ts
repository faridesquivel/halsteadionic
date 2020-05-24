import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/providers/files.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
export class MetricsPage implements OnInit {
  n1 = [{ operadores: [], N1: 0 }];
  n2 = [];
  N1 = [];
  N2 = [];
  allPrograms = [];
  constructor(
    private filesService: FilesService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  isStart(line) {
    return /def/gm.test(line);
  }

  isEnd(line) {
    return /return/gm.test(line);
  }

  analizeLine(line) {
    if (this.isStart(line)) {
      this.n1[0].operadores.push('def');
      this.n1[0].N1 = this.n1[0].N1 + 1;
    }
  }

  getMetrics(array) {
    for (const iterator of array) {
      console.log(`Will iterate: ${iterator}`);
      for (const it2 of iterator) {
        console.log('La linea del iterador es: ', it2);
        this.analizeLine(it2);
      }
    }
  }

  ionViewWillEnter() {
    this.filesService.programs.subscribe((data) => {
      this.allPrograms = data;
      if (this.allPrograms && this.n1[0].N1 <= 1) {
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
