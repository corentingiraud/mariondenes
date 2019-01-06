import { Component, OnInit } from '@angular/core';
import { Project } from '../../_models/Project';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  projectDoc: AngularFirestoreDocument<Project>;
  project$: Observable<Project>;
  project: Project;

  constructor(afs: AngularFirestore,
    route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
    route.params.subscribe((params) => {
      this.projectDoc = afs.doc<Project>('/projects/' + params['id']);
      this.project$ = this.projectDoc.valueChanges();
      this.project$.subscribe(project => {
        this.project = project;
        this.project.id = params['id'];
      });
    });
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  edit(project: Project): void {
    this.router.navigate(['admin/projects', project.id]);
  }
}
