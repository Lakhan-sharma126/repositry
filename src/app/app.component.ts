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
  mapvariable:boolean=true;
  formtypesadd = [
    { TypeId: "1",  latitude:"28.6331",longitude:"77.2179", Title: "Chinese food – Block A" },
    { TypeId: "2",latitude:"28.6339",longitude:"77.2209", Title: "Sandwiches – Block D" },
    { TypeId: "3",latitude:"28.6328",longitude:"77.2170", Title: "Patties and burgers – Block G" },
    { TypeId: "4",latitude:"28.6299",longitude:"77.2242", Title: "Coffee, tea and cakes – barakhamba Road in front of metro station" },
    { TypeId: "5",latitude:"28.6448",longitude:"77.2167", Title: "India food – Rajma, subji, roti, chawal, - KG Marg in front of British council" },
    { TypeId: "6",latitude:"28.6300",longitude:"77.2198", Title: "Chaat – Block N" },
    { TypeId: "7",latitude:"28.6261",longitude:"77.2320", Title: "Chinese food – in front of Mandi house" },
    { TypeId: "8",latitude:"28.6336",longitude:"77.2229", Title: "Chaat – near Shankar Market" },
    { TypeId: "9",latitude:"28.6320",longitude:"77.2163", Title: "Patties and burgers – Block P" },
    { TypeId: "10", latitude:"28.6305",longitude:"77.2169",Title: "Chinese food – Near Regal Cinema" },
    // { id: "10", name: "Select System Pick Value Type" }
  ];
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          truck: ['', Validators.required],
          opentime: ['', Validators.required],
          closetime: ['', Validators.required],
          latitude:[''],
          longitude:[''],
          status:['']
      });
      this.searchForm = this.formBuilder.group({
        term: [''],
    });
    this.googlemapsForm = this.formBuilder.group({
      search: [''],
  });

  var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("demo").innerHTML = t;
}
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get f1() { return this.searchForm.controls; }
  get f2() { return this.googlemapsForm.controls; }
 arr=[];
  onSubmit() {
      this.submitted = true;

      if(this.registerForm.value.opentime>=this.registerForm.value.closetime)
      {
     
        this.registerForm.patchValue({
          closetime:''
        })
        this.toastr.warning('Closeing time is greeater than opening time');
         return;
      }
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      console.log("formvalue",this.registerForm.value);
      this.formtypesadd.forEach(element => {
        if(element.Title==this.registerForm.value.truck)
        {
          this.registerForm.patchValue({
             latitude:element.latitude,
             longitude:element.longitude
          })
         
        }
      });  
      var d = new Date();
      var c=d.getHours()+":"+d.getMinutes();
      if(c>=this.registerForm.value.opentime && c<this.registerForm.value.closetime)
      {
        this.registerForm.patchValue({
          status:'Open',
      
       })
      }
       else
       {
        this.registerForm.patchValue({
          status:'Closed',
       })
       }
      if(this.editindex==null)
      {
      this.arr.push({truck:this.registerForm.value.truck,opentime:this.registerForm.value.opentime,closetime:this.registerForm.value.closetime,latitude:this.registerForm.value.latitude,longitude:this.registerForm.value.longitude,status:this.registerForm.value.status});
      this.toastr.success('Successfuly');
      this.mapvariable=false;
      setTimeout(() => {
        this.mapvariable=true;
      },500);      
      }
      else
      {
        console.log("index",this.arr[this.editindex]);
       this.arr[this.editindex].truck=this.registerForm.value.truck;
       this.arr[this.editindex].opentime=this.registerForm.value.opentime;
       this.arr[this.editindex].closetime=this.registerForm.value.closetime;
       this.arr[this.editindex].latitude=this.registerForm.value.latitude;
       this.arr[this.editindex].longitude=this.registerForm.value.longitude;
       this.arr[this.editindex].status=this.registerForm.value.status;
       this.editindex=null;
       this.toastr.success('Updated');
       this.mapvariable=false;
       setTimeout(() => {
         this.mapvariable=true;
       },500); 
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
