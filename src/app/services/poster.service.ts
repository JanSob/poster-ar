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
      price: 0, arReady: true, thumbnailImageUrl: '/assets/images/sokrates.jpg', 
      fullsizeImageUrl:'/assets/images/sokrates.jpg', threeD_urlAndroid: null, threeD_urlIOS: null},
      {id: 2, country: 'France', region: 'Paris', lengthMm: 1473 , widthMm: 1143, details: 'The Spanish Singer', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},
      {id: 3, country: 'Germany', region: 'Frankfurt', lengthMm: 927 , widthMm: 737, details: 'The Empress Eugénie', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/437942/795922/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/437942/795922/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},
      {id: 4, country: 'France', region: 'Paris', lengthMm: 1851 , widthMm: 1286, details: 'Young Lady in 1866', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436964/802893/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436964/802893/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},      
      {id: 5, country: 'France', region: 'Paris', lengthMm: 972, widthMm: 1302, details: 'Boating', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436947/796399/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436947/796399/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},      
      {id: 6, country: 'Austria', region: 'Vienna', lengthMm: 1499, widthMm: 1105, details: 'Mäda Primavesi', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436819/801225/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436819/801225/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},
    ], totalElements: 6});
  }

  getPosterByIdMock(id:number): Observable<Poster>{
    console.log('Pictureid: ' + id);
    
    switch(Number(id)){
      case 1: 
        return of (new Poster(1, 'France', 'Paris', 1295 , 1962, 'The Death of Socrates', 
        0, true, '/assets/images/sokrates.jpg', 
        '/assets/images/sokrates.jpg', null, null));

      case 2: 
        return of (new Poster(2, 'France', 'Paris', 1473 , 1143, 'The Spanish Singer', 
        0, true, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', 
        'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', null, null));


      case 3: 
        return of (new Poster(3, 'Germany', 'Frankfurt', 927 , 737, 'The Empress Eugénie', 
        0, true, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/437942/795922/main-image', 
        'https://collectionapi.metmuseum.org/api/collection/v1/iiif/437942/795922/main-image', null, null));

      case 4: 
        return of (new Poster(4, 'France', 'Paris', 1851 , 1286, 'Young Lady in 1866', 
        0, true, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436964/802893/main-image', 
        'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436964/802893/main-image', null, null));


      case 5: 
        return of (new Poster(5, 'France', 'Paris', 972, 1302, 'Boating', 
        0, true, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436947/796399/main-image', 
        'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436947/796399/main-image', null, null));


      case 6: 
        return of (new Poster(6, 'Austria', 'Vienna', 1499, 1105, 'Mäda Primavesi', 
        0, true, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436819/801225/main-image', 
        'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436819/801225/main-image', null, null));


      default: return of (new Poster(2, 'France', 'Paris', 1473 , 1143, 'The Spanish Singer', 
      0, true, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', 
      'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', null, null));

    }
  }

  queryMock(request: any): Observable<PostersPage>{
    const params = request;
    return of({content: [
      {id: 1, country: 'France', region: 'Paris', lengthMm: 1295 , widthMm: 1962, details: 'The Death of Socrates', 
      price: 0, arReady: true, thumbnailImageUrl: '/assets/images/sokrates.jpg', 
      fullsizeImageUrl:'/assets/images/sokrates.jpg', threeD_urlAndroid: null, threeD_urlIOS: null},
      {id: 2, country: 'France', region: 'Paris', lengthMm: 1473 , widthMm: 1143, details: 'The Spanish Singer', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436944/794730/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},
      {id: 3, country: 'Germany', region: 'Frankfurt', lengthMm: 927 , widthMm: 737, details: 'The Empress Eugénie', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/437942/795922/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/437942/795922/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},
      {id: 4, country: 'France', region: 'Paris', lengthMm: 1851 , widthMm: 1286, details: 'Young Lady in 1866', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436964/802893/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436964/802893/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},      
      {id: 5, country: 'France', region: 'Paris', lengthMm: 972, widthMm: 1302, details: 'Boating', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436947/796399/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436947/796399/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},      
      {id: 6, country: 'Austria', region: 'Vienna', lengthMm: 1499, widthMm: 1105, details: 'Mäda Primavesi', 
      price: 0, arReady: true, thumbnailImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436819/801225/main-image', 
      fullsizeImageUrl:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436819/801225/main-image', threeD_urlAndroid: null, threeD_urlIOS: null},
    ], totalElements: 6});
  }

}
