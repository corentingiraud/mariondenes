export class Project {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  mainPictureURL: string;
  introduction: string;
  contentParts: Array<{
    title: string;
    body: string;
    picturesTitle: string;
    pictureURLs: Array<string>;
  }>;
  tags: Array<string>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
