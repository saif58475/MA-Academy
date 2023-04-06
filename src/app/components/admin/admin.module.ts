
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPrintElementModule } from 'ngx-print-element';
import { NgApexchartsModule } from 'ng-apexcharts';
import {NgxPaginationModule} from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service'
import { DxReportViewerModule } from 'devexpress-reporting-angular';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ViewTeachersComponent } from './teachers/view-teachers/view-teachers.component';
import { InsertTeachersComponent } from './teachers/insert-teachers/insert-teachers.component';
import { ViewStudentsComponent } from './students/view-students/view-students.component';
import { InsertStudentsComponent } from './students/insert-students/insert-students.component';
import { ViewCoursesComponent } from './courses/view-courses/view-courses.component';
import { InsertCoursesComponent } from './courses/insert-courses/insert-courses.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { UserComponent } from './User/user/user.component';
import { ChangePasswordComponent } from './User/change-password/change-password.component';
import { ViewCourseContentComponent } from './course-content/view-course-content/view-course-content.component';
import { InsertCourseContentComponent } from './course-content/insert-course-content/insert-course-content.component';
import { ViewSubcourseComponent } from './subcourse/view-subcourse/view-subcourse.component';
import { InsertSubcourseComponent } from './subcourse/insert-subcourse/insert-subcourse.component';
import { ViewEducationlevelComponent } from './education_level/view-educationlevel/view-educationlevel.component';
import { InsertEducationlevelComponent } from './education_level/insert-educationlevel/insert-educationlevel.component';
import { ViewUserComponent } from './User/view-user/view-user.component';
import { ViewSubcoursecontentComponent } from './subcourse-content/view-subcoursecontent/view-subcoursecontent.component';
import { InsertSubcoursecontentComponent } from './subcourse-content/insert-subcoursecontent/insert-subcoursecontent.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewOffersComponent } from './offers/view-offers/view-offers.component';
import { InsertOffersComponent } from './offers/insert-offers/insert-offers.component';
import { ViewParentsComponent } from './parents/view-parents/view-parents.component';
import { InsertParentsComponent } from './parents/insert-parents/insert-parents.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RearrangeSubcourseComponent } from './subcourse/rearrange-subcourse/rearrange-subcourse.component';
import { RearrangeSubcourseContentComponent } from './subcourse-content/rearrange-subcourse-content/rearrange-subcourse-content.component';
import { InsertActivationComponent } from './activation/insert-activation/insert-activation.component';
import { ViewActivationComponent } from './activation/view-activation/view-activation.component';
import { InsertPdfComponent } from './course-content/insert-pdf/insert-pdf.component';
import { ViewPdfComponent } from './course-content/view-pdf/view-pdf.component';
 @NgModule({
  declarations: [
    ViewProductComponent,
    ViewTeachersComponent,
    InsertTeachersComponent,
    ViewStudentsComponent,
    InsertStudentsComponent,
    ViewCoursesComponent,
    InsertCoursesComponent,
    UserComponent,
    ChangePasswordComponent,
    ViewCourseContentComponent,
    InsertCourseContentComponent,
    ViewSubcourseComponent,
    InsertSubcourseComponent,
    ViewEducationlevelComponent,
    InsertEducationlevelComponent,
    ViewUserComponent,
    ViewSubcoursecontentComponent,
    InsertSubcoursecontentComponent,
    ViewOffersComponent,
    InsertOffersComponent,
    ViewParentsComponent,
    InsertParentsComponent,
    RearrangeSubcourseComponent,
    RearrangeSubcourseContentComponent,
    InsertActivationComponent,
    ViewActivationComponent,
    InsertPdfComponent,
    ViewPdfComponent,
  ],
  imports: [
    DxReportViewerModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    NgxPaginationModule,
    RouterModule,
    NgApexchartsModule,
    NgxPrintElementModule,
    NgxQRCodeModule,
    DragDropModule,
    Ng2SearchPipeModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
   CookieService
  ],
  exports:[ ]
})
export class AdminModule { }
