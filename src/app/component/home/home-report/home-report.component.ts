import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { ExcelService } from 'src/app/service/excel.service';
import { HomeService } from 'src/app/service/home.service';
import { log } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-report',
  templateUrl: './home-report.component.html',
  styleUrls: ['./home-report.component.css']
})
export class HomeReportComponent implements OnInit {
  log = 'HomeReportComponent';
  reportFormGroup: FormGroup;
  step: number;
  showProgress: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar, private home: HomeService , private excelService: ExcelService, private datepipe: DatePipe) {
    this.reportFormGroup = this
      .formBuilder.group({
        frmDtCntrl: [, Validators.required],
        toDtCntrl: [, Validators.required],
      });
  }

  displayedColumns: string[] = ['CourierId', 'CourierName', 'QuestionName', 'SelectedAnswer', 'CreatedBy', 'CreatedDate', 'Entity' ];
  dataSource: MatTableDataSource<Result>;
  data: any;
  todate = 'To Date';
  frmdate = 'From Date';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.step = 0;
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  getReport(reportformdirective: FormGroupDirective) {
    if (this.reportFormGroup.invalid) {
      this.showSnackBar('Invalid', 2000);
      return;
    }
    const f = this.datepipe.transform(this.reportFormGroup.value.frmDtCntrl, 'yyyy-MM-dd');
    const t = this.datepipe.transform(this.reportFormGroup.value.toDtCntrl, 'yyyy-MM-dd');
    // const ff = Date.parse(this.reportFormGroup.value.frmDtCntrl.toDateString());
    // const fff = this.datepipe.transform(this.reportFormGroup.value.frmDtCntrl, 'yyyy-MM-dd');
    // console.log(this.log, fff);
    this.showProgress = true;
    this.home.GetResult(f, t).subscribe(res => {
      console.log(this.log, this.reportFormGroup.value.frmDtCntrl);
      console.log(this.log, this.reportFormGroup.value.toDtCntrl);
      this.showProgress = false;
      this.data = res;
      this.dataSource = new MatTableDataSource<Result>(res);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.showProgress = false;
      this.showSnackBar(JSON.stringify(error) , 12000);
      console.log(this.log, error);
      });
  }

  Export() {
    this.excelService.exportAsExcelFile(this.data , 'sample');
  }

  showSnackBar(message: string, delay: number) {
    this
      .snackbar
      .open(message, 'OK', { duration: delay });
  }

}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

export interface Result {
  AnswerId: string;
  CourierId: string;
  CourierName: string;
  Entity: string;
  QuestionName: string;
  SelectedAnswer: string;
  CreatedBy: string;
  CreatedDate: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];
