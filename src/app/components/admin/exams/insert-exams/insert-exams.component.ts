import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from './../../../../shared/Models/interfaces/Question';
import Swal from 'sweetalert2';
import { ExamsService } from './../../../../shared/API-Service/services/exams.service';

@Component({
  selector: 'app-insert-exams',
  templateUrl: './insert-exams.component.html',
  styleUrls: ['./insert-exams.component.css']
})
export class InsertExamsComponent implements OnInit {
  ExamForm:FormGroup;
  button:boolean = false;
  coursecontentId:number;
  writeorwrong:boolean;
  question1:boolean = false;
  question2:boolean = false;
  question3:boolean = false;
  question4:boolean = false;
  question5:boolean = false;
  Exams:Question [] = [];
  constructor(private _ExamsService:ExamsService
             ,private _Router:Router
             ,private _FormBuilder:FormBuilder
             ,private _ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.coursecontentId = params['id'];
    })
  }

  initiate(id?:number){
    switch(id != null) {
    case id == 1 :
    this.ExamForm = this._FormBuilder.group({
      id:[this.Exams.length + 1],
      typeid: [ 1, Validators.required],
      qusetion: ['', Validators.required],
      fitanswer: ['', Validators.required],
    });
    break;
    case id == 2 :
      this.ExamForm = this._FormBuilder.group({
        id:[this.Exams.length + 1],
        typeid: [ 2, Validators.required],
        qusetion: ['', Validators.required],
        firstChoice: ['', Validators.required],
        secondChoice: ['', Validators.required],
        thirdChoice: ['', Validators.required],
        fourChoice: ['', Validators.required],
        correctChoice: ['', Validators.required],
        selectedChoice: ['']
      });
      break;
      case id == 3 :
        this.ExamForm = this._FormBuilder.group({
          id:[this.Exams.length + 1],
          typeid: [ 3, Validators.required],
          qusetion: ['', Validators.required],
          correctChoice: ['', Validators.required],
          selectedChoice: ['']
        });
        break;
      case id == 4 :
        this.ExamForm = this._FormBuilder.group({
          id:[this.Exams.length + 1],
          typeid: [ 4, Validators.required],
          Imagequsetion: ['', Validators.required],
          firstImageChoice: ['', Validators.required],
          secondImageChoice: ['', Validators.required],
          thirdImageChoice: ['', Validators.required],
          fourImageChoice: ['', Validators.required],
          correctImageChoice: ['', Validators.required],
          selectedImageChoice: ['']
        });
        break;
        default : 
        alert('no question');
        break;
  }
  }
  
  get fc(){
    return this.ExamForm.controls;
  }
  newquestion(id:number){
    switch(id != null) {
      case id==1 :
        this.initiate(1);
        this.question1 = true;
        break;
        case id==2 : 
        this.initiate(2);
        this.question2 = true;
        break;
        case id==3:
          this.initiate(3);
          this.question3 = true;
          break;
        case id==4:
          this.initiate(4);
          this.question4 = true;
          break;
          default : 
          alert('ververbre');
          break;
    }
  }
  
  onSubmit(){
    this.Exams.push(this.ExamForm.value);
    this.ExamForm.reset();
    this.button = true;
    this.question1 = false;
    this.question2 = false;
    this.question3 = false;
  }
 
  async Exam(){
    await Swal.fire({
      title: 'قم بأحتيار نوع السؤال المراد اضافته في الامتحان',
      input: 'select',
      inputOptions: {
        'essayQuestion':'اضافة سؤال مقالي', 
        'SelectQuestion': 'اضافة سؤال اختيار من متعدد',
        'TrueFalse': 'اضافة سؤال صح و خطأ',
        'ImageSelectQuestion': 'اضافة سؤال اختيار من صور متعددة',
      },
      inputPlaceholder: 'اختر نوع السؤال',
      showCancelButton: true,
      confirmButtonText: 'استمر',
      cancelButtonText:'الغاء',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          switch(value){
          case 'essayQuestion':
            this.newquestion(1);
            document.getElementsByClassName('swal2-container')[0].remove();
            break;
          case 'SelectQuestion':
            this.newquestion(2);
            document.getElementsByClassName('swal2-container')[0].remove();
            break;
          case 'TrueFalse':
            this.newquestion(3);
            document.getElementsByClassName('swal2-container')[0].remove();
            break;
          case 'ImageSelectQuestion':
            this.newquestion(4);
            document.getElementsByClassName('swal2-container')[0].remove();
            break;
            default :
             alert('this is default');
             break;
          }
        })
      }
    })
  }
 
  
  




  // onSubmit(){
  //   this.button = true;
  //   if( this.ExamForm.status == "VALID" && this.update == false){
  //     this._ExamsService.CreateExam(this.ExamForm.value).subscribe((res) => {
  //       Swal.fire({
  //        icon: "success",
  //        title: "تم تسجيل الكورس بنجاح",
  //        showConfirmButton: false,
  //        timer: 1500,
  //      }); 
  //      this.ExamForm.reset();
  //      this._Router.navigate(['content/admin/ViewCourses']);
  //      },(err) => {
  //       this.button = false;
  //            Swal.fire({
  //              icon: 'error',
  //              title: 'خطأ',
  //              text: 'تأكد من ملئ جميع الخانات',
  //            });
  //            this.button = false;
  //      })
  //   }
  //   // else if(this.ExamForm.status == "VALID" && this.update == true){
  //   //   this._ExamsService.UpdateCourse(this.ExamForm.value).subscribe((res) => {
  //   //     Swal.fire({
  //   //      icon: "success",
  //   //      title: "تم تعديل الكورس بنجاح",
  //   //      showConfirmButton: false,
  //   //      timer: 1500,
  //   //    }); 
  //   //    this.ExamForm.reset();
  //   //    this._Router.navigate(['content/admin/ViewCourses']);
  //   //    },(err) => {
  //   //     this.button = false;
  //   //          Swal.fire({
  //   //            icon: 'error',
  //   //            title: 'خطأ',
  //   //            text: 'تأكد من ملئ جميع الخانات',
  //   //          });
  //   //          this.button = false;
  //   //    })
  //   // }
  //   else{
  //     this.button = false;
  //            Swal.fire({
  //              icon: 'error',
  //              title: 'خطأ',
  //              text: 'تأكد من ملئ جميع الخانات',
  //            });
  //            this.button = false;
  //   }
  // }
  examSubmit(){
    this._ExamsService.CreateExam({subjectContentId : this.coursecontentId, examBody: this.Exams }).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "تم تسجيل الامتحان بنجاح",
        showConfirmButton: false,
        timer: 1500,
      }); 
      this.button = false;
      this.Exams = [];
      this._Router.navigate(['/content/admin/ViewCourseLecture']);
    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });
    })
    }
  ngOnDestroy(){
    this._ExamsService.data.next(null);
     }

}
