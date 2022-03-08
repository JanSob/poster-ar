import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import { PostersPage } from '../models/posters-page';
import { Poster } from '../models/poster';

const baseUri = environment.backendUrl + '/posters/';

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  constructor(private httpClient: HttpClient) { }

  getPostersList(request?: any): Observable<PostersPage>{
    const params = request;
    return this.httpClient.get<PostersPage>(baseUri, {params});
  }  

  getPosterById(id:number): Observable<Poster>{
    return this.httpClient.get<Poster>(baseUri + id);
  }

  query(request: any): Observable<PostersPage>{
    const params = request;
    return this.httpClient
      .get<PostersPage>(baseUri+"query",{params});
  }
  

  // Mock-data
  getPostersListMock(request?: any): Observable<PostersPage>{
    const params = request;
    return of({content: [
      {id: 1, country: 'France', region: 'Paris', lengthMm: 1295 , widthMm: 1962, details: 'The Death of Socrates', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436105/1692908/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436105/1692908/main-image', threeD_urlAndroid: null, threeD_urlIOS: null}
    ], totalElements: 1});
  }

  getPosterByIdMock(id:number): Observable<Poster>{
    return of (new Poster(1, 'France', 'Paris', 1295 , 1962, 'The Death of Socrates', 
    0, true, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436105/1692908/main-image', 
    'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436105/1692908/main-image', null, null));
  }

  queryMock(request: any): Observable<PostersPage>{
    const params = request;
    return of({content: [
      {id: 1, country: 'France', region: 'Paris', lengthMm: 1295 , widthMm: 1962, details: 'The Death of Socrates', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436105/1692908/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436105/1692908/main-image', threeD_urlAndroid: null, threeD_urlIOS: null}
    ], totalElements: 1});
  }

}
