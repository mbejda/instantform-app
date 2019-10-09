import {Component, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Auth} from 'aws-amplify';
import {ActivatedRoute, Router} from '@angular/router';

function passwordConfirming(c: AbstractControl): any {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('password_confirm');

  if(!pwd || !cpwd) return ;
  if (pwd.value !== cpwd.value) {
    return { invalid: true };
  }
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error;
  form: FormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    password_confirm: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      passwordConfirming
    ]),

  });
  get cpwd() {
    return this.form.get('password_confirm');
  }

  async submit() {
    console.log(this.form);
    if (this.form.valid) {

      try {
        const response = await Auth.signUp({
          username: this.form.value.email,
          password: this.form.value.password
        });
        console.log(response);

        this.router.navigate(["/code"], { queryParams: { email: this.form.value.email },  queryParamsHandling: "merge" });

      } catch (e) {
        console.log(e);
        this.error  = e.message;
        throw e.message;
      }
    }
  }



  constructor(private route: ActivatedRoute, private router: Router) { }
  async ngOnInit() {

  }

}
