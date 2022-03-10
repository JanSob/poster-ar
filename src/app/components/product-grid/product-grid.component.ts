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
export class ProductGridComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() posterSize!: string;
  allPosters: Poster[] = [];
  totalNumberPosters!: number;
  pageSize = 10;
  model = 1;

  constructor(private posterService: PosterService) {
  }

  ngOnInit(): void {
    const request = {};
    if(localStorage.getItem('page')){
      // @ts-ignore
      let page = localStorage.getItem('page')

      // @ts-ignore
      this.posterService.queryMock(page).subscribe((postersPage: PostersPage) => {
        this.allPosters = postersPage.content;
        this.totalNumberPosters = postersPage.totalElements;
      });
    }
    else{
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

  nextPage(event: PageEvent) {
    localStorage.setItem('page', String(event.pageIndex));

    const filterRequest = {}
    // @ts-ignore
    filterRequest['page'] = page;

    this.posterService.queryMock(filterRequest).subscribe(
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

}
