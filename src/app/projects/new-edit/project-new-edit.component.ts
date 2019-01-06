import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
      mainPictureURL: ['', Validators.required],
      tags: '',
    });
    const contentParts = this.fb.array([]);
    this.projectForm.setControl('contentParts', contentParts);
    this.projectsCollection = afs.collection<Project>('projects');
  }

  ngOnInit() {
    if (this.projectInput) {
      this.projectForm.get('name').setValue(this.projectInput.name);
      this.projectForm.get('mainPictureURL').setValue(this.projectInput.mainPictureURL);
      this.projectForm.get('tags').setValue(this.projectInput.tags.join(','));
      this.projectInput.contentParts.forEach(contentPart => {
        this.addContentPart(contentPart.title, contentPart.body, contentPart.picturesTitle);
        contentPart.pictureURLs.forEach(pictureURL => {
          this.addPicUrl(this.projectInput.contentParts.indexOf(contentPart), pictureURL);
        });
      });
    }
  }

  addOrUpdateProject(): void {
    const project = new Project({
      name: this.projectForm.value.name,
      mainPictureURL: this.projectForm.value.mainPictureURL,
      tags: this.projectForm.value.tags.split(',').forEach(_ => _.trim()),
      contentParts: this.projectForm.value.contentParts.map(val => {
        return {
          title: val.title,
          body: val.body,
          picturesTitle: val.picturesTitle,
          pictureURLs: val.picUrls.map(url => url.picUrl)
        };
      }),
    });
    if (this.projectInput) {
      this.afs.doc('/projects/' + this.projectInput.id).update(JSON.parse(JSON.stringify(project)));
    } else {
      this.projectsCollection.add(JSON.parse(JSON.stringify(project)));
    }
    this.router.navigate(['admin/projects']);
  }

  addContentPart(title?: string, body?: string, picturesTitle?: string): void {
    const contentPart = this.fb.group({
      title: [title || '', Validators.required],
      body: [body || '', Validators.required],
      picturesTitle: [picturesTitle || ''],
    });
    const picUrls = this.fb.array([]);
    contentPart.setControl('picUrls', picUrls);
    this.contentParts.push(contentPart);
  }

  addPicUrl(indexContentPart: number, url?: string): void {
    this.getPicUrls(indexContentPart).push(this.fb.group({
      picUrl: [url || '', Validators.required],
    }));
  }

  removeContentPart(indexContentPart): void {
    this.contentParts.removeAt(indexContentPart);
  }

  removePicUrl(indexContentPart, indexPicUrl): void {
    this.getPicUrls(indexContentPart).removeAt(indexPicUrl);
  }

  // Form Geter

  get contentParts (): FormArray {
    return this.projectForm.get('contentParts') as FormArray;
  }

  getPicUrls(indexContentPart: number): FormArray {
    return this.contentParts.controls[indexContentPart].get('picUrls') as FormArray;
  }
}
