import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgwWowModule } from 'ngx-wow';
import { NgxGalleryModule } from 'ngx-gallery';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectsExplorerComponent } from './projects/explorer/projects-explorer.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectViewComponent } from './projects/view/project-view.component';
import { WindowScrolling } from './_services/windows.service';
import { ProjectNewComponent } from './projects/new/project-new.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProjectEditComponent } from './projects/edit/project-edit.component';
import { ProjectManagerComponent } from './projects/manager/project-manager.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    AboutMeComponent,
    ProjectsExplorerComponent,
    ContactComponent,
    NotFoundComponent,
    ProjectViewComponent,
    ProjectNewComponent,
    SpinnerComponent,
    ProjectEditComponent,
    ProjectManagerComponent,
    LoginComponent,
    AdminDashboardComponent,
    ContactsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgwWowModule.forRoot(),
    NgxGalleryModule,
  ],
  providers: [
    AuthService,
    WindowScrolling,
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
