import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as dat from 'lil-gui';



const gui = new dat.GUI({ width: 300 });






window.addEventListener('dblclick', () => {
    console.log('double click');

    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
        console.log('go fullscreen')
    } else {
        document.exitFullscreen();
        console.log('leave fullscreen')
    }

})



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update Camera (aspect ratio)
    camera.apect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    mesh.updateMatrix();

    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Scene
const scene = new THREE.Scene()

// Object --- types of geometry

const geometry = new THREE.BoxGeometry(1,1,1,1,1,1);

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    // wireframe: true
})

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)



// Debug
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
gui.add(mesh.position, 'x', -3, 3, 0.2)
gui.add(mesh.position, 'z', -3, 3, 0.2)
gui.add(mesh, 'visible')
gui.add(mesh.material, 'wireframe')
gui.addColor(mesh.material, 'color')


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// const aspectRatio = sizes.width/sizes.height
// console.log(aspectRatio);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime;


    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)

    controls.update();




    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
