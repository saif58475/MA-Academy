import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivatedStudentsService } from './../../../../shared/API-Service/services/activated-students.service';

@Component({
  selector: 'app-view-students-activated',
  templateUrl: './view-students-activated.component.html',
  styleUrls: ['./view-students-activated.component.css']
})
export class ViewStudentsActivatedComponent implements OnInit {
ActivatedStudents:any = [];
NumberOfActivateStudents:number;
ToUnActivate:any []=[];
numberofstudents:number;
filterstring:string;
  constructor(private _ActivatedRoute:ActivatedRoute
            ,private _ActivatedStudentsService:ActivatedStudentsService) { }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this._ActivatedStudentsService.GetActivatedStudents(params['id']).subscribe((res) => {
        this.NumberOfActivateStudents = res.students_count;
        this.ActivatedStudents = res.data;
      })
    });
  }

  selectstudent(id:number){
    if(this.ToUnActivate.includes(id)){
     this.ToUnActivate = this.ToUnActivate.filter(number => number !== id);
    }else{
      this.ToUnActivate.push(id);
    }
   this.numberofstudents = this.ToUnActivate.length;
  }

  onSubmit(){
    
  }
}
