import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [AuthSigninComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule]
})
export class AuthModule {}
