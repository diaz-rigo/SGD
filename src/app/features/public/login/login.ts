import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService, LoginPayload } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'], 
  // providers: [AuthService],

})
export class Login {
  // private fb = inject(FormBuilder);
  // auth = inject(AuthService);             // público para usarlo en template
  // private router = inject(Router);

  // errorMsg = signal<string | null>(null);
  // isLoading = this.auth.isLoading;

  // form = this.fb.nonNullable.group({
  //   usuario_telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  //   usuario_contraseña: ['', [Validators.required, Validators.minLength(6)]],
  // });

  // // ✅ Alias sin eñes para usar en el HTML
  // telefonoCtrl = this.form.controls.usuario_telefono;
  // contrasenaCtrl = this.form.controls['usuario_contraseña'];

  constructor() {
    // effect(() => {
    //   if (this.auth.isLoggedIn()) {
    //             this.auth.redirectForCurrentUser();
    //   }
    // });
  }

  submit(): void {
    // this.errorMsg.set(null);
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }

    // const raw = this.form.getRawValue();
    // const payload: LoginPayload = {
    //   usuario_telefono: raw.usuario_telefono,
    //   ['usuario_contraseña']: raw.usuario_contraseña,
    // };

    // this.auth.login(payload).subscribe({
    //   next: (res) => {
    //     console.log("--------->", res)
    //     if (res.status === 'success') {
    //       this.auth.redirectAfterLogin(res);  // 👈 redirección por rol/redirectPath
    //     } else {
    //       this.errorMsg.set(res.msg || 'Error de autenticación');
    //     }
    //   },
    //   error: (err) => {
    //     const backendMsg = err?.error?.msg ?? err?.message ?? 'No se pudo iniciar sesión';
    //     this.errorMsg.set(backendMsg);
    //   },
    // });
  }
}
