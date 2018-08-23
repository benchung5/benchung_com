---
layout: post
title: Importing Textures Into Three.js
date: 2014-08-27 13:41
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: importing-textures-545x545.jpg
---
<iframe class="scene-frame" src="{{site.baseurl}}/demos/lesson03/scene.html" width="100%" height="480" frameborder="0" ></iframe>
This scene is based off of the post <a href="{{site.baseurl}}/importing-model-three-js/">Importing a Model Into Three.js</a> with the added ability to import a texture into our scene. <!--more-->Here is the full .js code:
<pre>var scene, camera, renderer, loader, mesh, material;
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

}</pre>
Note that we've added a little lighting:
<pre>      // directional lighting
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      // ambient lighting
      var ambientLight = new THREE.AmbientLight(0xbbbbbb);
      scene.add(ambientLight);</pre>
THREE.ImageUtils.loadTexture Imports our texture. It's two function parameters are callbacks that execute when and if the is loaded or fails to do so.
<pre>    // texture - texture must not be in same folder or there is an error.
    var texture = THREE.ImageUtils.loadTexture( 'images/texture.jpg', {}, function(){ 
    // use to test when image gets loaded if it does
    // alert('texture loaded') 
    }, 
    function(){ 
        // or if there is an error...
        alert('error') 
    });

    material = new THREE.MeshBasicMaterial( { map: texture } );</pre>
The HTML markup

<style><!-- canvas { width: 100%; height: 100% } --></style>
<div id="viewport"></div>
<pre><!-- make sure this is just below the closing </body> tag --> <!-- for some reason the latest three.js doesn't work, so we use the one from the example file--><script type="text/javascript" src="js/Three.js"></script><script type="text/javascript" src="js/scene.js"></script></pre>
<div id="container"></div>
Download the <a title="Lesson 2: Importing a Model - files" href="{{site.baseurl}}/downloads/lesson03.zip">full example files</a>
