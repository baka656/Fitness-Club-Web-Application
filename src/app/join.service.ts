import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ittop } from '../ittop';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  isLoggedIn=false;
  LoggedInUser:string;
  data:any;
  data1:any;
  link:string="http://localhost:8080";
  //link:string="";
  constructor(private http:HttpClient) { }

  mycourses(obj){
    return this.http.post(this.link+'/user/mycourses',obj);
  }

  subscrib(obj){
    return this.http.post(this.link+'/user/subscribe',obj);
  }

  dpUpdate(obj){
    return this.http.post(this.link+'/user/dpUpdate',obj)
  }

  profileUpdate(data){
    return this.http.post(this.link+'/user/profileUpdate',data);
  }

  profileRead(data:Ittop){
    return this.http.post(this.link+'/user/profileRead',data);
  }

  joinuser(obj:Ittop)
  {
    return this.http.post(this.link+'/user/join',obj);
  }

  login(obj:Ittop)
  {
    return this.http.post(this.link+'/user/login',obj);
  }

  forgotpass(obj)
  {
    return this.http.post(this.link+'/user/forgotpass',obj);
  }

  changePassword(obj)
  {
    console.log(obj);
    return this.http.post(this.link+'/user/changePassword',obj);
  }

  updateAbout(obj)
  {
    console.log(obj);
    return this.http.post(this.link+'/user/updateAbout',obj);
  }

  getBlog(obj){
    return this.http.post(this.link+'/user/getBlogs',obj);
  }

  getBlogById(obj){
    return this.http.post(this.link+'/user/getBlogById',obj);
  }
  
  postBlog(obj){
    return this.http.post(this.link+'/user/postBlog',obj);
  }

  postClass(obj){
    return this.http.post(this.link+'/user/postClass',obj);
  }

  getClass(obj){
    return this.http.post(this.link+'/user/getClass',obj);
  }

  getClassbyId(obj)
  {
     return this.http.post(this.link+'/user/getClassbyId',obj);
  }

  enrollClass(obj)
  {
    return this.http.post(this.link+'/user/enrollClass',obj);
  }
  validEmail(obj)
  {
    return this.http.post(this.link+'/user/validEmail',obj);
  }
}
