import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]
      }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8), Validators.pattern(`\\S*(([A-Z]\\S*[0-9])|([0-9]\\S*[A-Z]))\\S*`)]
      })
    });
  }

  onSignUp() {
    if (this.form.invalid) {
      return;
    }
    const signUpData = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
    localStorage.setItem("userData", JSON.stringify(signUpData));
    this.authService.setAuth();
  }
}
