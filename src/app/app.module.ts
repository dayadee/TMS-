import {RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { CheckComponent } from './check/check.component';
import { MaterialModule } from './shared/materail.module';
import { HttpClient } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const route: Routes = [
   {path: '', loadChildren: './welcome/welcome.module#WelcomeModule'},
   {path: '', loadChildren: './manager/manager.module#ManagerModule'},
   {path: '**', redirectTo: ''}
];


@NgModule({
  declarations: [
    AppComponent,
    CheckComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CdkTableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
