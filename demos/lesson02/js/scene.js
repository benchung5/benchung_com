var scene, camera, renderer, loader, mesh, material;
var group;

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
    
    
    material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 'blue'
    });
    
    
    group = new THREE.Object3D();
    
    var loader = new THREE.JSONLoader();
    loader.load('models/cube.js', modelLoadedCallback);

}


    
function modelLoadedCallback(geometry) {

        mesh = new THREE.Mesh( geometry, material );
        
        group.add(mesh);
        scene.add( group );

}



function render() {
    requestAnimationFrame(render);
    mesh.rotation.y += 0.05;
    renderer.render(scene, camera);
    
}