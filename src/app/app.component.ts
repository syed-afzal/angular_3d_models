import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: false }) rendererContainer: ElementRef;
  // three.js main properties we need three things: scene, camera and renderer, so that we can render the scene with camera.
  threeJS = {
  renderer: null,
  scene: null,
  camera: null,
  };
  lightObj = {
    light: null,
    light2: null,
    light3: null,
    light4: null,
    directionLight: null,
  };
  hlight;
  loader;
  controls;

  constructor() {
    this.threeJS.scene = new THREE.Scene();
    this.threeJS.scene.background = new THREE.Color(0xdddddd);

    this.threeJS.renderer = new THREE.WebGLRenderer({antialias: true});
    this.threeJS.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    // positions for camera
    this.threeJS.camera.rotation.y = 45 / 180 * Math.PI;
    this.threeJS.camera.position.x = 800;
    this.threeJS.camera.position.y = 100;
    this.threeJS.camera.position.z = 1000;

    this.hlight = new THREE.AmbientLight(0x404040, 100);
    this.threeJS.scene.add(this.hlight);

    // adjust lighting
    this.adjustLighting();
  }

  ngAfterViewInit() {
    this.threeJS.renderer.setSize(window.innerWidth, window.innerHeight);

    // add control for 360 degree
    this.controls = new OrbitControls(this.threeJS.camera, this.threeJS.renderer.domElement);
    this.controls.addEventListener('change', this.threeJS.renderer);

    this.rendererContainer.nativeElement.appendChild(this.threeJS.renderer.domElement);

    this.loader = new GLTFLoader();
    this.loader.load('assets/three3dModels/scene.gltf', (gltf) => {
      const car = gltf.scene.children[0];
      car.scale.set(0.5, 0.5, 0.5);
      this.threeJS.scene.add(gltf.scene);
      // this.renderer.render(this.scene, this.camera);

      // call animate method here instead, to call recursively when direction changes
      this.animate();
    });
  }

  animate() {
    this.threeJS.renderer.render(this.threeJS.scene, this.threeJS.camera);
    window.requestAnimationFrame(() => this.animate());
  }

  // ngAfterViewInit() {
  //   this.renderer.setSize(window.innerWidth, window.innerHeight);
  //   this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  //   this.animate();
  // }
  //
  // animate() {
  //   window.requestAnimationFrame(() => this.animate());
  //   this.cube.rotation.x += 0.01;
  //   this.cube.rotation.y += 0.02;
  //   this.renderer.render(this.scene, this.camera);
  // }

  adjustLighting() {
    this.lightObj.directionLight = new THREE.DirectionalLight(0xffffff, 100);
    this.lightObj.directionLight.position.set(0, 1, 0);
    this.lightObj.directionLight.castShadow = true;
    this.threeJS.scene.add(this.lightObj.directionLight);

    this.lightObj.light = new THREE.PointLight(0xc4c4c4c, 10);
    this.lightObj.light.position.set(0, 300, 500);
    this.threeJS.scene.add(this.lightObj.light);

    this.lightObj.light2 = new THREE.PointLight(0xc4c4c4c, 10);
    this.lightObj.light2.position.set(500, 100, 0);
    this.threeJS.scene.add(this.lightObj.light2);

    this.lightObj.light3 = new THREE.PointLight(0xc4c4c4c, 10);
    this.lightObj.light3.position.set(0, 100, -500);
    this.threeJS.scene.add(this.lightObj.light3);

    this.lightObj.light4 = new THREE.PointLight(0xc4c4c4c, 10);
    this.lightObj.light4.position.set(-500, 300, 0);
    this.threeJS.scene.add(this.lightObj.light4);
  }
}
