import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PosterService} from "../../services/poster.service";
import {Location} from '@angular/common';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FrameServiceService} from "../../services/frame-service.service";
import { Poster } from 'src/app/models/poster';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  poster!:Poster;
  saveUrl!: SafeUrl;
  // file is the poster-GLTF
  file!: File;
  fileObjectUrl!: string;

  constructor(private activatedRoute: ActivatedRoute,
              private posterService: PosterService,
              private location:Location,
              private sanitizer:DomSanitizer,
              private frameService:FrameServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params)=>{
        let id:number = params['id'];
        this.posterService.getPosterByIdMock(id).subscribe(
          (poster: Poster) => {
            this.poster = poster;
            let dirty = "intent://arvr.google.com/scene-viewer/1.0?file=" + this.poster.threeD_urlAndroid +
              "&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;" +
              "action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;";
            this.saveUrl = this.sanitizer.bypassSecurityTrustUrl(dirty);
            this.loadFrameModel().then(r => {return})
          },
          error => {
            console.log(error)
            return;
          }
        )
      }
    )
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  async loadFrameModel(){
    try{
      this.file = await this.frameService.addFrameModelToPainting(this.poster);
      this.fileObjectUrl = URL.createObjectURL(this.file);
      //console.log('LoadFrameModel in prodDet is done!');
    }
    catch(error){
      console.log('There was a problem generating a frame: ' + error);
    }

  }

}
