import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Project } from '../../_models/Project';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  project: Project;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.afs.doc<Project>('/projects/' + params['id']).snapshotChanges().pipe(
        map(action => {
          const actionComplete = new Project({ id: action.payload.id, ...action.payload.data() });
          return actionComplete;
        })
      ).subscribe(project => {
        this.project = project as Project;
      });
    });
  }
}
