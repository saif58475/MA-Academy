import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Swal from 'sweetalert2';
import { SubcourseService } from './../../../../shared/API-Service/services/subcourse.service';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
import { TeachersService } from './../../../../shared/API-Service/services/teachers.service';


@Component({
  selector: 'app-insert-offers',
  templateUrl: './insert-offers.component.html',
  styleUrls: ['./insert-offers.component.css']
})
export class InsertOffersComponent implements OnInit {
  @ViewChildren('myDivs', { read: ElementRef }) myDivs: QueryList<ElementRef>;
OfferFrom:FormGroup;
update:boolean = false;
courses:any [];
QrCode:string [] = [];
teachers:any;
NumberOfStudents:number;
dropdownSettings:any = {};
dropdownSettingscourse:any = {};
subcoursecontent:any [];
subcourse:any [];
myDivTags:any [];
selectedsubcoursecontent:any [];
selectedsubcourse:any [];
title:string = 'app';
elementType:string = NgxQrcodeElementTypes.URL;
correctionLevel  = NgxQrcodeErrorCorrectionLevels.HIGH;
qrbutton:boolean = true;
printqrbutton:boolean = true;
oneoffour:any []= [{name:'teacher', state:true} , {name:'subcoursecontent',state:true}, {name:'subcourse',state:true}];
  constructor( private _Router:Router 
             , private _FormBuilder:FormBuilder
             , private _SubcourseService:SubcourseService 
             , private _SubcoursecontentService:SubcoursecontentService
             , private _TeachersService:TeachersService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'beforSubjectContentId',
      textField: 'beforSubjectContentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    this.dropdownSettingscourse = {
      singleSelection: false,
      idField: 'subSubjectId',
      textField: 'subSubjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
  this.getdropdowns();
  this.initiate();
  }
  initiate(){
    this.OfferFrom = this._FormBuilder.group({
      teahcerId: [''],
      subsubjectId: [''],
      subsubjectcontentId: [''],
    });
  }
  getId(data : object){
  for(let i = 0 ; i <= this.oneoffour.length; i++){
   if( this.oneoffour[i] == data){
   
   }else{
    this.oneoffour[i].state = false;
   } 
  }
  }
  getQRCodes(){
    this.QrCode = [];
    for(var i = 0 ; i < this.NumberOfStudents; i++){
     this.QrCode.push(Math.random().toString(36).substring(2, 15));
    }
    this.printqrbutton = false;
    console.log(this.myDivs);
  }
  
  removeAndAdd(arr1, arr2) {
    arr2 = [];
    // Remove first 2 elements from arr1
    arr1.splice(0, 4);
    // Add only 4 numbers to arr2
    for (let i = 0; i < arr2.length; i++) {
      arr2.push(arr1[i]);
    }
  }
  printQRCode(): void {
  //  let lines = Math.ceil(this.NumberOfStudents / 4);
let printWindow = window.open(` `, '_blank','width=800,height=600,top=50,left=50,toolbar=no,location=no,resizable=yes');
printWindow.document.write('<html><head><title>' + 'MA-Academy'  + '</title>');
printWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">');
printWindow.document.write('</head><body>');
printWindow.document.write('<h1>' + 'كل ماسح  ضوئي صالح للاستخدام مره واحدة فقط'  + '</h1>');
printWindow.document.write('<div class="row">');
printWindow.document.write(document.getElementById('printDiv').innerHTML);
printWindow.document.write('</div>');
// printWindow.document.write('<table class="table">');
// printWindow.document.write('<thead><tr><th></th><th></th><th></th><th></th></tr></thead>');
// printWindow.document.write('<tbody>');
// for( let i = 1; i <= lines; i++){

//     printWindow.document.write('<tr>');
//     this.removeAndAdd(this.myDivs, this.myDivTags);
//     for(let j = 1; j <= this.myDivTags.length ; j++){
//     printWindow.document.write(`
//     <td style="padding:3%">
//     ${this.myDivTags[i]}
//     </td>
//     `);
//     this.NumberOfStudents -= 1;
//   }
//     printWindow.document.write('</tr>');
// }
// printWindow.document.write('</tbody>');
// printWindow.document.write('</table>');
printWindow.document.write('</body>');
printWindow.document.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>');
printWindow.document.write('</html>');
    printWindow.print();  
    printWindow.close();
  }
  
  checknumberofstudents(){
    if( this.NumberOfStudents != null){
   this.qrbutton = false;
    }else{
      this.qrbutton = true;
    }
  }
  getdropdowns(){
  // this._CourseContentService.GetCourseContent().subscribe((res) => {
  //   this.courses = res.data;
  // });
  this._SubcourseService.GetSubCourse().subscribe((res) => {
    this.subcourse = res.data;
  })
   this._SubcoursecontentService.GetSubjectContent().subscribe((res) => {
    this.subcoursecontent = res.data;
   })
   this._TeachersService.GetTeacher().subscribe((res) => {
    this.teachers = res.data;
   })
  }
  

  onSubmit(){

  }
}
function html2canvas(targetDiv: any) {
  throw new Error('Function not implemented.');
}

