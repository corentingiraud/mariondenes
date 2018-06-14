import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Project } from '../../_models/Project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  projectsCollection: AngularFirestoreCollection<Project>;
  projects$: Observable<Project[]>;
  projects: Project[] = new Array<Project>();

  constructor(afs: AngularFirestore, private router: Router) {
    this.projectsCollection = afs.collection<Project>('projects');
    this.projects$ = this.projectsCollection.snapshotChanges().pipe(
      map(actions => {
        const actionsComplete = actions.map(a => {
            const data = a.payload.doc.data() as Project;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        return actionsComplete;
      })
    );
    this.projects$.subscribe(projects => this.projects = projects);
  }

  ngOnInit() {
  }

  edit(project: Project): void {
    this.router.navigate(['admin/projects', project.id]);
  }

  delete(project: Project): void {
    this.projectsCollection.doc('' + project.id).delete();
  }
}
