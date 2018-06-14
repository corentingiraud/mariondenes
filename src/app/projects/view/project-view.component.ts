import { Component, OnInit } from '@angular/core';
import { Project } from '../../_models/Project';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  projectDoc: AngularFirestoreDocument<Project>;
  project$: Observable<Project>;

  constructor(afs: AngularFirestore, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.projectDoc = afs.doc<Project>('/projects/' + params['id']);
      this.project$ = this.projectDoc.valueChanges();
    });
  }

  ngOnInit() {
  }

}
