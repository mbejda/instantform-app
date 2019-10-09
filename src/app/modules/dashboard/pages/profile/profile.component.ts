import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPlans().subscribe((plans)=>{
      console.log('small ',plans);
    })
  }

}
