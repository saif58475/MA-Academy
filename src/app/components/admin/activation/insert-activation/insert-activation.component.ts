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
button:boolean = false;
recordtoupdate:any;
selectedItems:object [] = [];
selectid:number [] = [];
subjectid:any [] = [];
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
      studentId: ['', Validators.required],
      subjectId: ['', Validators.required],
    });
  }
  get fc(){
    return this.ActivateForm.controls;
  } 
  getdropdowns(){
    this._StudentsService.GetStudent().subscribe((res) => {
      this.students = res.data;
    });
    this._CourseContentService.GetCourseContent().subscribe((res) => {
      this.courses = res.data;
    });
  }
insertarray(data:any){
  data.forEach(element => 
    this.selectid.push(element.subjectContentId)
  );
  this.ActivateForm.value.subjectId = this.selectid
}

  onSubmit(){
    this.button = true;
    if( this.ActivateForm.status == "VALID" && this.update == false){
      this.insertarray(this.selectedItems);
      this._CourseContentService.insertactivation(this.ActivateForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل محتوى المادة بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.ActivateForm.reset();
       this._Router.navigate(['content/admin/ViewCourseLecture']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.ActivateForm.status == "VALID" && this.update == true){
      this._CourseContentService.UpdateCourseContent(this.ActivateForm.value, this.recordtoupdate.subjectContentId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.ActivateForm.reset();
       this._Router.navigate(['content/admin/ViewCourseLecture']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }
    else{
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
    }
   
  }
}
