import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Project } from '../../_models/Project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-explorer.component.html',
  styleUrls: ['./projects-explorer.component.scss']
})
export class ProjectsExplorerComponent implements OnInit {

  projectsCollection: AngularFirestoreCollection<Project>;
  projects$: Observable<Project[]>;
  projects: Project[] = new Array<Project>();

  counter = 0;

  constructor(afs: AngularFirestore, media: ObservableMedia,
      private router: Router) {
    media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' && this.projects) {
        if (this.projects.length % 2 !== 0) {
          this.projects.push(new Project);
          this.counter++;
        }
        if (this.counter === 2) {
          this.projects = this.projects.slice(0, this.projects.length - 2);
          this.counter = this.counter - 2;
        }
      } else {
        if (this.projects.length % 3 !== 0) {
          for (let i = 0; i < this.projects.length % 3; i++) {
            this.projects.push(new Project);
            this.counter++;
          }
        }
      }
    });
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
    this.projects$.subscribe(projects => {
      this.projects = projects;
      if (media.isActive('xs')) {
        if (this.projects.length % 2 !== 0) {
          this.projects.push(new Project);
          this.counter++;
        }
      } else {
        if (this.projects.length % 3 !== 0) {
          for (let i = 0; i < this.projects.length % 3; i++) {
            this.projects.push(new Project);
            this.counter++;
          }
        }
      }
    });
  }

  ngOnInit() {
  }

  navigateToProject(project: Project): void {
    this.router.navigate(['/projects' , project.id]);
  }
}
