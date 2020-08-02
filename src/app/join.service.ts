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
  constructor(private http:HttpClient) { }

  mycourses(obj){
    return this.http.post('/user/mycourses',obj);
  }

  subscrib(obj){
    return this.http.post('/user/subscribe',obj);
  }

  dpUpdate(obj){
    return this.http.post('/user/dpUpdate',obj)
  }

  profileUpdate(data){
    return this.http.post('/user/profileUpdate',data);
  }

  profileRead(data:Ittop){
    return this.http.post('/user/profileRead',data);
  }

  joinuser(obj:Ittop)
  {
    return this.http.post('/user/join',obj);
  }

  login(obj:Ittop)
  {
    return this.http.post('/user/login',obj);
  }

  forgotpass(obj)
  {
    return this.http.post('/user/forgotpass',obj);
  }

  changePassword(obj)
  {
    console.log(obj);
    return this.http.post('/user/changePassword',obj);
  }

  updateAbout(obj)
  {
    console.log(obj);
    return this.http.post('/user/updateAbout',obj);
  }

  getBlog(obj){
    return this.http.post('/user/getBlogs',obj);
  }

  getBlogById(obj){
    return this.http.post('/user/getBlogById',obj);
  }
  
  postBlog(obj){
    return this.http.post('/user/postBlog',obj);
  }

  postClass(obj){
    return this.http.post('/user/postClass',obj);
  }

  getClass(obj){
    return this.http.post('/user/getClass',obj);
  }

  getClassbyId(obj)
  {
     return this.http.post('/user/getClassbyId',obj);
  }

  enrollClass(obj)
  {
    return this.http.post('/user/enrollClass',obj);
  }
}
