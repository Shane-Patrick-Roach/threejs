const canvas = document.querySelector('.webgl');
console.log(canvas);

//Scene 
const scene = new THREE.Scene();


//Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'blue' });
const mesh = new THREE.Mesh(geometry, material);

//Add to scene
scene.add(mesh);


// Sizes --------
const sizes = {
  width: 800,
  height: 600
}

// Camera with Args of FOV and Aspect Ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 1;
camera.position.y = 1;
scene.add(camera);

// Renderer
const renderer =  new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera)


