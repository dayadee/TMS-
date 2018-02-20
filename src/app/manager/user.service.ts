import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { stringify } from '@angular/core/src/util';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Injectable()
export class UserService {

  constructor() { }

}
