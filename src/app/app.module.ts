import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HomeModule } from './component/home/home.module';
import { HeaderComponent } from './component/header/header.component';
import { AdminComponent } from './component/admin/admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExcelService } from './service/excel.service';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthService } from './service/auth.service';
import { DatePipe } from '@angular/common';
import { UnauthorisedComponent } from './component/unauthorised/unauthorised.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    LoginComponent,
    UnauthorisedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ExcelService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
