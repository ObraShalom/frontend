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
    user: new FormControl(''),
    password: new FormControl(''),
  });

  route = inject(Router);
  constructor(private srvAuth: AuthService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
   let resp = this.srvAuth.login(this.frm.value);

   if (resp) {
    this.route.navigate(['/pages']);
   }
  }

}
