import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectsExplorerComponent } from './projects/explorer/projects-explorer.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectViewComponent } from './projects/view/project-view.component';
import { ProjectNewComponent } from './projects/new/project-new.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProjectManagerComponent } from './projects/manager/project-manager.component';
import { ProjectEditComponent } from './projects/edit/project-edit.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/about-me', pathMatch: 'full' },
  { path: 'about-me', component: AboutMeComponent},
  { path: 'projects', component: ProjectsExplorerComponent},
  { path: 'projects/:id', component: ProjectViewComponent},
  { path: 'contact', component: ContactComponent},

// Admin page

  { path: 'admin/login', component: LoginComponent},
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: 'admin/contacts', component: ContactsListComponent, canActivate: [AuthGuard]},
  { path: 'admin/projects', component: ProjectManagerComponent, canActivate: [AuthGuard]},
  { path: 'admin/projects/new', component: ProjectNewComponent },
  { path: 'admin/projects/:id', component: ProjectEditComponent, canActivate: [AuthGuard]},

// Other page

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
