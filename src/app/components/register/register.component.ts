import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  studentId: String;
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  program: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const student = {
      firstName: this.firstName,
      lastName: this.lastName,
      studentId: this.studentId,
      email: this.email,
      program: this.program,
      password: this.password
    }
    if (!this.validateService.validateRegister(student)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validateService.validateEmail(student.email)) {
      this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.authService.registerStudent(student).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login'])
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }

}
