import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatChipsModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
