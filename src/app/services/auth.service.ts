import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  student: any;

  constructor(private http: Http) { }

  removeCourse(course){
    let id=course._id;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //headers.append('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:3000/api/courses/${id}`, { headers: headers }).map(res => res.json());
  }

  updateCourse(course){
    let id=course._id;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`http://localhost:3000/api/courses/${id}`, course, { headers: headers }).map(res => res.json());
  }
  registerCourse(course) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/courses', course, { headers: headers }).map(res => res.json());
  }

  registerStudent(student) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/students/register', student, { headers: headers }).map(res => res.json());
  }

  authenticateUser(student) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/students/authenticate', student, { headers: headers })
      .map(res => res.json());
  }

  storeStudentData(token, student) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('student', JSON.stringify(student));
    this.authToken = token;
    this.student = student;
  }

  getCourses() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/api/courses', { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/students/profile', { headers: headers })
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.student = null;
    localStorage.clear();
  }
}
