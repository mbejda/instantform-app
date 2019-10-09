import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AddComponent} from './add/add.component';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../core/services/user.service';
import * as moment from 'moment';



/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
  selector: 'app-linked',
  templateUrl: './linked.component.html',
  styleUrls: ['./linked.component.scss']
})
export class LinkedComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email','createdAt', 'count', 'limit', 'actions'];
  dataSource = new MatTableDataSource<any>();

  animal: string;
  name: string;
  emails: any;
  private paginator: MatPaginator;

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  constructor(public dialog: MatDialog, private userService: UserService) {}

  listForms(){

   this.userService
     .listEmails()
     .subscribe((response:any)=>{



     const table =  response.forms.map((form:any)=>{
       form.createdAt = moment(form.createdAt).format('MM/DD');
       return form;
     });

       this.dataSource = new MatTableDataSource<Element>(table);
       this.dataSource.paginator = this.paginator;

       //this.dataSource = table;



     })
  }
  ngOnInit() {
    this.listForms();
  }
  remove(form){

    this.userService.deleteForm(form.email).subscribe((response)=>{
      /*this.dataSource = this.dataSource.filter((value,key)=>{
        return value.email != form.email;
      });*/
    });
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(email => {
      this.userService.addForm(email).subscribe((response: any)=>{
        this.listForms();
      });
    });
  }

  ngAfterViewInit(): void {

  }

}
