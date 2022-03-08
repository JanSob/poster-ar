import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PosterService} from "../../services/poster.service";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { PostersPage } from 'src/app/models/posters-page';
import { Poster } from 'src/app/models/poster';



@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() posterSize!: string;
  allPosters: Poster[] = [];
  totalNumberPosters!: number;
  model = 1;

  constructor(private posterService: PosterService) {

  }

  ngAfterViewInit(): void {
    const request = {};
    if(localStorage.getItem('page') && localStorage.getItem('posterSize')){

      // @ts-ignore
      this.paginator.pageIndex = localStorage.getItem('page');
      // @ts-ignore
      this.posterSize = localStorage.getItem('posterSize');
      let page = localStorage.getItem('page')

      // @ts-ignore
      this.posterService.queryMock(this.extracted(page.toString())).subscribe((postersPage: PostersPage) => {
        this.allPosters = postersPage.content;
        this.totalNumberPosters = postersPage.totalElements;
      });
    }
    else{
      this.posterSize = 'all';
      localStorage.setItem('posterSize', this.posterSize);
      localStorage.setItem('page', '0');
      // @ts-ignore
      request['page'] = 0;
      // @ts-ignore
      request['size'] = 10;
      this.posterService.getPostersListMock(request).subscribe((postersPage: PostersPage) => {
        this.allPosters = postersPage.content;
        this.totalNumberPosters = postersPage.totalElements;
      });
    }
  }



  private extracted(page:number) {
    const filterRequest = {}
    // @ts-ignore
    filterRequest['page'] = page;s
    switch (this.posterSize){
      case "small": {
        this.model = 2;
        // @ts-ignore
        filterRequest['lengthMmMin'] = 0;
        // @ts-ignore
        filterRequest['lengthMmMax'] = 120;
        // @ts-ignore
        filterRequest['widthMmMin'] = 0;
        // @ts-ignore
        filterRequest['widthMmMax'] = 150;
        break;
      }
      case "medium": {
        this.model = 3;
        // @ts-ignore
        filterRequest['lengthMmMin'] = 121;
        // @ts-ignore
        filterRequest['lengthMmMax'] = 250;
        // @ts-ignore
        filterRequest['widthMmMin'] = 100;
        // @ts-ignore
        filterRequest['widthMmMax'] = 200;
        break;
      }
      case "large": {
        this.model = 4;
        // @ts-ignore
        filterRequest['lengthMmMin'] = 200;
        // @ts-ignore
        filterRequest['lengthMmMax'] = 1000;
        // @ts-ignore
        filterRequest['widthMmMin'] = 200;
        // @ts-ignore
        filterRequest['widthMmMax'] = 1000;
        break;
      }
      case "long": {
        this.model = 5;
        // @ts-ignore
        filterRequest['lengthMmMin'] = 250;
        // @ts-ignore
        filterRequest['lengthMmMax'] = 1000;
        // @ts-ignore
        filterRequest['widthMmMin'] = 65;
        // @ts-ignore
        filterRequest['widthMmMax'] = 150;
        break;
      }
      case "all": {
        this.model = 1;
        //statements;
        // @ts-ignore
        filterRequest['lengthMmMin'] = 0;
        // @ts-ignore
        filterRequest['lengthMmMax'] = 100000;
        // @ts-ignore
        filterRequest['widthMmMin'] = 0;
        // @ts-ignore
        filterRequest['widthMmMax'] = 100000;
        break;
      }
      case "custom": {
        //statements;
        break;
      }
    }
    return filterRequest;
  }

  nextPage(event: PageEvent) {
    localStorage.setItem('page', String(event.pageIndex));

    this.posterService.queryMock(this.extracted(event.pageIndex)).subscribe(
      (allPosters: PostersPage)=>{
        this.allPosters = allPosters.content;
        this.totalNumberPosters = allPosters.totalElements;
        this.scrollToTop();
      },
      error=>{
        console.log(error)}
    );;
  }

  scrollToTop(){
    window.scroll(0,0);
  }

  filterCarpets(posterSize: string) {
    this.posterSize = posterSize;
    localStorage.setItem('posterSize', this.posterSize);
    localStorage.setItem('page', '0');

    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    this.paginator.firstPage();
    this.nextPage(pageEvent);
  }
}
