import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';

@Component({
  selector: 'app-rearrange-subcourse-content',
  templateUrl: './rearrange-subcourse-content.component.html',
  styleUrls: ['./rearrange-subcourse-content.component.css']
})
export class RearrangeSubcourseContentComponent implements OnInit {
records:any [];
  constructor(private _SubcoursecontentService:SubcoursecontentService) { }

  ngOnInit(): void {
    this.getfiltersubcoursecontent(26);
  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
    console.log(this.records);
  }

 getfiltersubcoursecontent(id:number){
this._SubcoursecontentService.filtersubjectcontent(id).subscribe((res) => {
  debugger
  this.records = res.data;
   })
}




}
