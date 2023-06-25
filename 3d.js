const canvas = document.getElementById("skyCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//seting up the camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.width, canvas.height);

//setingup image for six cube
const loader = new THREE.CubeTextureLoader();
const skyboxTextures = loader.load([
  "op2.jpg",
  "op2.jpg",
  "op2.jpg",
  "op2.jpg",
  "op2.jpg",
  "op2.jpg",
]);

scene.background = skyboxTextures;


camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

