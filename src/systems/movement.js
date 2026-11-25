
import * as THREE from 'three';

export function createMovement({
    player,
    camera,
    controls,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg
}) {

    // ========================================
    // 1. CONTROLES DO TECLADO
    // ========================================

    const keys = {};

    window.addEventListener('keydown', (event) => {
        keys[event.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (event) => {
        keys[event.key.toLowerCase()] = false;
    });

    // ========================================
    // 2. CONFIGURAÇÃO DE MOVIMENTO
    // ========================================

    let playerSpeed = 0;

    const maxPlayerSpeed = 0.12;
    const acceleration = 0.008;
    const deceleration = 0.012;

    // ========================================
    // 3. MOVIMENTAÇÃO DO JOGADOR
    // ========================================

    function movePlayer() {

        const previousPosition = player.position.clone();

        const forward = new THREE.Vector3();

        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        const right = new THREE.Vector3();

        right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
        right.normalize();

        const direction = new THREE.Vector3();

        if (keys['w'] || keys['arrowup']) {
            direction.add(forward);
        }

        if (keys['s'] || keys['arrowdown']) {
            direction.sub(forward);
        }

        if (keys['d'] || keys['arrowright']) {
            direction.add(right);
        }

        if (keys['a'] || keys['arrowleft']) {
            direction.sub(right);
        }

        if (direction.length() > 0) {

            direction.normalize();

            playerSpeed = Math.min(
                playerSpeed + acceleration,
                maxPlayerSpeed
            );

            player.position.addScaledVector(
                direction,
                playerSpeed
            );

            const targetRotation = Math.atan2(
                direction.x,
                direction.z
            );

            player.rotation.y = targetRotation;

        } else {

            playerSpeed = Math.max(
                playerSpeed - deceleration,
                0
            );
        }

        // Limites da plataforma
        player.position.x = THREE.MathUtils.clamp(
            player.position.x, -5.2, 5.2
        );

        player.position.z = THREE.MathUtils.clamp(
            player.position.z, -5.2, 5.2
        );

        // Acompanhamento da câmera
        const movement = player.position.clone().sub(previousPosition);

        camera.position.add(movement);
        controls.target.add(movement);
    }

    // ========================================
    // 4. ANIMAÇÃO DO JOGADOR
    // ========================================

    let animationTime = 0;

    function updatePlayerAnimation(delta) {

        const isMoving = playerSpeed > 0.005;
        const isRunning = keys['shift'];

        if (isMoving) {

            const animationSpeed = isRunning ? 13 : 8;

            animationTime += delta * animationSpeed;

            const swing = Math.sin(animationTime) * 0.65;

            // Braços
            leftArm.rotation.x = swing;
            rightArm.rotation.x = -swing;

            // Pernas
            leftLeg.rotation.x = -swing;
            rightLeg.rotation.x = swing;

        } else {

            // Retorna os membros à posição inicial
            leftArm.rotation.x = THREE.MathUtils.lerp(
                leftArm.rotation.x, 0, 0.15
            );

            rightArm.rotation.x = THREE.MathUtils.lerp(
                rightArm.rotation.x, 0, 0.15
            );

            leftLeg.rotation.x = THREE.MathUtils.lerp(
                leftLeg.rotation.x, 0, 0.15
            );

            rightLeg.rotation.x = THREE.MathUtils.lerp(
                rightLeg.rotation.x, 0, 0.15
            );
        }
    }

    // Disponibiliza as funções para o main.js
    return {
        movePlayer,
        updatePlayerAnimation
    };
}
