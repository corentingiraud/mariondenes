import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Project } from '../../_models/Project';
import { Router } from '@angular/router';
import { EDITOR_BUTTONS } from '../../_helpers/editor.config';

@Component({
  selector: 'app-project-new-edit',
  templateUrl: './project-new-edit.component.html',
  styleUrls: ['./project-new-edit.component.scss']
})
export class ProjectNewEditComponent implements OnInit {

  @Input() projectInput: Project;
  update = false;

  projectForm: FormGroup;
  projectsCollection: AngularFirestoreCollection<Project>;

  editorButtons: Array<string> = EDITOR_BUTTONS;

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
    if (this.projectInput) {
      this.projectForm.get('name').setValue(this.projectInput.name);
      this.projectForm.get('description').setValue(this.projectInput.description);
      this.projectForm.get('mainPictureURL').setValue(this.projectInput.mainPictureURL);
      this.projectForm.get('tags').setValue(this.projectInput.tags.join(','));
      this.projectInput.pictureCategories.forEach(pictureCategory => {
        this.addPicCat(pictureCategory.name);
        pictureCategory.pictureURLs.forEach(pictureURL => {
          this.addPicUrl(this.projectInput.pictureCategories.indexOf(pictureCategory), pictureURL);
        });
      });
    }
  }

  addOrUpdateProject(): void {
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
    if (this.projectInput) {
      this.afs.doc('/projects/' + this.projectInput.id).update(JSON.parse(JSON.stringify(project)));
    } else {
      this.projectsCollection.add(JSON.parse(JSON.stringify(project)));
    }
    this.router.navigate(['admin/projects']);
  }

  addPicCat(name?: string): void {
    const picCat = this.fb.group({
      name: [name || '', Validators.required],
    });
    const picUrls = this.fb.array([]);
    picCat.setControl('picUrls', picUrls);
    this.picCats.push(picCat);
  }

  addPicUrl(indexPicCat: number, url?: string): void {
    this.getPicUrls(indexPicCat).push(this.fb.group({
      picUrl: [url || '', Validators.required],
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
