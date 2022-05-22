import './style.css'
import gsap from 'gsap'
import * as THREE from 'three'
import { Mesh } from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group();

scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)

group.add(cube1);

// //Axes helper object
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 3

scene.add(camera);



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);


//const clock = new THREE.Clock();

gsap.to(cube1.position, {duration: 1, delay:2, x: 2})
gsap.to(cube1.position, {duration: 2, delay:3, y: 2})

//Animations
const tick = () => {

    //const elapsedTime = clock.getElapsedTime();



    // // Update Objects
    // cube1.position.y = Math.sin(elapsedTime)
    // cube1.rotation.y = Math.cos(elapsedTime)

    // camera.lookAt(cube1.position)




    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}


//call your tick function
tick();
