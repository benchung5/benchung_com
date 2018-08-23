if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, cameraControls, scene, renderer, mesh;
var group;

var clock = new THREE.Clock();

var skins = [];
var play = false;

init();
animate();

function init() {
    
        // renderer

        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        container = document.getElementById('container');
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        camera.position.z = 5;

        cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
        cameraControls.target.set(0, 0, 0);

        scene = new THREE.Scene();

        // lights

        light = new THREE.AmbientLight( 0xffffff );
        scene.add( light );

        group = new THREE.Object3D();
        


        // load JSON model with animation -----------------------------------///
//        var loader = new THREE.JSONLoader();
//
//        loader.load('models/tube/animated-tube.json', function (geometry, materials) {
//
//
//            for (var i = 0, il = materials.length; i < il; i++) {
//
//                var originalMaterial = materials[ i ];
//                originalMaterial.skinning = true;
//
//
//    //                    originalMaterial.map = THREE.ImageUtils.loadTexture( "../textures/texture.jpg" );
//    //                    originalMaterial.map = undefined;
//    //                    originalMaterial.shading = THREE.SmoothShading;
//    //                    originalMaterial.color.setHSL( 0.01, 0.3, 0.3 );
//    //                    originalMaterial.ambient.copy( originalMaterial.color );
//    //                    originalMaterial.specular.setHSL( 0, 0, 0.1 );
//    //                    originalMaterial.shininess = 75;
//    //                    originalMaterial.wrapAround = true;
//    //                    originalMaterial.wrapRGB.set( 1, 0.5, 0.5 );
//
//            }
//
//
//    //      mesh = new THREE.Mesh(geometry, materialTexture);
//            var material = new THREE.MeshFaceMaterial(materials);
//            var mesh = new THREE.SkinnedMesh(geometry, material, false);
//
//            group.add(mesh);
//            
//
//            skins.push(mesh);
//
//    //      THREE.AnimationHandler.add(geometry.animation);
//            animation = new THREE.Animation(mesh, geometry.animations[1]);
//            animation.play();
//            animation.update(0);
//
//        });
        
        
        // load COLLADA model with animation -----------------------------------///
        
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;

        loader.load('models/tube/animated-tube.dae', function (collada) {

//            materialbasic = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true, skinning: true});

            dae = collada.scene;

            dae.traverse(function (child) {

                if (child instanceof THREE.SkinnedMesh) {

                    var animation = new THREE.Animation(child, child.geometry.animation);
                    animation.play();

                }

            });

//            setMaterial(dae, materialbasic);
//
//            function setMaterial(child, material) {
//                child.material = material;
//                if (child.children) {
//                    for (var i = 0; i < child.children.length; i++) {
//                        setMaterial(child.children[i], material);
//                    }
//                }
//            }

//            default rotation, position
            dae.rotation.set(0, 0, 0);
            dae.position.set(0, 0, 0);//x,z,y - if you think in blender dimensions ;)
            dae.scale.set(0.5, 0.5, 0.5);

            dae.updateMatrix();

            group.add(dae);


        });


        scene.add( group );

        window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        animate();

}

function animate() {
    
        var delta = clock.getDelta();

        requestAnimationFrame(animate);
        
        cameraControls.update(delta);
        
        updateAnimation(delta, 'JSON');
        
        renderer.render(scene, camera);
        
}

$(document).ready(function () {
    //onclick
    jQuery("#start").click(function () {
        play = true;
    });
    jQuery("#stop").click(function () {
        play = false;
    });

});

function updateAnimation(delta, type) {
    //      update animation
    if (play == true) {

        switch (type) {
            case 'JSON':
                //for JSON version
                THREE.AnimationHandler.update(delta);
                break;
            case 'COLLADA':
                //for Collada version - 0.03 makes it more accurate
                THREE.AnimationHandler.update(delta * 0.03);
                break;
            default:
                THREE.AnimationHandler.update(delta);
        } 
    }
}