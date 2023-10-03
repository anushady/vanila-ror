// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
let gui2 = new dat.GUI();
// GLTF Loader

var loader = new THREE.GLTFLoader();
var obj;
loader.load(
  // resource URL
  "fis.glb",
  // called when the resource is loaded
  function (gltf) {
    obj = gltf.scene;
    scene.add(obj);
    obj.scale.set(1, 1, 1);
    obj.position.set(0, 0, 4.2);
    obj.rotation.set(1.4, 5, 0);

    gsap.registerPlugin(ScrollTrigger);

    let foldermod2 = gui2.addFolder("position");

    foldermod2.add(obj.position, "x", -5, 5, 0.2).name("X");
    foldermod2.add(obj.position, "y", -5, 5, 0.2).name("Y");
    foldermod2.add(obj.position, "z", -5, 5, 0.2).name("Z");
    foldermod2.open();

    let foldermod = gui2.addFolder("Rotation");

    foldermod.add(obj.rotation, "x", -5, 5, 0.2).name("X");
    foldermod.add(obj.rotation, "y", -5, 5, 0.2).name("Y");
    foldermod.add(obj.rotation, "z", -5, 5, 0.2).name("Z");
    foldermod.open();

    var tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          markers: true,
        },
      })
      .to(obj.position, { duration: 3, x: 0, y: 0, z: 0 })
      .to(obj.rotation, { duration: 3, x: 0.3, y: 0, z: 0 }, 0)
      .to(obj.position, { duration: 1, x: -2 })
      .to(obj.rotation, { duration: 2, y: -6 }, "<")
      .to(".text", { duration: 0.5, opacity: 1, x: "+150px" }, "<")
      .to(obj.rotation, { duration: 1, y: -6 });
  }
);

// Lights
const light = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
scene.add(light);

// const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
// light2.position.set(3, 0, 1);
// scene.add(light2);

// const light3 = new THREE.DirectionalLight(0xffffff, 0.5);
// light3.position.set(-3, 0, 1);
// scene.add(light3);

// const light4 = new THREE.DirectionalLight(0xffffff, 0.5);
// light4.position.set(1, 0, 0);
// scene.add(light4);

// const light5 = new THREE.DirectionalLight(0xffffff, 0.5);
// light5.position.set(-1, 0, 0);
// scene.add(light5);

// const light6 = new THREE.DirectionalLight(0xffffff, 0.5);
// light6.position.set(0, 1, 0);
// scene.add(light6);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 6;
scene.add(camera);

//Controls
// const controls = new THREE.OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.keys = {
//   LEFT: "ArrowLeft", //left arrow
//   UP: "ArrowUp", // up arrow
//   RIGHT: "ArrowRight", // right arrow
//   BOTTOM: "ArrowDown", // down arrow
// };
//add rgbe loader

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
/**
 * Animate
 */

// document.addEventListener("mousemove", onDocumentMouseMove);

// let mouseX = 0;
// let mouseY = 0;

// let targetX = 0;
// let targetY = 0;

// const windowX = window.innerWidth / 2;
// const windowY = window.innerHeight / 2;

// function onDocumentMouseMove(event) {
//   mouseX = event.clientX - windowX;
//   mouseY = event.clientY - windowY;
// }

//  const updateOnScroll = (event) => {
//      obj.position.z = window.scrollY *.002
//  }

//  window.addEventListener('scroll', updateOnScroll)
let envmaploader = new THREE.PMREMGenerator(renderer);
new THREE.RGBELoader().load("hardlight.hdr", function (hdrmap) {
  hdrmap.mapping = THREE.EquirectangularReflectionMapping;
  //scene.background = hdrmap;
  scene.environment = hdrmap;
});

const clock = new THREE.Clock();

const tick = () => {
  window.requestAnimationFrame(tick);
  const deltaTime = clock.getDelta();
  //if ( mixer1 ) mixer1.update( deltaTime);

  // targetX = mouseX * 0.001;
  // targetY = mouseY * 0.001;

  // Update objects
  // if (obj) obj.rotation.y += 0.005 * (targetX - obj.rotation.y);
  // if (obj) obj.rotation.x += 0.05 * (targetY - obj.rotation.x);
  // if (obj) obj.rotation.z += -0.05 * (targetY - obj.rotation.x);

  // Update Orbital Controls
  // controls.update();
  renderer.render(scene, camera);

  // Call tick again on the next frame
};

tick();
