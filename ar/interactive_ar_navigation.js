
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Raycaster, Vector2 } from 'three';

export const initInteractiveARNavigation = (routeData) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const interactiveObjects = [];

    // Add route data as interactive objects
    routeData.steps.forEach((step, index) => {
        const stepGeometry = new BoxGeometry(0.5, 0.5, 2);
        const stepMaterial = new MeshBasicMaterial({ color: 0xff0000 });
        const stepObject = new Mesh(stepGeometry, stepMaterial);

        stepObject.position.set(step.x, step.y, -index * 3);
        interactiveObjects.push(stepObject);
        scene.add(stepObject);
    });

    const onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseClick = () => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            console.log('Interacted with:', selectedObject);
            alert('Route Step Selected!');
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();
};
