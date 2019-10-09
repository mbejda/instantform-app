import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {Auth} from 'aws-amplify';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {


  error;
  email: string;
  code: string;
  form: FormGroup = new FormGroup({
    code: new FormControl('', [ Validators.required])
  });

  async submit() {
    console.log(this.email)
    if (this.form.valid) {
      try {
        const user = await Auth.confirmSignUp(this.email, this.form.value.code);
        if (user === 'SUCCESS') {
          this.router.navigate(["/signin"], {queryParams: {email: this.email}, queryParamsHandling: "merge"});
        }
      }catch(e){
        if(e.message.indexOf('CONFIRMED') > -1) {
          this.router.navigate(["/signin"], {queryParams: {email: this.email}, queryParamsHandling: "merge"});
        }
      }

    }
  }

  constructor(private route: ActivatedRoute, private router: Router) { }
  async ngOnInit() {
    const email = this.route.snapshot.queryParams.email;
    this.email = email;


  }
}
