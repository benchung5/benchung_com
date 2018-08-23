---
layout: post
title: Rotate View With the Mouse in Three.js
date: 2014-09-12 13:02
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: mouse-orbit-controls-threejs-545x545.jpg
excerpt: This example uses "OrbitControls" in three.js to rotate the camera around an object. It's based off of the example
---
<iframe class="scene-frame" src="{{site.baseurl}}/demos/mouse-tracking/scene.html" width="100%" height="480" frameborder="0" ></iframe>

This example uses "OrbitControls" in three.js to rotate the camera around an object. It's based off of the example: <a title="orbit controls three.js" href="http://threejs.org/examples/#misc_controls_orbit" target="_blank">http://threejs.org/examples/#misc_controls_orbit</a> on the three.js website. We've just added a textured cube that's been imported from Blender. You can take a look at importing a model from Blender then adding a texture <a title="importing textures into three.js" href="{{site.baseurl}}/importing-textures-three-js/">here</a>.
Note that adding this ability is quite simple because three.js comes with a library that takes care of all the ground work. Here is the full source code for the .js file:
<pre>if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, controls, scene, renderer, mesh;
var group;

init();
render();

function animate() {

        requestAnimationFrame(animate);
        controls.update();

}

function init() {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        camera.position.z = 5;

        controls = new THREE.OrbitControls( camera );
//        controls.damping = 0.2;
        controls.addEventListener( 'change', render );

        scene = new THREE.Scene();

        // lights

        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        light = new THREE.DirectionalLight( 0x002288 );
        light.position.set( -1, -1, -1 );
        scene.add( light );

        light = new THREE.AmbientLight( 0x222222 );
        scene.add( light );


        // texture - texture must not be in same folder or there is an error.
        var texture = THREE.ImageUtils.loadTexture( 'images/texture.jpg', {}, function(){ 
        // use to test when image gets loaded if it does
        render();
        }, 
        function(){ 
            alert('error') 
        });

        material = new THREE.MeshBasicMaterial({map: texture});

        group = new THREE.Object3D();
         
        //load mesh 
        var loader = new THREE.JSONLoader();
        loader.load('models/cube.js', modelLoadedCallback);


        // renderer

        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );

        container = document.getElementById( 'container' );
        container.appendChild( renderer.domElement );

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild( stats.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

        animate();

}

function modelLoadedCallback(geometry) {

        mesh = new THREE.Mesh( geometry, material );
        group.add(mesh);
        scene.add( group );

}

function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

}

function render() {
//        requestAnimationFrame(render);
//        mesh.rotation.y += 0.05;
        renderer.render(scene, camera);
        stats.update();

}
</pre>
Note that the example has simply included:
<pre>script type="text/javascript" src="js/OrbitControls.js"
</pre>
then made a new instance of OrbitControls and added the camera as a parameter. The render function is then added to the 'change' event:
<pre>controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', render );
</pre>
Download the <a title="Camera Orbit - files" href="{{site.baseurl}}/images/blog/mouse-tracking.zip">full example files</a>
