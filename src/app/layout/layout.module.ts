import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SidenavComponent,
    ContainerComponent,
    FooterComponent,
  ],
  exports: [
    SidenavComponent,
    ContainerComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
