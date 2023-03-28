import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../../../../shared/API-Service/services/students.service';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
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
selectedbeforecourse:object [] = [];
selectid:number [] = [];
beforesubjectselectid:number [] = [];
subjectid:any [] = [];
subcoursecontent:any [];
dropdownSettings = {
  singleSelection: false,
  idField: 'subjectContentId',
  textField: 'subjectContentName',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
};
dropdownSettingssubcourse = {
  singleSelection: false,
  idField: 'beforSubjectContentId',
  textField: 'beforSubjectContentName',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
};
  constructor(private _StudentsService:StudentsService
             ,private _CourseContentService:CourseContentService
             ,private _SubcoursecontentService:SubcoursecontentService
             ,private _Router:Router
             ,private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getdropdowns();
    this.initiate();
  }

  initiate(){
    this.ActivateForm = this._FormBuilder.group({
      studentId: ['', Validators.required],
     SubjectContentIds: ['', Validators.required],
      beforSubjectContentIds: ['', Validators.required],
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
    this._SubcoursecontentService.GetSubjectContent().subscribe((res) => {
      this.subcoursecontent = res.data;
    })
  }
insertarray(coursecontent:any ,beforecoursecontent:any){
  coursecontent.forEach(element => 
    this.selectid.push(element.subjectContentId)
  );
  this.ActivateForm.value.SubjectContentIds = this.selectid;
// ===============================================
beforecoursecontent.forEach(element => {
  this.beforesubjectselectid.push(element.beforSubjectContentId);
});
this.ActivateForm.value.beforSubjectContentIds = this.beforesubjectselectid;
}

  onSubmit(){
    this.button = true;
    if( this.ActivateForm.status == "VALID" && this.update == false){
      this.insertarray(this.selectedItems , this.selectedbeforecourse);
      this._CourseContentService.insertactivation(this.ActivateForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تفعيل الطالب على الحصص",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.ActivateForm.reset();
       this._Router.navigate(['content/admin/ViewActivation']);
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
         title: "تم تعديل تفعيل الطالب على الحصص",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.ActivateForm.reset();
       this._Router.navigate(['content/admin/ViewActivation']);
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
