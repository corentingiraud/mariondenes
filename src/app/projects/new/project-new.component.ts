import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
      mainPictureURL: ['', Validators.required],
      tags: '',
    });
    const picCats = this.fb.array([]);
    this.projectForm.setControl('picCats', picCats);
    this.projectsCollection = afs.collection<Project>('projects');
  }

  ngOnInit() {
  }

  addProject(): void {
    const project = new Project({
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      mainPictureURL: this.projectForm.value.mainPictureURL,
      tags: this.projectForm.value.tags.split(','),
      pictureCategories: this.projectForm.value.picCats.map(val => {
          return {
            name: val.name,
            pictureURLs: val.picUrls.map(url => url.picUrl)
          };
        })
    });
    this.projectsCollection.add(JSON.parse(JSON.stringify(project)));
    this.router.navigate(['admin/projects']);
  }

  addPicCat(): void {
    const picCat = this.fb.group({
      name: ['', Validators.required],
    });
    const picUrls = this.fb.array([]);
    picCat.setControl('picUrls', picUrls);
    this.picCats.push(picCat);
  }

  addPicUrl(indexPicCat): void {
    this.getPicUrls(indexPicCat).push(this.fb.group({
      picUrl: ['', Validators.required],
    }));
  }

  removePicCat(indexPicCat): void {
    this.picCats.removeAt(indexPicCat);
  }

  removePicUrl(indexPicCat, indexPicUrl): void {
    this.getPicUrls(indexPicCat).removeAt(indexPicUrl);
  }

  // Form Geter

  get picCats (): FormArray {
    return this.projectForm.get('picCats') as FormArray;
  }

  getPicUrls(indexPicCat: number): FormArray {
    return this.picCats.controls[indexPicCat].get('picUrls') as FormArray;
  }
}
