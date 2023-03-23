import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { SubcourseService } from '../../../../shared/API-Service/services/subcourse.service';

@Component({
  selector: 'app-rearrange-subcourse',
  templateUrl: './rearrange-subcourse.component.html',
  styleUrls: ['./rearrange-subcourse.component.css']
})
export class RearrangeSubcourseComponent implements OnInit {
records:any [];
Toast = Swal.mixin({
  toast: true,
  position: 'top',
  background:'#fff',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  customClass:{
  }
})
  constructor(private _SubcourseService:SubcourseService) { }

  ngOnInit(): void {
this.Toast.fire({
  icon: 'warning',
  title: 'قم بسحب اي من عناصر الجدول للموقع المراد'
})
    this.getsubcourse(17);
  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
    console.log(this.records);
  }
  
  getsubcourse(id:number){
   this._SubcourseService.filterSubCourse(id).subscribe((res) => {
    this.records = res.data;
   })
  }
}
