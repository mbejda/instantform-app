import { Component, OnInit } from '@angular/core';
import {Auth} from 'aws-amplify';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {
    await Auth.signOut();
    this.router.navigate(['/signin']);
  }

}
