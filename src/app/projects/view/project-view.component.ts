import { Component, OnInit } from '@angular/core';
import { Project } from '../../_models/Project';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-project',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  projectDoc: AngularFirestoreDocument<Project>;
  project$: Observable<Project>;
  project: Project;
  config: NgxGalleryOptions[] = [{
    width: '100%',
    thumbnails: false,
    imageAnimation: NgxGalleryAnimation.Slide
  }];
  slidersImages: NgxGalleryImage[][] = [];

  constructor(afs: AngularFirestore, route: ActivatedRoute, private wowService: NgwWowService) {
    route.params.subscribe((params) => {
      this.projectDoc = afs.doc<Project>('/projects/' + params['id']);
      this.project$ = this.projectDoc.valueChanges();
      this.project$.subscribe(project => {
        this.project = project;
        project.pictureCategories.forEach(pictureCategorie => {
          const pictureURLs = pictureCategorie.pictureURLs.map(url => ({ small: url, medium: url, big: url}));
          this.slidersImages.push(pictureURLs);
        });
      });
    });
  }

  ngOnInit() {
    this.wowService.init();
  }

  toSlideImages(pictureURLs) {
    return pictureURLs.map(url => ({ small: url, medium: url, big: url }));
  }
}
