export class Project {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  mainPictureURL: string;
  pictureCategories: Array<{
    name: string;
    picturesURLs: string[];
  }>;
  tags: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
