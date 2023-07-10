import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import glbModel from "./assets/Barn_Testing.glb";
function App() {
  t
  const Modelo = useRef();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspeciveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const loader = new GLTFLoader();
  loader.load(glbModel, (gltf) => {
    const model = gltf.scene;
    Modelo.current = model;
    scene.add(model);
  });

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  scene.add(light);

  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -1);
  scene.add(light2);

  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(1, 0, 0);
  scene.add(light3);

  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-1, 0, 0);
  scene.add(light4);

  const controls = new OrbitControls(camera, renderer.domElement);

  useEffect(() => {
    animate();
    if (document.getElementById("render").children.length === 0) {
      document.getElementById("render").appendChild(renderer.domElement);
    }
  }, []);

 
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  return (
      <div
       onMouseMove={(e) => {
        const mouse = new THREE.Vector2();
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(Modelo.current);
        const meshes = Modelo.current.children[1].children.filter(
          (child) => child.isMesh
        );
        if (intersects.length > 0) {
          meshes[6].material.color.set("red");
        } else {
          meshes[6].material.color.set("white");
        }
      }}
      id="render"></div>
  );
}

export default App;
