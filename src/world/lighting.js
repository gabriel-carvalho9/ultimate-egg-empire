
import * as THREE from 'three';

export function createLighting(scene) {

    // Luz ambiente
    const ambientLight = new THREE.HemisphereLight(
        '#ffffff',
        '#557744',
        2
    );

    scene.add(ambientLight);

    // Luz principal
    const sunLight = new THREE.DirectionalLight('#ffffff', 3);

    sunLight.position.set(15, 25, 10);
    sunLight.castShadow = true;

    sunLight.shadow.mapSize.set(2048, 2048);

    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;

    scene.add(sunLight);
}
