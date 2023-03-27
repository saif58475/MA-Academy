import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';

@Component({
  selector: 'app-view-activation',
  templateUrl: './view-activation.component.html',
  styleUrls: ['./view-activation.component.css']
})
export class ViewActivationComponent implements OnInit {
activations:any [];
  constructor(private _CourseContentService:CourseContentService
             ,private _Router:Router ) { }

  ngOnInit(): void {
    this.getactivation();
  }

  getactivation(){
    this._CourseContentService.viewactivation().subscribe((res) => {
      this.activations = res.data;
    })
  }

  update(data:object){

  }
  delete(id:number){

  }

}