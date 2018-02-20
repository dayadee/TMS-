import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmComponent } from './mm.component';
import { RouterModule, Routes } from '@angular/router';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';


const route: Routes = [
  {path: '', component: MmComponent},
  {path: '**', redirectTo: ''}
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  declarations: [MmComponent]
})
export class MmModule {
 }
