import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentsService } from '../../../../shared/API-Service/services/students.service';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { Image } from './../../../../../images/images';
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
students:any [];
img:string = Image;
filterstring:string;
  constructor(private _StudentsService:StudentsService, private _Router:Router
             ,private _CourseContentService:CourseContentService) { }

  ngOnInit(): void {
    this.getstudents();
  }

getstudents(){
  this._StudentsService.GetStudent().subscribe((res) => {
    this.students = res.data; 
  })
}

showimage(data){
  Swal.fire({
    imageUrl: `${this.img}${data}`,
    imageHeight: 300,
    imageAlt: 'A tall image'
  })
}
  delete(id : number){
    Swal.fire({
      title: 'هل تريد مسح الطالب ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._StudentsService.DeleteStudent(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getstudents();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getstudents();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
  update(record:object){
    this._StudentsService.Student.next(record);
    this._Router.navigate(['content/admin/InsertStudents']);
  }
  updateactivate(id : number){
    this._StudentsService.updatestudentcontent.next(id);
    this._Router.navigate(['content/admin/InsertActivation']);
  }
  addcontent(data : object){
   this._CourseContentService.studentemail.next(data);
   this._Router.navigate(['content/admin/InsertActivation']);
  }
}


