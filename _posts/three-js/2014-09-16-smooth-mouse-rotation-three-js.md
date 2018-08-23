---
layout: post
title: Smooth Mouse Rotation in Three.js
date: 2014-09-16 12:57
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: smooth-mouse-tracking-545x545.jpg
excerpt: Achieving a momentum effect during mouse drag has always been a nice feature that I've see many times in different examples of 3D for the web. After experimenting with three.js and seeing it's potential I thought this is a must have feature. The problem I found though is that from the examples that use it, it was difficult to find proper source code that worked just how I wanted it.
---
<iframe class="scene-frame" src="{{site.baseurl}}/demos/smooth-mouse-tracking/scene.html" width="100%" height="480" frameborder="0" ></iframe>

This example demonstrates Smooth axis rotation via mouse in three.js. Click and drag around in the above.

It is based off of <a title="Rotate mouse view in three.js" href="{{site.baseurl}}/rotate-view-mouse-three-js/" target="_blank">this post</a> and <a title="three.js example - geometry shapes" href="http://threejs.org/examples/#webgl_geometry_shapes" target="_blank">this example</a> on the three.js website.

Achieving a momentum effect during mouse drag has always been a nice feature that I've see many times in different examples of 3D for the web. After experimenting with three.js and seeing it's potential I thought this is a must have feature. The problem I found though is that from the examples that use it, it was difficult to find proper source code that worked just how I wanted it.

The examples on the three.js website accomplish something close... The <a title="Three.js Trackball" href="http://threejs.org/examples/#webgl_geometry_tessellation" target="_blank">trackball</a> example seems to accomplish the smooth mouse tracking, but the only problem is that the camera tilts in all directions when navigating. I wanted a stable view plane while navigating. Other examples like <a title="particle floor example - three.js" href="http://threejs.org/examples/#canvas_particles_floor" target="_blank">this one</a> have the above, but would only rotate as far as the screen would allow the mouse to go hence you couldn't spin an object around. The Orbit Controls example has the right kind of navigation, but lacks the mouse momentum. Finally I decided to take <a title="three.js example - geometry shapes" href="http://threejs.org/examples/#webgl_geometry_shapes" target="_blank">this example </a>and tweak it a bit.

<pre>var container, stats;

var camera, scene, renderer;

var group, text, plane;

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var finalRotationY

init();
animate();

function init() {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        camera.position.z = 5;

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

        //alert('WORKING');

        material = new THREE.MeshPhongMaterial({map: texture});

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
        container.appendChild( stats.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

        //for debuging stats
        interval = setInterval( debugInfo, 50 );

}

function modelLoadedCallback(geometry) {

        mesh = new THREE.Mesh( geometry, material );
        group.add(mesh);
        scene.add( group );

}

function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseDown( event ) {

        event.preventDefault();

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDownX = targetRotationX;

        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDownY = targetRotationY;

}

function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
        targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;

}

function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;

                mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
                targetRotationOnMouseDownY = targetRotationY;

        }

}

function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;

                mouseY = event.touches[ 0 ].pageY - windowHalfY;
                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;

        }

}

//

function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

}

function render() {

     //horizontal rotation   
     group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.1;

     //vertical rotation 
     finalRotationY = (targetRotationY - group.rotation.x); 
//     group.rotation.x += finalRotationY * 0.05;

//     finalRotationY = (targetRotationY - group.rotation.x);  
    if (group.rotation.x  &lt;= 1 &amp;&amp; group.rotation.x &gt;= -1 ) {

        group.rotation.x += finalRotationY * 0.1;
        }
     if (group.rotation.x  &gt; 1 ) {

        group.rotation.x = 1
        }

     if (group.rotation.x  &lt; -1 ) {

        group.rotation.x = -1
        }

        renderer.render( scene, camera );

}

function debugInfo()
{
    $('#debug').html("mouseX : " + mouseX + "   mouseY : " + mouseY + "
")

}</pre>

From the three.js site example, I simply added Y Axis versions for everything regarding x axis rotation, then added limits on the Y axis rotation:

<pre>     //vertical rotation
     finalRotationY = (targetRotationY - group.rotation.x); 

    if (group.rotation.x &lt;= 1 &amp;&amp; group.rotation.x &gt;= -1) {

        group.rotation.x += finalRotationY * 0.1;
    }
    if (group.rotation.x &gt; 1) {

        group.rotation.x = 1
    }
    else if (group.rotation.x &lt; -1) {

        group.rotation.x = -1
    }</pre>

Download the <a title="Camera Orbit - files" href="{{site.baseurl}}/downloads/smooth-mouse-tracking.zip">full example files</a>
