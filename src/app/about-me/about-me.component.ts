import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  monParcours = [
    {
      date: '2007-2011',
      description: ['Brevet des collèges Classe audio visuelle'],
      descriptionMobile: ['Brevet des collèges', 'Classe audio visuelle'],
    },
    {
      date: '2011-2014',
      description: ['BAC série L, anglais renforcé, option théâtre'],
      descriptionMobile: ['BAC série L, anglais', 'renforcé, option théâtre'],
    },
    {
      date: '2014-2017',
      description: ['Bachelor design graphique, Option médias imprimés'],
      descriptionMobile: ['Bachelor design graphique', 'Option médias imprimés'],
    },
    {
      date: '2017-2018',
      description: ['Service civique'],
      descriptionMobile: ['Service civique'],
    },
  ];

  mesCompetences = [
    {
      pictoName: 'camera.png',
      title: 'Photographie',
    },
    {
      pictoName: 'camera.png',
      title: 'Impression artisanale',
    },
    {
      pictoName: 'camera.png',
      title: 'PAO',
    },
    {
      pictoName: 'camera.png',
      title: 'Animation',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
