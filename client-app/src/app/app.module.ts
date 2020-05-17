import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import '../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js';
import {ChartsModule} from 'ng2-charts';
import {
  MatButtonModule,
  MatSnackBarModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatExpansionModule,
  MatStepperModule,
  MatTableModule,
  MatTreeModule,
  MatSidenavModule,
  MatDividerModule,
  MatTabsModule,
  MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatCheckboxModule, MatChipsModule, MatSelectModule, MatRadioModule} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserHeaderComponent } from './user-header/user-header.component';
import { HeaderComponent } from './logged-out-home/header/header.component';
import { HeroComponent } from './logged-out-home/hero/hero.component';
import { ClientsComponent } from './logged-out-home/clients/clients.component';
import { FaqComponent } from './logged-out-home/faq/faq.component';
import { FooterComponent } from './logged-out-home/footer/footer.component';
import { HomeComponent } from './logged-out-home/home/home.component';
import {Routes, RouterModule} from '@angular/router';
import { SignUpFormComponent } from './logged-out-home/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './logged-out-home/sign-in-form/sign-in-form.component';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { FacultyHomeComponent } from './faculty/faculty-home/faculty-home.component';
import {AuthGuard} from '../Services/Auth-Guard';
// tslint:disable-next-line:max-line-length
import { StudentDashboardCourseCardListComponent } from './student/student-dashboard-course-card-list/student-dashboard-course-card-list.component';
import { NewCourseEnrollmentPannelComponent } from './student/new-course-enrollment-pannel/new-course-enrollment-pannel.component';
import { NewCourseCreatePannelComponent } from './faculty/new-course-create-pannel/new-course-create-pannel.component';
// tslint:disable-next-line:max-line-length
import { FacultyDashboardCourseCardListComponent } from './faculty/faculty-dashboard-course-card-list/faculty-dashboard-course-card-list.component';
import { StudentCoursePageHeaderBigComponent } from './student/student-course-page-header-big/student-course-page.component-header-big';
import { StudentClassmatesComponent } from './student/student-classmates/student-classmates.component';
import { StudentAnnouncementsComponent } from './student/student-announcements/student-announcements.component';
import { GithubSecretComponent } from './secret/github-secret/github-secret.component';
import { DoubtQuestionPageComponent } from './student/doubt-question-page/doubt-question-page.component';
import { CourseAboutPageComponent } from './student/course-about-page/course-about-page.component';
import { AskQuestionComponent } from './student/doubt-question-page/ask-question/ask-question.component';
// tslint:disable-next-line:max-line-length
import { StudentCoursePageHeaderSmallComponent } from './student/student-course-page-header-small/student-course-page-header-small.component';
import {MatFileUploadModule} from 'mat-file-upload';
import { DisplayQuestionComponent } from './student/doubt-question-page/display-question/display-question.component';
import { LectureFeedbackComponent } from './student/lecture-feedback/lecture-feedback.component';
import { AssignmentsComponent } from './student/assignments/assignments.component';
import {CountdownModule} from 'ngx-countdown';
import {FacultyCoursePageHeaderComponent} from './faculty/course-page-header/student-course-page-header-small.component';
import { FacultyAccouncementDisplayComponent } from './faculty/faculty-accouncement-display/faculty-accouncement-display.component';
import {FacultyAssignmentsComponent} from './faculty/FacultyAssignments/faculty-assignments.component';
import { FacultyLectureFeedbackComponent } from './faculty/facculty-lec-feedback/faculty-lecture-feedback.component';
import {DecimalPipe} from '@angular/common';
import { FacultyDoubtQnaComponent } from './faculty/faculty-doubt-qna/faculty-doubt-qna.component';
// import {fileUp}
// import { StarRatingModule } from 'angular-star-rating';



