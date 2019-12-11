import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AfterAuthLayoutComponent } from './layout/after-auth-layout/after-auth-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './shared/navbar/navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './guards/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LoaderInterceptor } from './guards/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AfterAuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar:true,
    }),
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthGuard,AuthInterceptor, CookieService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
