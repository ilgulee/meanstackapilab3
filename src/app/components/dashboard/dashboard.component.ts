import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courses: Object;
  course = {
    courseName: '',
    courseCode: '',
    semester: '',
    section: ''
  };
  showCourseAddForm: boolean = false;
  showCourseAddButton:boolean=true;
  isEdit:boolean=false;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getCourses().subscribe(courses => {
      this.courses = courses;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  dropCourse(course){
    if(confirm('This will delete the coures. Are you sure?')){
      this.authService.removeCourse(course).subscribe(data=>{
        if(data.success){
          this.flashMessage.show('Course is deleted', { cssClass: 'alert-success', timeout: 3000 });
          //this.router.onSameUrlNavigation="reload";
          this.router.navigate(['/dashboard']);
          window.location.reload();
        }else{
          console.log('failed');
        }
      });
    }
  }

  onCancel(){
    this.showCourseAddButton=true;
    this.showCourseAddForm=false;
    this.isEdit=false;
    this.course= {
      courseName: '',
      courseCode: '',
      semester: '',
      section: ''
    };;
  }
  onUpdate(){
  this.authService.updateCourse(this.course).subscribe(data=>{
    console.log(data);
    if (data.success) {
      this.flashMessage.show('Course is updated', { cssClass: 'alert-success', timeout: 3000 });
      //this.router.onSameUrlNavigation="reload";
      this.router.navigate(['/dashboard']);
      window.location.reload();
    } else {
      this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/dashboard']);
    }
  });
  }

  editCourse(course){
    document.body.scrollTop=document.documentElement.scrollTop=0;
    this.course=course;
    this.showCourseAddButton=false;
    this.showCourseAddForm=true;
    this.isEdit=true;


  }
  onSubmit() {
    this.authService.registerCourse(this.course).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('New course is registered now', { cssClass: 'alert-success', timeout: 3000 });
        console.log(data);
        // (Array)(this.courses).push(data.course)
        //this.router.onSameUrlNavigation="reload";
        this.router.navigate(['/dashboard']);
        window.location.reload();
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
