
import * as THREE from 'three';

export function createEnvironment(scene) {

    // ========================================
    // TERRENO
    // ========================================

    const groundGeometry = new THREE.BoxGeometry(100, 1, 100);

    const groundMaterial = new THREE.MeshStandardMaterial({
        color: '#65b94e',
        roughness: 1
    });

    const ground = new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

    ground.position.y = -0.5;
    ground.receiveShadow = true;

    scene.add(ground);

    // ========================================
    // PLATAFORMA CENTRAL
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
    // DETALHES DA PLATAFORMA
    // ========================================

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
}
