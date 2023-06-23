import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuarioEdit } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  user: Usuario | undefined;
  id: string = '';
  formulario: FormGroup;
  passwordChanged: boolean = false;
  initialUser: Usuario | undefined;


  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.email]],
      name: ['', [Validators.minLength(3)]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['', [Validators.minLength(6)]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id')!;
    this.authService.getUsuario(this.id).subscribe(resp => {
      this.user = resp;
      this.initialUser = { ...resp };
    });
  }

  goBack() {
    window.history.back();
  }

  onSubmit() {

    if (this.formulario.valid) {
      const formData = this.formulario.value;


      const userEdit: UsuarioEdit = {

      };

      if (formData.name !== this.initialUser?.name) {
        userEdit.name = formData.name;
        localStorage.setItem('name', formData.name!)
      }

      if (formData.email !== this.initialUser?.email) {
        userEdit.email = formData.email;
      }

      if (formData.password !== '' && formData.password === formData.confirmPassword) {
        userEdit.password = formData.password;
      }
      console.log(userEdit);

      this.id = localStorage.getItem('id')!;
      this.authService.editarUsuario(this.id, userEdit).subscribe(resp => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Usuario editado correctamente',
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        });
        this.router.navigateByUrl('/protected/usuarios');
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
          heightAuto: false
        });
      });


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario inválido',
        heightAuto: false
      });
      console.log('Formulario inválido');
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onPasswordChange() {
    this.passwordChanged = true;
    this.formulario.get('confirmPassword')?.setValidators(Validators.required);
    this.formulario.get('confirmPassword')?.updateValueAndValidity();
  }

  onPasswordBlur() {
    if (!this.formulario.get('password')?.value) {
      this.passwordChanged = false;
      this.formulario.get('confirmPassword')?.clearValidators();
      this.formulario.get('confirmPassword')?.updateValueAndValidity();
    }
  }
}
