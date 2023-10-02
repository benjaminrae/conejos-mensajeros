import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../../services/token/token.service';
import { UiService } from '../../services/ui/ui.service';
import { UserService } from '../../services/user/user.service';
import { type UserCredentials } from '../../store/user-feature/types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly uiService: UiService,
    private readonly tokenService: TokenService,
  ) {}

  onSubmit() {
    this.uiService.showLoading();

    const data = this.userService.getToken(
      this.loginForm.value as UserCredentials,
    );

    data.subscribe(async data => {
      const { token } = data;
      const { id, email } = this.tokenService.decodeToken(token);
      this.userService.loginUser({
        id,
        token,
        email,
      });
      this.uiService.hideLoading();
      this.resetForm();
      this.uiService.showSuccessModal('You have logged in correctly');
      this.tokenService.storeToken(token);
      await this.uiService.navigate('');
    });
  }

  private resetForm() {
    this.loginForm.reset();
  }
}
