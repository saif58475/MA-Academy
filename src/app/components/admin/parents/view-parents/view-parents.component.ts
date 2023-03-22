import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-parents',
  templateUrl: './view-parents.component.html',
  styleUrls: ['./view-parents.component.css']
})
export class ViewParentsComponent implements OnInit {
  parents:any [];
  filterstring:string;

  constructor() { }

  ngOnInit(): void {
  }

}
