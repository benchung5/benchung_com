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
    
    
      // directional lighting
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);
      
      // ambient lighting
      var ambientLight = new THREE.AmbientLight(0xbbbbbb);
      scene.add(ambientLight);
    

    // texture - texture must not be in same folder or there is an error.
    var texture = THREE.ImageUtils.loadTexture( 'images/texture.jpg', {}, function(){ 
    // use to test when image gets loaded if it does
    // alert('texture loaded') 
    }, 
    function(){ 
        alert('error') 
    });
    
    material = new THREE.MeshBasicMaterial( { map: texture } );

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