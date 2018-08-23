var scene, camera, renderer, geometry, material, cube, group;


init();
render();

function init() {
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = 5;
    
    //set background to have transparency - alpha: true
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.getElementById("viewport").appendChild(renderer.domElement);
    
    
    geometry = new THREE.CubeGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 'black'
    });
    cube = new THREE.Mesh(geometry, material);
//    scene.add(cube);
    
    group = new THREE.Object3D();
    group.add(cube);
    scene.add( group );

}



function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    
    
}