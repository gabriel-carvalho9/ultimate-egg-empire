import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPlayer } from './entities/player.js';
import { createMovement } from './systems/movement.js';
import { createLighting } from './world/lighting.js';
import { createEnvironment } from './world/environment.js';
import './style.css';

// ========================================
// 1. CONFIGURAÇÃO INICIAL
// ========================================

const app = document.querySelector('#app');

const scene = new THREE.Scene();

scene.background = new THREE.Color('#a8d8ff');
scene.fog = new THREE.Fog('#a8d8ff', 35, 100);

// ========================================
// 2. CÂMERA
// ========================================

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.set(18, 16, 22);
camera.lookAt(0, 0, 0);

// ========================================
// 3. RENDERIZADOR
// ========================================

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.outputColorSpace = THREE.SRGBColorSpace;

app.appendChild(renderer.domElement);

// ========================================
// 4. CONTROLES DA CÂMERA
// ========================================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Permite olhar ao redor com o mouse
controls.enableRotate = true;
// Impede deslocamento lateral
controls.enablePan = false;
// Permite aproximar e afastar
controls.enableZoom = true;

// Rotação da câmera apenas com o botão direito
controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;

// Limita o quanto podemos olhar para cima e para baixo
controls.minPolarAngle = 0.3;
controls.maxPolarAngle = Math.PI / 2;

controls.minDistance = 8;
controls.maxDistance = 35;

controls.target.set(0, 0, 0);

// ========================================
// 5. ILUMINAÇÃO
// ========================================

createLighting(scene);

// ========================================
// 6. AMBIENTE DO JOGO
// ========================================

createEnvironment(scene);

// ========================================
// 7. PLATAFORMA CENTRAL
// ========================================

const platformGeometry = new THREE.BoxGeometry(12, 0.8, 12);

const platformMaterial = new THREE.MeshStandardMaterial({
  color: '#d9d9d9',
  roughness: 0.8
});

const platform = new THREE.Mesh(
  platformGeometry,
  platformMaterial
);

platform.position.y = 0.4;
platform.castShadow = true;
platform.receiveShadow = true;

scene.add(platform);

// ========================================
// 8. DETALHES DA PLATAFORMA
// ========================================

// Pequena marcação central
const markerGeometry = new THREE.BoxGeometry(2, 0.05, 2);

const markerMaterial = new THREE.MeshStandardMaterial({
  color: '#f5d76e'
});

const marker = new THREE.Mesh(
  markerGeometry,
  markerMaterial
);

marker.position.y = 0.83;
marker.receiveShadow = true;

scene.add(marker);

// ========================================
// 9. REDIMENSIONAMENTO DA TELA
// ========================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========================================
// 90. JOGADOR
// ========================================

const { player, leftArm, rightArm, leftLeg, rightLeg } = createPlayer(scene);

// ========================================
// 11. MOVIMENTAÇÃO DO JOGADOR
// ========================================

const movement = createMovement({
    player,
    camera,
    controls,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  movement.movePlayer();
  movement.updatePlayerAnimation(delta);

  controls.update();

  renderer.render(scene, camera);
}

animate();