import { Poster } from "./poster";

export class PostersPage{

  constructor(public content: Poster[],
              public totalElements: number) {
  }
}
