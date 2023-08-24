import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeacherRequestService } from './../../../../shared/API-Service/services/teacher-request.service';
@Component({
  selector: 'app-view-teacher-request',
  templateUrl: './view-teacher-request.component.html',
  styleUrls: ['./view-teacher-request.component.css']
})
export class ViewTeacherRequestComponent implements OnInit {
teacherRequests:any [];
title='pagination';
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor(private _TeacherRequestService:TeacherRequestService ) { }

  ngOnInit(): void {
    this.getteachersRequests();
  }

  getteachersRequests(){
    this._TeacherRequestService.GetPdfRequests().subscribe((res) => {
     this.teacherRequests = res;
    
    });
 }
 onTableDataChange(event:any){
  this.page = event;
  this.getteachersRequests();
    }

    approveRequest(id : number){
      Swal.fire({
        title: 'هل تريد الموافقة على الطلب ؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'الغاء',
        confirmButtonText: 'موافقة'
      }).then((result) => {
        if (result.isConfirmed) {
          this._TeacherRequestService.approveRequest(id).subscribe((res) => {
            Swal.fire({
              icon: "success",
              title: "تم الموافقة بنجاح",
              showConfirmButton: false,
              timer: 1500,
            });
         this.getteachersRequests();
          },(err) => {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text:err.error.message    
            })
            this.getteachersRequests();
          },() => {
            console.log("completed");
          })
        }
      })
    }

    denyRequest(id : number){
      Swal.fire({
        title: 'هل تريد الرفض على الطلب ؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'الغاء',
        confirmButtonText: 'ارفض'
      }).then((result) => {
        if (result.isConfirmed) {
          this._TeacherRequestService.denyRequest(id).subscribe((res) => {
            Swal.fire({
              icon: "success",
              title: "تم الرفض بنجاح",
              showConfirmButton: false,
              timer: 1500,
            });
         this.getteachersRequests();
          },(err) => {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text:err.error.message    
            })
            this.getteachersRequests();
          },() => {
            console.log("completed");
          })
        }
      })
    }
}
