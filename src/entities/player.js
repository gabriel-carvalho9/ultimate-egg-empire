
import * as THREE from 'three';

export function createPlayer(scene) {

    const player = new THREE.Group();

    // Corpo
    const bodyGeometry = new THREE.CapsuleGeometry(0.4, 0.9, 8, 16);

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: '#3988ed',
        roughness: 0.7
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    body.position.y = 0.85;
    body.castShadow = true;

    player.add(body);

    // Cabeça
    const headGeometry = new THREE.SphereGeometry(0.32, 24, 24);

    const headMaterial = new THREE.MeshStandardMaterial({
        color: '#ffcc99'
    });

    const head = new THREE.Mesh(headGeometry, headMaterial);

    head.position.y = 1.72;
    head.castShadow = true;

    player.add(head);

    // Olhos
    const eyeGeometry = new THREE.SphereGeometry(0.045, 12, 12);

    const eyeMaterial = new THREE.MeshStandardMaterial({
        color: '#222222'
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.11, 1.76, 0.28);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.11, 1.76, 0.28);

    player.add(leftEye, rightEye);

    // Braços
    const armGeometry = new THREE.CapsuleGeometry(0.13, 0.55, 6, 12);

    const armMaterial = new THREE.MeshStandardMaterial({
        color: '#3988ed'
    });

    const leftArm = new THREE.Group();
    leftArm.position.set(-0.48, 1.25, 0);

    const leftArmMesh = new THREE.Mesh(armGeometry, armMaterial);
    leftArmMesh.position.y = -0.35;
    leftArmMesh.castShadow = true;
    leftArm.add(leftArmMesh);

    const rightArm = new THREE.Group();
    rightArm.position.set(0.48, 1.25, 0);

    const rightArmMesh = new THREE.Mesh(armGeometry, armMaterial);
    rightArmMesh.position.y = -0.35;
    rightArmMesh.castShadow = true;
    rightArm.add(rightArmMesh);

    player.add(leftArm, rightArm);

    // Pernas
    const legGeometry = new THREE.CapsuleGeometry(0.16, 0.55, 6, 12);

    const legMaterial = new THREE.MeshStandardMaterial({
        color: '#263c63'
    });

    const leftLeg = new THREE.Group();
    leftLeg.position.set(-0.2, 0.55, 0);

    const leftLegMesh = new THREE.Mesh(legGeometry, legMaterial);
    leftLegMesh.position.y = -0.35;
    leftLegMesh.castShadow = true;
    leftLeg.add(leftLegMesh);

    const rightLeg = new THREE.Group();
    rightLeg.position.set(0.2, 0.55, 0);

    const rightLegMesh = new THREE.Mesh(legGeometry, legMaterial);
    rightLegMesh.position.y = -0.35;
    rightLegMesh.castShadow = true;
    rightLeg.add(rightLegMesh);

    player.add(leftLeg, rightLeg);

    // Posição inicial
    player.position.set(0, 0.8, 0);

    scene.add(player);

    return {
        player,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg
    };
}