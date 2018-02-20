import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/materail.module';

const route: Routes = [{
  path: '', component: WelcomeComponent}];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(route)
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
