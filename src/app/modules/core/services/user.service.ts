import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from 'aws-amplify';
import {from, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  addForm(email: string) {

    return from(API.post('main', '/form', {body: {email}}));
  }
  listEmails() {
    return from(API.get('main', '/forms', {}));
  }
  deleteForm(email: string) {
    return from(API.del('main', `/form/${email}`, {}));
  }

  getPlans() {
    return from(API.get('main', '/plans', {}));
  }
  createSubscription(token: string, planId: string) {
    const body = {
      token,
      planId
    };
    return from(API.post('main', '/subscription', {body}));
  }
  createCard(obj) {
    return from(API.post('main', '/cards', obj));
  }
  removeCard(obj) {
    return from(API.del('main', '/cards', obj));

  }
  updateUser(obj) {
    return from(API.put('main', '/user', obj));
  }
  self() {
    return from(API.get('main', '/user', {}));
  }


}
