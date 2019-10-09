import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Auth} from 'aws-amplify';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {


  error;
  form: FormGroup = new FormGroup({
    email: new FormControl('')
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
