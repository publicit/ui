export interface IGroup {
  id: string;
  name?: string;
}
export class Group implements IGroup {
  id: string;
  name: string;
  constructor() {
    this.id = "";
    this.name = "";
  }
}
