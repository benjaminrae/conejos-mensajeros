import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UiService } from '../../services/ui/ui.service';
import { UserService } from '../../services/user/user.service';
import { UserCredentials } from '../../store/user-feature/types';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [UserService, UiService],
})
export class RegisterFormComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly uiService: UiService,
  ) {}

  onSubmit() {
    this.uiService.showLoading();

    const data = this.userService.registerUser(
      this.registerForm.value as UserCredentials,
    );

    data.subscribe(async () => {
      this.uiService.hideLoading();
      this.uiService.showSuccessModal('You have successfully registered');
      this.resetForm();
      await this.uiService.navigate('/login');
    });
  }

  private resetForm() {
    this.registerForm.reset();
  }
}
