import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nuageassignmanent';
  registerForm: FormGroup;
  searchForm:FormGroup;
  googlemapsForm:FormGroup;
  submitted = false;
  term:any;
  editindex=null;
  latitude=28.6263 ;
  longitude=77.2185;
  formtypesadd = [
    { TypeId: "1",  latitude:"28.7263",longitude:"78.2185", Title: "Chinese food – Block A" },
    { TypeId: "2",latitude:"27.7263",longitude:"72.2185", Title: "Sandwiches – Block D" },
    { TypeId: "3",latitude:"29.7263",longitude:"73.2185", Title: "Patties and burgers – Block G" },
    { TypeId: "4",latitude:"28.7263",longitude:"77.2185", Title: "Coffee, tea and cakes – barakhamba Road in front of metro station" },
    { TypeId: "5",latitude:"26.7263",longitude:"76.2185", Title: "India food – Rajma, subji, roti, chawal, - KG Marg in front of British council" },
    { TypeId: "6",latitude:"25.7263",longitude:"75.2185", Title: "Chaat – Block N" },
    { TypeId: "7",latitude:"29.9263",longitude:"79.2185", Title: "Chinese food – in front of Mandi house" },
    { TypeId: "8",latitude:"29.9263",longitude:"76.2185", Title: "Chaat – near Shankar Market" },
    { TypeId: "9",latitude:"29.9263",longitude:"77.2185", Title: "Patties and burgers – Block P" },
    { TypeId: "10", latitude:"28.4726",longitude:"79.2185",Title: "Chinese food – Near Regal Cinema" },
    // { id: "10", name: "Select System Pick Value Type" }
  ];
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          truck: ['', Validators.required],
          opentime: ['', Validators.required],
          closetime: ['', Validators.required],
      });
      this.searchForm = this.formBuilder.group({
        term: [''],
    });
    this.googlemapsForm = this.formBuilder.group({
      search: [''],
  });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get f1() { return this.searchForm.controls; }
  get f2() { return this.googlemapsForm.controls; }
 arr=[];
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      console.log("formvalue",this.registerForm.value);
      if(this.editindex==null)
      {
      this.arr.push({truck:this.registerForm.value.truck,opentime:this.registerForm.value.opentime,closetime:this.registerForm.value.closetime});
      this.toastr.success('Successfuly');
      }
      else
      {
        console.log("index",this.arr[this.editindex]);
       this.arr[this.editindex].truck=this.registerForm.value.truck;
       this.arr[this.editindex].opentime=this.registerForm.value.opentime;
       this.arr[this.editindex].closetime=this.registerForm.value.closetime;
       this.editindex=null;
       this.toastr.success('Updated');
      }
      this.registerForm.reset();
      this.submitted=false;

      console.log("array",this.arr);

    
  }
  onReset()
  {
    this.submitted = false;
    this.registerForm.reset();
  }
  delete(value)
  {
    this.arr.splice(value, 1); 
    this.toastr.error('Deleted');
    console.log("arra1",this.arr);
  }
  edit(value,i)
  {
    this.registerForm.patchValue({
      truck:value.truck,
      opentime:value.opentime,
      closetime:value.closetime
    });
    this.editindex=i;
    console.log("work",i);
  }
  mapselect(value)
  {
    this.latitude=value.latitude ;
    this.longitude=value.longitude;
  }
  
}
