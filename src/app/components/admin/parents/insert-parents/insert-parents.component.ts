import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Image } from './../../../../../images/images';

@Component({
  selector: 'app-insert-parents',
  templateUrl: './insert-parents.component.html',
  styleUrls: ['./insert-parents.component.css']
})
export class InsertParentsComponent implements OnInit {
ParentForm:FormGroup;
ParentFormData:FormData;
recordtoupdate:any;
update:boolean = false;
button:boolean = false;
Image:File;
imageLogo:string;
gender:String []= [ 'ذكر', 'انثى'];
  constructor(private _FormBuilder:FormBuilder
              ,private _Router:Router) { }

  ngOnInit(): void {
    this.initiate();
  }

  initiate(){
    this.ParentForm = this._FormBuilder.group({
      studentName: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      educationId: ['', Validators.required]
    });
  }

  get fc(){
    return this.ParentForm.controls;
  }


  onSubmit(){

  }
}
