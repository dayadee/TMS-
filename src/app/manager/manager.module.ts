import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,  Routes} from '@angular/router';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';

import { MaterialModule } from '../shared/materail.module';


import { AdduserComponent } from './components/adduser/adduser.component';
import { ListuserComponent } from './components/listuser/listuser.component';

const routes: Routes = [
  {path: 'addform', component: AdduserComponent},
  {path: 'listuser', component: ListuserComponent},
      {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdduserComponent, ListuserComponent]
})
export class ManagerModule { }
