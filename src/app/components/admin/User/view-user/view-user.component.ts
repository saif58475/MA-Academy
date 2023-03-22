import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './../../../../shared/API-Service/services/register.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
Users:any;
  constructor(private _RegisterService:RegisterService
              ,private _Router:Router) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers(){
    this._RegisterService.GetUsers().subscribe((res) => {
      this.Users = res;
    })
  }


  update(record:object){
    this._RegisterService.user.next(record);
    this._Router.navigate(['content/admin/InsertUser']);
  }
}
