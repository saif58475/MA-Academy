import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Swal from 'sweetalert2';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
@Component({
  selector: 'app-insert-offers',
  templateUrl: './insert-offers.component.html',
  styleUrls: ['./insert-offers.component.css']
})
export class InsertOffersComponent implements OnInit {
OfferFrom:FormGroup;
update:boolean = false;
courses:any [];
QrCode:string;
dropdownSettings:any = {};
dropdownSettingscourse:any = {};
subcoursecontent:any [];
selectedsubcoursecontent:any [];
title:string = 'app';
elementType:string = NgxQrcodeElementTypes.URL;
correctionLevel  = NgxQrcodeErrorCorrectionLevels.HIGH;
  constructor(private _Router:Router 
             , private _FormBuilder:FormBuilder
             , private _CourseContentService :CourseContentService 
             , private _SubcoursecontentService:SubcoursecontentService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'beforSubjectContentId',
      textField: 'beforSubjectContentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    this.dropdownSettingscourse = {
      singleSelection: false,
      idField: 'subjectContentId',
      textField: 'subjectContentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
  this.getdropdowns();
  this.initiate();
  }

  getdropdowns(){
  this._CourseContentService.GetCourseContent().subscribe((res) => {
    this.courses = res.data;
  });
   this._SubcoursecontentService.GetSubjectContent().subscribe((res) => {
    this.subcoursecontent = res.data;
   })
  }
  initiate(){
    this.OfferFrom = this._FormBuilder.group({
      subjectId: [''],
      subsubjectcontentId: [''],
    });
  }

  onSubmit(){

  }
}
