import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Auth} from 'aws-amplify';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  error;
  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  async submit() {
    if (this.form.valid) {
      try {
        const user = await Auth.signIn(this.form.value.email, this.form.value.password);

        if(user) {
          setTimeout(() => {
            this.router.navigate(["/user/dashboard", {outlets: {under: 'billing'}}]);
          }, 100);
        }

      }catch(e){
        if(e.message){
          this.error = e.message;
        }
      }

    }
  }

  constructor(private route: ActivatedRoute, private router: Router) { }
  async ngOnInit() {
    const email = this.route.snapshot.queryParams.email;
    if(email) {
      this.form.controls.email.setValue(email);
    }
    try {
      const loggedIn = await Auth.currentAuthenticatedUser();
      console.log('ues ',loggedIn);
        setTimeout(()=>{
          this.router.navigate(["/user/dashboard", { outlets: { under: 'billing' } }]);
        },100);
      } catch(e){
      console.error(e);
    }
  }
}
