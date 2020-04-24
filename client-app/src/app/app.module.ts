import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatSnackBarModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatToolbarModule, MatExpansionModule, MatStepperModule, MatTableModule, MatTreeModule
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
import { DoubtQnaComponent } from './student/doubt-qna/doubt-qna.component';




const AppRouts: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignUpFormComponent},
  {path: 'signin', component: SignInFormComponent},
  {path: 'faculty/dashboard', component: FacultyHomeComponent, canActivate : [AuthGuard], data: {roles: ['faculty']}},
  {path: 'student/dashboard', component: StudentHomeComponent, canActivate : [AuthGuard], data: {roles: ['student']}},
  // tslint:disable-next-line:max-line-length
  {path: 'student/course/classmates/:key/:color', component: StudentClassmatesComponent,  canActivate : [AuthGuard], data: {roles: ['student']}},
  // tslint:disable-next-line:max-line-length
  {path: 'student/course/Announcements/:key/:color', component: StudentAnnouncementsComponent,  canActivate : [AuthGuard], data: {roles: ['student']}},


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
    StudentDashboardCourseCardListComponent,
    NewCourseEnrollmentPannelComponent,
    NewCourseCreatePannelComponent,
    FacultyDashboardCourseCardListComponent,
    StudentCoursePageHeaderBigComponent,
    StudentClassmatesComponent,
    StudentAnnouncementsComponent,
    DoubtQnaComponent,
  ],
  imports: [
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
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatStepperModule,
    MatTableModule,
    MatTreeModule,
  ],
  providers: [StudentDashboardCourseCardListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
