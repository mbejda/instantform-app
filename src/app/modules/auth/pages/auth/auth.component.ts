import {Component, Input, OnInit, Output} from '@angular/core';
import {API, Auth} from 'aws-amplify';
import {FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from 'events';
import {AmplifyService} from 'aws-amplify-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      const user = await Auth.signIn(this.form.value.username, this.form.value.password);
      console.log(user);

    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  public usernameAttributes = 'email';
  signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password'
      }
    ]
  };

  constructor() { }
  async ngOnInit() {

  }

}