const AppRouts: Routes = [
  {path: '', component: HomeComponent},
  {path: 'secretGit', component: GithubSecretComponent},
  {path: 'signup', component: SignUpFormComponent},
  {path: 'signin', component: SignInFormComponent},
  {path: 'faculty/dashboard', component: FacultyHomeComponent, canActivate : [AuthGuard], data: {roles: ['faculty']}},
  {path: 'student/dashboard', component: StudentHomeComponent, canActivate : [AuthGuard], data: {roles: ['student']}},
  // tslint:disable-next-line:max-line-length
  {path: 'student/course', component: StudentCoursePageHeaderSmallComponent,  canActivate : [AuthGuard], data: {roles: ['student']},
    // /classmates/:key/:color
    children: [
      {path: 'Announcements/:key/:color', component: StudentAnnouncementsComponent,  canActivate : [AuthGuard], data: {roles: ['student']}},
      {path: 'DoubtQNA/:key/:color', component: DoubtQuestionPageComponent,  canActivate : [AuthGuard], data: {roles: ['student']}},
      {path: 'classmates/:key/:color', component: StudentClassmatesComponent,  canActivate : [AuthGuard], data: {roles: ['student']}},
      {path: 'feedBack/:key/:color', component: LectureFeedbackComponent,  canActivate : [AuthGuard], data: {roles: ['student']}},
      {path: 'assignment/:key/:color', component: AssignmentsComponent,  canActivate : [AuthGuard], data: {roles: ['student']}},
    ]
  },
  {path: 'faculty/course', component: FacultyCoursePageHeaderComponent,  canActivate : [AuthGuard], data: {roles: ['faculty']},
    // /classmates/:key/:color
    children: [
      // tslint:disable-next-line:max-line-length
      {path: 'Announcements/:key/:color', component: FacultyAccouncementDisplayComponent,  canActivate : [AuthGuard], data: {roles: ['faculty']}},
      {path: 'DoubtQNA/:key/:color', component: FacultyDoubtQnaComponent,  canActivate : [AuthGuard], data: {roles: ['faculty']}},
      {path: 'classmates/:key/:color', component: StudentClassmatesComponent,  canActivate : [AuthGuard], data: {roles: ['faculty']}},
      {path: 'feedBack/:key/:color', component: FacultyLectureFeedbackComponent,  canActivate : [AuthGuard], data: {roles: ['faculty']}},
      {path: 'assignment/:key/:color', component: FacultyAssignmentsComponent,  canActivate : [AuthGuard], data: {roles: ['faculty']}},
    ]
  }
  // tslint:disable-next-line:max-line-length
  // // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  // // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length


];

@NgModule({
  declarations: [
    AppComponent,
    UserHeaderComponent,
    HeaderComponent,
    HeroComponent,
    ClientsComponent,
    FaqComponent,
    FooterComponent,
    HomeComponent,
    SignUpFormComponent,
    SignInFormComponent,
    StudentHomeComponent,
    FacultyHomeComponent,
    FacultyCoursePageHeaderComponent,
    StudentDashboardCourseCardListComponent,
    NewCourseEnrollmentPannelComponent,
    NewCourseCreatePannelComponent,
    FacultyDashboardCourseCardListComponent,
    StudentCoursePageHeaderBigComponent,
    StudentClassmatesComponent,
    StudentAnnouncementsComponent,
    // DoubtQnaComponent,
    GithubSecretComponent,
    DoubtQuestionPageComponent,
    CourseAboutPageComponent,
    AskQuestionComponent,
    StudentCoursePageHeaderSmallComponent,
    DisplayQuestionComponent,
    LectureFeedbackComponent,
    AssignmentsComponent,
    FacultyAccouncementDisplayComponent,
    FacultyAssignmentsComponent,
    FacultyLectureFeedbackComponent,
    FacultyDoubtQnaComponent,
  ],
  imports: [
    ChartsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRouts),
    // StarRatingModule.forRoot(),
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatStepperModule,
    MatTableModule,
    MatTreeModule,
    MatSidenavModule,
    MatFileUploadModule,
    MatDividerModule,
    MatTabsModule,
    CountdownModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [StudentDashboardCourseCardListComponent,
    MatDatepickerModule,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
