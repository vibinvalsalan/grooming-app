import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeReportComponent } from './home-report/home-report.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ExcelService } from 'src/app/service/excel.service';

@NgModule({
  declarations: [HomeComponent,  HomeReportComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ExcelService],
})
export class HomeModule { }
