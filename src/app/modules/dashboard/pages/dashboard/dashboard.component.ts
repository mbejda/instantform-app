import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
interface SideNavRoute {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  links = [
    {
      text: 'Forms',
      href: 'linked',
      icon:'folder'
    },
    {
      text: 'Billing',
      href: 'billing',
      icon:'money'
    },
    {
      text: 'Webhooks',
      href: 'webhooks',
      icon:'cloud'
    },
    {
      text: 'Logout',
      href: 'logout',
      icon:'logout'
    }
  ];
  constructor(private router: Router, private route: ActivatedRoute) { }

  public go(path) {
    this.router.navigate([{ outlets: {  under: [path] } }] ,{relativeTo:this.route})
  }
  ngOnInit() {
  }

}
