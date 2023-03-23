import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
@Component({
  selector: 'app-view-subcoursecontent',
  templateUrl: './view-subcoursecontent.component.html',
  styleUrls: ['./view-subcoursecontent.component.css']
})
export class ViewSubcoursecontentComponent implements OnInit {
  subsubjects:any [];
  constructor(private _SubcoursecontentService:SubcoursecontentService
             ,private _Router:Router
             ,private _CourseContentService:CourseContentService) { }

  ngOnInit(): void {
    this.getsubcontent();
  }


  getsubcontent(){
    this._SubcoursecontentService.GetSubjectContent().subscribe((res) => {
      this.subsubjects = res.data;
    })
  }

  rearrangesubsubjectcontent(id : number){
    this._SubcoursecontentService.RearrangeSubjectContent.next(id);
    this._Router.navigate(['content/admin/Rearangesubcoursecontent']); 
  }

  addcontent(data:any){
    this._CourseContentService.insertnewcoursecontent.next(data);
    this._Router.navigate(['content/admin/InsertCourseLecture']);
  }
  delete(id : number){
    Swal.fire({
      title: 'هل تريد مسح الكورس ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._SubcoursecontentService.DeleteSubjectContent(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getsubcontent();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getsubcontent();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
  update(record:object){
    this._SubcoursecontentService.SubjectContent.next(record);
    this._Router.navigate(['content/admin/InsertSubCourseContent']);
  }
}
