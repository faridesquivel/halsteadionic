import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private _programs = new BehaviorSubject([]);
  private _savedPrograms = new BehaviorSubject([]);

  get programs() {
    return this._programs.asObservable();
  }

  get savedPrograms() {
      return this._savedPrograms.asObservable();
  }

  constructor(
    private storage: Storage
  ) { }

  deletePrograms() {
    return new Promise((resolve, reject) => {
        this.storage.clear().then(() => {
            this._savedPrograms.next([]);
            resolve();
        }).catch((error) => reject(error));
    });
  }

  fetchPrograms() {
    return new Promise((resolve, reject) => {
        this.storage.get('programs').then((data) => {
            console.log('Programs SAVED are:' , data);
            this._savedPrograms.next(JSON.parse(data));
            resolve();
        }).catch((err) => reject(err));
    });
  }

  setPrograms(programs: any) {
    console.log('Will set files: ', programs);
    return new Promise((resolve) => {
      this._programs.next(programs);
      resolve();
    });
  }

  saveMetric(prog) {
      return new Promise(async (resolve, reject) => {
        try {
            const savedPrograms = await this.storage.get('programs');
            if (savedPrograms) {
                console.log('Programas guardados: ', savedPrograms);
                const newPrograms = [...JSON.parse(savedPrograms), prog];
                console.log(newPrograms);
                this._savedPrograms.next(newPrograms);
                return this.storage.set('programs', JSON.stringify(newPrograms)).then(() => resolve()).catch((err) => reject(err));
            }
            return this.storage.set('programs', JSON.stringify([prog])).then(() => resolve()).catch((err) => reject());
          } catch (error) {
              console.log(error);
          }
      });
  }
}
