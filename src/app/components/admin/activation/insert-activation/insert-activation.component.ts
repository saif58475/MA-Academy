import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../../../../shared/API-Service/services/students.service';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-insert-activation',
  templateUrl: './insert-activation.component.html',
  styleUrls: ['./insert-activation.component.css']
})
export class InsertActivationComponent implements OnInit {
students:any [];
courses:any [];
ActivateForm:FormGroup;
update:boolean = false;
selectedItems:any [];
dropdownSettings = {
  singleSelection: false,
  idField: 'subjectContentId',
  textField: 'subjectContentName',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
};
  constructor(private _StudentsService:StudentsService
             ,private _CourseContentService:CourseContentService
             ,private _Router:Router
             ,private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getdropdowns();
    this.initiate();
  }

  initiate(){
    this.ActivateForm = this._FormBuilder.group({
      teacherId: ['', Validators.required],
      subjectId: ['', Validators.required],
    });
  }
  getdropdowns(){
    this._StudentsService.GetStudent().subscribe((res) => {
      this.students = res.data;
    });
    this._CourseContentService.GetCourseContent().subscribe((res) => {
      this.courses = res.data;
    });
  }

  onSubmit(){

  }
}
