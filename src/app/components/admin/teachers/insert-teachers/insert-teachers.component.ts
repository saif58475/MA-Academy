import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { TeachersService } from './../../../../shared/API-Service/services/teachers.service';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';
import { EducationLevelService } from './../../../../shared/API-Service/services/education-level.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-insert-teachers',
  templateUrl: './insert-teachers.component.html',
  styleUrls: ['./insert-teachers.component.css']
})
export class InsertTeachersComponent implements OnInit {
update:boolean = false;
button:boolean = false;
educationlevels:any[];
subjects:any[];
selectedid:number [] = [];
recordtoupdate:any;
dropdownSettings = {
  singleSelection: false,
  idField: 'educationId',
  textField: 'nameAr',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
};
selectedItems:any [] = [];
data:any [];
  TeacherForm:FormGroup;
  imageLogo:string;
  Image:File;
  constructor(private _FormBuilder:FormBuilder
             ,private _TeachersService:TeachersService
             ,private _Router:Router
             ,private _EducationLevelService:EducationLevelService
             ,private _CoursesService:CoursesService) { }

  ngOnInit(): void {
    this.getdropdowns();
    this._TeachersService.Teacher.subscribe((res) => {
      if( res == null){
        this.initiate();
      }else{
        this.update = true;
        this.recordtoupdate = res;
        this.checkupdate(this.recordtoupdate);
      }
    })
  }

  getdropdowns(){
  this._EducationLevelService.GetEducationLevel().subscribe((res) => {
    this.educationlevels = res.data;
  })
  this._CoursesService.GetCourse().subscribe((res) => {
    this.subjects = res.data;
  })
  }
  initiate(){
    this.TeacherForm = this._FormBuilder.group({
      teacherName: ['', Validators.required],
      educationIds: ['', Validators.required],
      subjectId: ['', Validators.required]
    });
  }
  checkupdate(data:any){   
   this.selectedItems = data.educationIds;
  this.TeacherForm = this._FormBuilder.group({
      teacherName: [data.teacherName, Validators.required],
      educationIds: [this.selectedItems, Validators.required],
      subjectId: [data.subjectId, Validators.required]
    });
  }

  insertarray(data:any){
    data.forEach(element => 
      this.selectedid.push(element.educationId)
    );
    this.TeacherForm.value.educationIds = this.selectedid
  } 
  get fc() {
    return this.TeacherForm.controls;
  }

  onSubmit(){
    this.button = true;
    if( this.TeacherForm.status == "VALID" && this.update == false){
      this.insertarray(this.selectedItems);
      this._TeachersService.CreateTeacher(this.TeacherForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل المدرس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.TeacherForm.reset();
       this._Router.navigate(['content/admin/ViewTeachers']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.TeacherForm.status == "VALID" && this.update == true){
      this.insertarray(this.selectedItems);
      this._TeachersService.UpdateTeacher(this.TeacherForm.value, this.recordtoupdate.teacherId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.TeacherForm.reset();
       this._Router.navigate(['content/admin/ViewTeachers']);
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
  

  ngOnDestroy(){
    this._TeachersService.Teacher.next(null);
    this.selectedItems = [];
     }
}
