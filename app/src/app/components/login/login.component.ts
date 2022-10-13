import { PeticionesService } from 'src/app/services/peticiones.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public cualquiera: string = 'blue';
  constructor(private fb: FormBuilder, private http: PeticionesService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: '',
      password: ''
    })
  }
  login(){
    const req={
        data:{
          user:this.form.value.user,
          password: this.form.value.password
        }
    }
    this.http.login(req).subscribe(
      res=>{
        if(res.error){
         
          console.log(res.message)
          
  
        }else{
          localStorage.setItem('MGR', JSON.stringify(res.data ) );
          
          this.router.navigate(['MGRepuestos']);
        }
        
      }
    )
  }

}
