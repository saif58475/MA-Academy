import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service'
@Component({
  selector: 'app-view-course-content',
  templateUrl: './view-course-content.component.html',
  styleUrls: ['./view-course-content.component.css']
})
export class ViewCourseContentComponent implements OnInit {
  courselectures:any [];
  filterstring:string;
  title='pagination';
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor(private _CourseContentService:CourseContentService
             ,private _Router:Router
             ,private _ActivatedRoute:ActivatedRoute
             ,private _SubcoursecontentService:SubcoursecontentService) { }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
     if(params['id'] == null){
      this.getcoursecontent();
     }else{
      this._SubcoursecontentService.filtersubjectcontent(params['id']).subscribe((res) => {
      this.courselectures = res.data;
      })
     }
    });
  }

  getcoursecontent(){
  this._CourseContentService.GetCourseContent().subscribe((res) => {
    this.courselectures = res.data;
  })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getcoursecontent();
      }
delete(id : number){
  Swal.fire({
    title: 'هل تريد مسح المحتوى ؟',
    text: "لن يكون لك صلاحية إعادته مره اخرى",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'الغاء',
    confirmButtonText: 'امسح العنصر !'
  }).then((result) => {
    if (result.isConfirmed) {
      this._CourseContentService.DeleteCourseContent(id).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم المسح بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
     this.getcoursecontent();
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text:err.error.message    
        })
     this.getcoursecontent();
      },() => {
        console.log("completed");
      })
    }
  }) 
}
update(record:object){
  this._CourseContentService.coursecontent.next(record);
  this._Router.navigate(['content/admin/InsertCourseLecture']);
}
insertpdf(id:number){
  this._CourseContentService.insertpdfId.next(id);
  this._Router.navigate(['content/admin/ViewCoursesPdf']);
}
RemoveZoom(id:number){
  Swal.fire({
    title: 'هل تريد وقف الحلقة ؟',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'الغاء',
    confirmButtonText: 'اوقف البث !'
  }).then((result) => {
    if (result.isConfirmed) {
      this._CourseContentService.RemoveZoomURL(id).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم المسح بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getcoursecontent();
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text:err.error.message    
        })  
      })
    }
  })
}
}
