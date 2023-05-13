import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario = this.fb.group({

    name: ['',[Validators.required, Validators.minLength(3)]],
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],

  })

  constructor(private fb:FormBuilder,
    private router:Router,
    private authService: AuthService) { }


  registro(){

      console.log(this.miFormulario.value)


      const name = this.miFormulario.value.name ?? '';
      const email = this.miFormulario.value.email ?? '';
      const password = this.miFormulario.value.password ?? '';

      this.authService.registro(name,email,password)
        .subscribe(ok=> {
          console.log(ok)



          if(ok === true) {
            //ok debe ser true para navegar, si pongo sólo true al existir redirige aunque sea false
            this.router.navigateByUrl('/dashboard/dashboard')
          } else {
            //TODO: mostrar mensaje de error
            Swal.fire('Error', ok, 'error')
          }
        })




    }

}
