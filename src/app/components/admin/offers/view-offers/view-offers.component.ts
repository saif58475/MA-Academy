import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as printJS from 'print-js';

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit {
Offers:any [];

  constructor(private _FormBuilder:FormBuilder
             ,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getoffers();
  }

 getoffers(){

 }
}
