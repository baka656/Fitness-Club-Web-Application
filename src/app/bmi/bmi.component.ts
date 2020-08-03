import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss']
})
export class BmiComponent implements OnInit {

  bmiForm:FormGroup;
  submitted = false;
  bmi:number;
  isbmi:boolean;
  type:number;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.isbmi=false;
    this.bmiForm = this.fb.group({
      age: ['',Validators.required],
      height: ['',Validators.required],
      weight: ['',Validators.required],
      htype: ['cm',Validators.required],
      wtype: ['kg',Validators.required],
      gender: ['GENDER',Validators.required]
    });
  }

  get f() { 
    return this.bmiForm.controls; 
  }  

  onSubmit(){
    this.submitted = true;
      if (this.bmiForm.invalid) {
          return;
      }
      var hgt;
      var wt;
      if(this.bmiForm.value.htype=="in")
        hgt=this.bmiForm.value.height * 0.0254;
      else
        hgt=this.bmiForm.value.height * 0.01;
      if(this.bmiForm.value.wtype=="lb")
        wt=this.bmiForm.value.weight * 0.453592;
      else
        wt=this.bmiForm.value.weight;
      this.isbmi=true;
      hgt=hgt*hgt;
      this.bmi=wt/hgt;
      if(this.bmi<19.1)
        this.type=1;
      else if(this.bmi>=19.1 && this.bmi<=27.09)
              this.type=2;
      else if(this.bmi>=27.1 && this.bmi<=30.59)
              this.type=3;
      else 
        this.type=4;
    console.log(hgt,wt,this.bmi);
  }

}
