import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/providers/files.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.page.html',
  styleUrls: ['./view-program.page.scss'],
})
export class ViewProgramPage implements OnInit {
  n1 = [];
  n2 = [];
  expressions = [',', ':', '=', 'while', '>', '+', 'while', '-', ',', '()'];
  savedProgram = [];
  math = Math;
  programId;

  constructor(
    private filesService: FilesService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('index')) {
        this.navCtrl.navigateBack('/home/tabs/saved');
        return;
      }
      this.programId = paramMap.get('index');
    });
    try {
      await this.filesService.fetchPrograms();
      this.filesService.savedPrograms.subscribe((data) => {
        if (data) {
          console.log('All saved programs are:' , data);
          this.savedProgram[0] = data[this.programId];
          console.log('Index is', this.programId, ' and program: ', this.savedProgram);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  isStart(line) {
    return /def/gm.test(line);
  }

  isEnd(line) {
    return /return/gm.test(line);
  }

  getTotalOfN1(): number {
    let total = 0;
    for (const iterator of this.n1) {
      total = total + iterator.N1;
    }
    return total;
  }

  getTotalOfN2(): number {
    let total = 0;
    for (const iterator of this.n2) {
      total = total + iterator.N2;
    }
    return total;
  }

  n1HasStart() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes('def') || this.n1[index].operadores.includes('return')) {
         return index;
      }
    }
    return -1;
  }

  isEqual(line) {
    return /=/gm.test(line);
  }

  n1HasEqual() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes('=')) {
         return index;
      }
    }
    return -1;
  }

  isTwoPoints(line) {
    return /:/gm.test(line);
  }

  n1HasTwoPoints() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes(':')) {
         return index;
      }
    }
    return -1;
  }

  isWhile(line) {
    return /while/gm.test(line);
  }

  n1HasWhile() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes('while')) {
         return index;
      }
    }
    return -1;
  }

  isHigher(line) {
    return />/gm.test(line);
  }

  n1HasHigher() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes('>')) {
         return index;
      }
    }
    return -1;
  }

  isBrackets(line) {
    return /\((.*?)\)/gm.test(line);
  }

  n1HasBrackets() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes('()')) {
         return index;
      }
    }
    return -1;
  }

  isComma(line) {
    return /,/gm.test(line);
  }

  n1HasComma() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes(',')) {
         return index;
      }
    }
    return -1;
  }

  isLess(line) {
    return /-/gm.test(line);
  }

  n1HasLess() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes('-')) {
         return index;
      }
    }
    return -1;
  }

  isPlus(line) {
    return /\+/gm.test(line);
  }

  n1HasPlus() {
    for (let index = 0; index < this.n1.length; index++) {
      if (this.n1[index].operadores.includes('+')) {
         return index;
      }
    }
    return -1;
  }


  isVariable(line) {
    const result = line.match(/[a-zA-Z]{1}[a-zA-Z0-9]{0,9}|\b\d+\b/g);
    return result;
  }

  saveVariables(array) {
    for (const iterator of array) {
      if (!this.isStart(iterator) && !this.isEnd(iterator) && !this.isWhile(iterator)) {
        const index = this.n2OperatorExists(iterator);
        if (index !== -1) {
          this.n2[index].N2++;
        } else {
          const newStart = {
            operando: [`${iterator}`],
            N2: 1
          };
          this.n2.push(newStart);
        }
      }
    }
  }

  n2OperatorExists(op) {
    for (let index = 0; index < this.n2.length; index++) {
      if (this.n2[index].operando.includes(op)) {
        return index;
      }
    }
    return -1;
  }

  analizeLine(line) {
    if (this.isStart(line)) {
      const index = this.n1HasStart();
      if (index !== -1) {
        this.n1[index].operadores.push('def');
      } else {
        const newStart = {
          operadores: ['def'],
          N1: 1
        };
        this.n1.unshift(newStart);
      }
    }
    if (this.isEnd(line)) {
      const index = this.n1HasStart();
      if (index !== -1) {
        this.n1[index].operadores.push('return');
      } else {
        const newStart = {
          operadores: ['return'],
          N1: 1
        };
        this.n1.unshift(newStart);
      }
    }
    if (this.isEqual(line)) {
      const index = this.n1HasEqual();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: ['='],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    if (this.isTwoPoints(line)) {
      const index = this.n1HasTwoPoints();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: [':'],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    if (this.isWhile(line)) {
      const index = this.n1HasWhile();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: ['while'],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    if (this.isHigher(line)) {
      const index = this.n1HasHigher();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: ['>'],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    if (this.isPlus(line)) {
      const index = this.n1HasPlus();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: ['+'],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    if (this.isLess(line)) {
      const index = this.n1HasLess();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: ['-'],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    if (this.isComma(line)) {
      const index = this.n1HasComma();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: [','],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    if (this.isBrackets(line)) {
      const index = this.n1HasBrackets();
      if (index !== -1) {
        this.n1[index].N1++;
      } else {
        const newStart = {
          operadores: ['()'],
          N1: 1
        };
        this.n1.push(newStart);
      }
    }
    const extracted = this.isVariable(line);
    console.log('Result from isVARIABLE: ', extracted);
    if (extracted.length) {
      this.saveVariables(extracted);
    }
    console.log('Final: ', this.n2);
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

  ionViewDidEnter() {
    if (this.savedProgram.length > 0 && !this.n1.length) {
      console.log('Get metrics called with ', this.savedProgram);
      this.getMetrics(this.savedProgram);
    } else {
      return this.navCtrl.navigateBack('/home/tabs/saved');
    }
  }
}
