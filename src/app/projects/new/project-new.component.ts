import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Project } from '../../_models/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {

  projectForm: FormGroup;
  projectsCollection: AngularFirestoreCollection<Project>;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private router: Router) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.projectsCollection = afs.collection<Project>('projects');
  }

  ngOnInit() {
  }

  addProject(): void {
    this.projectsCollection.add(this.projectForm.value);
    this.router.navigate(['admin/projects']);
  }
}
