---
layout: post
title: Antialiasing in Three.js
date: 2014-08-29 13:40
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: antialiasing-in-three-js-545x545.jpg
excerpt: One of the hurdles of 3D is aliasing (jagged edges when rendering). Depending on your hardware and browser, three.js has a built in function to help with this (top left - without antialiasing, top right - with antialiasing)...
---
<iframe class="scene-frame" src="{{site.baseurl}}/demos/lesson04/scene.html" width="100%" height="240" frameborder="0" ></iframe>

One of the hurdles of 3D is aliasing (jagged edges when rendering). Depending on your hardware and browser, three.js has a built in function to help with this (top left: without antialiasing, top right: with antialiasing). <!--more-->Here is the code to enable it:

<pre>renderer2 = new THREE.WebGLRenderer({ antialias: true });</pre>

The full .js code below...

<pre>var scene, camera, renderer, geometry, material, cube, group;

var scene2, camera2, renderer2, geometry2, material2, cube2, group2;

init();
render();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = 5;

    //set background to have transparency - alpha: true
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("viewport1").appendChild(renderer.domElement);

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

//    2-----------------------------

    scene2 = new THREE.Scene();

    camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera2.position.z = 5;

    //set background to have transparency - alpha: true
    renderer2 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer2.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("viewport2").appendChild(renderer2.domElement);

    geometry2 = new THREE.CubeGeometry(1, 1, 1);
    material2 = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 'black'
    });
    cube2 = new THREE.Mesh(geometry2, material2);

    group2 = new THREE.Object3D();
    group2.add(cube2);
    scene2.add( group2 );
}

function render() {
    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;
    renderer2.render(scene2, camera2);
}</pre>
