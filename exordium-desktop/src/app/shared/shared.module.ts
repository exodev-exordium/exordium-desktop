import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [
    CommonModule, 
    TranslateModule,

    NgSelectModule,
  
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule, 
    WebviewDirective, 
    FormsModule
  ]
})
export class SharedModule {}
