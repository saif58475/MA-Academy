import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ParentsService } from './../../../../shared/API-Service/services/parents.service';
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
              ,private _Router:Router
              ,private _ParentsService:ParentsService) { }

  ngOnInit(): void {
    this._ParentsService.updateparent.subscribe((res) => {
      if( res != null){
        this.recordtoupdate = res;
        this.initiate(res);
        this.update = true;
      }else{
        this.initiate();
      }
    })
  }

  initiate(data?:any){
    this.ParentForm = this._FormBuilder.group({
      fatherName: [data?.fatherName || '', Validators.required],
      phone: [data?.phone || '', Validators.required],
      gender: [data?.gender || '', Validators.required],
      location: [data?.location || '', Validators.required],
      email: [data?.email || '', [Validators.required,Validators.email]],
      password: [data?.password || '', Validators.required]
    });
  }

  get fc(){
    return this.ParentForm.controls;
  }


  onSubmit(){
    this.button = true;
    if( this.ParentForm.status == "VALID" && this.update == false){
      this._ParentsService.CreateParents(this.ParentForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل ولي الامر بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.ParentForm.reset();
       this._Router.navigate(['content/admin/ViewParent']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.ParentForm.status == "VALID" && this.update == true){
      this._ParentsService.UpdateParents(this.ParentForm.value, this.recordtoupdate.fatherId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل ولي الامر بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.ParentForm.reset();
       this._Router.navigate(['content/admin/ViewParent']);
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
    this._ParentsService.updateparent.next(null);
  }
}
