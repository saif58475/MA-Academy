import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit {
Offers:any [];

  constructor(private _FormBuilder:FormBuilder,
              ) { }

  ngOnInit(): void {
    this.getoffers();
  }

 getoffers(){

 }
}
