import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  form!:FormGroup;
  records:User[]=[];
  searchbyemail:string='';
  recordfound:User | null = null;
  data: any;
  constructor(private service:UserService,private fb:FormBuilder){}
  ininit():void{
    this.form=this.fb.group({
      id:[null],
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      branch:['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      email:['',[Validators.required,Validators.email]],
    })
  }
  ngOnInit():void{
    this.getalldata();
    this.ininit();
  }
  getalldata():void{
    this.service.onget().subscribe(data => this.records=data)
  }
  postdata():void{
    const posting:User={...this.form.value,id:this.getting()}
    this.service.onpost(posting).subscribe(()=>{
      this.getalldata()
    })
  }
  getting():number{
    return this.records.length>0?Math.max(...this.records.map((record)=> record.id || 0))+1:1;
  }
  deleteuser(id:number | undefined):void{
    if(id!==undefined)
    this.service.ondelete(id).subscribe(()=>{
      this.getalldata();
    })
  }
  // updateuser():void{
  //   const id=this.form.value.id;
  //   const updaterecord:User={...this.form.value}
  //   this.service.onupdate(id,updaterecord).subscribe(()=>{
  //     this.getalldata();
  //   })
  // }
  getbyemail(email:string):void{
    this.service.getbyemail(email).subscribe((data)=>{
      if(data && data.length>0){
        this.recordfound=data[0];
        // this.updateuser(this.data);
      }
      else(this.data=null)
      console.log(`record is not found ${email}not found`)
    })
  }
}
