import { Injectable } from '@angular/core';
import * as THREE from 'three';
import {Poster} from "../models/poster";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";


@Injectable({
  providedIn: 'root'
})
export class FrameServiceService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.BoxGeometry;
  private material!: THREE.Material;
  private mesh!: THREE.Mesh;
  private frameMesh!: THREE.Mesh;

  private frameObject!: THREE.Object3D;

  private href!: string | null;
  private file!: File;

  constructor() { }

  async addFrameModelToPainting(poster: Poster): Promise<File>{
    this.scene = new THREE.Scene();
    //loadAsync mit await

    /*     console.log('GltfLoader starting: ' + frameModelURL);
         let gltf = await new GLTFLoader().loadAsync(frameModelURL);
         console.log('GltfLoader ending: ' + frameModelURL);
         this.frameObject = gltf.scene;
         this.frameObject.position.set(0,0,0.01);
         this.frameObject.scale.set(painting.widthMm/100, painting.lengthMm/100, 1);
         this.scene.add(this.frameObject);*/


    let result = this.addFrameWithTextureToPainting(poster);
    return result;
  }

  // @ts-ignore
  async addFrameWithTextureToPainting(poster: Poster): Promise<File>{


    let result = await this.generateGLTF(poster, true);
    return result;

    /*else{
      let result = await this.generateGLTF(painting, true);
      return result;
    }*/
  }

  async generateGLTF(poster: Poster, wallPlaced:boolean): Promise<File>{

    return new Promise((resolve, reject) => {
      this.href = null;

      /*if(!this.scene){
        this.scene = new THREE.Scene();
      }*/

      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
      this.camera.position.set(0,0,4);
      //making geometry
      if(wallPlaced){
        this.geometry = new THREE.BoxGeometry(poster.widthMm/100, poster.lengthMm/100,0.01);
      }else{
        this.geometry = new THREE.BoxGeometry(poster.widthMm/100,0.009, poster.lengthMm/100);
      }

      //making materials
      this.material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false ,
        transparent:true, metalness:0.8});
      //this.material.side = THREE.DoubleSide;


      this.mesh = new THREE.Mesh(this.geometry, this.material);
      let backplateGeometry = new THREE.PlaneGeometry(poster.widthMm/100, poster.lengthMm/100);
      let backplate = new THREE.Mesh(backplateGeometry, new THREE.MeshStandardMaterial({color: 0xFAFAFA, side: THREE.DoubleSide }))



      const loader = new THREE.TextureLoader();
      const self = this;
      let fileUrl = poster.fullsizeImageUrl;

      loader.load(
        // resource URL
        <string>fileUrl,

        // onLoad callback
        async function ( texture:THREE.Texture ) {

          let lightGreyPaper = new THREE.MeshBasicMaterial( { color: 0xFAFAFA, side: THREE.DoubleSide } );
          let pictureMaterial = new THREE.MeshStandardMaterial();
          pictureMaterial.map = texture;
          pictureMaterial.side = THREE.DoubleSide;

          let materials = [
            lightGreyPaper,
            lightGreyPaper,
            lightGreyPaper,
            lightGreyPaper,
            pictureMaterial,
            lightGreyPaper
          ];

          self.mesh.material = materials;

          //@ts-ignore
          self.mesh.material.needsUpdate = true;

          await self.createGLTFOAsync();
          resolve(self.file)
        },

        // onError callback
        function () {
          //console.log( 'An error happened' );
        }
      );
      this.scene.add(this.mesh);
      this.mesh.position.set(0,0,0.0001)
    });
  }

  private async createGLTFOAsync(): Promise<boolean>{
    return new Promise<boolean>((resolve) => {
      // Instantiate a exporter
      const exporter = new GLTFExporter();
      const options = {forceIndices: true, embedImages:true}
      const self = this;

      // Parse the input and generate the glTF output

      exporter.parse(this.scene, async function ( result ) {
        console.log( result );
        const output = JSON.stringify( result, null, 2 );
        self.file = new File([output], Date.now() +"painting.gltf");
        console.log( "created file: " + self.file.name );
        resolve(true);
      }, options); // binary = .glb
    });
  }

}
