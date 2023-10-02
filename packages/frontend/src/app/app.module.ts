import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadComponent } from './components/upload/upload.component';
import { CoreModule } from './core/core.module';
import { CredentialsPageComponent } from './pages/credentials-page/credentials-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UiService } from './services/ui/ui.service';
import { metaReducers, reducers } from './store';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CredentialsPageComponent,
    RegisterFormComponent,
    HomePageComponent,
    LayoutComponent,
    UploadListComponent,
    UploadComponent,
    UploadFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
  ],
  providers: [UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
