import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  frm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  
  errorMessage: string = '';

  router = inject(Router);
  constructor(private srvAuth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.srvAuth.authLogin(this.frm.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/pages']);
      }
    );
  }

}
