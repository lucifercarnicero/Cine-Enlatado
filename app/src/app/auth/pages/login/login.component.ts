import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(private fb:FormBuilder,
    private router:Router,
    private authService: AuthService) { }

  login(){

    console.log(this.miFormulario.value)

    const {email, password} = this.miFormulario.value

    this.authService.login(email, password)
      .subscribe(ok=> {
        console.log(ok)



        if(ok === true) {
          //ok debe ser true para navegar, si pongo sólo true al existir redirige aunque sea false
          this.router.navigateByUrl('/home')
        } else {
          //TODO: mostrar mensaje de error
          Swal.fire('Error', ok, 'error')
        }
      })




  }

}
