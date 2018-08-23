---
layout: post
title: Trackball Controls in three.js
date: 2015-03-24 12:12
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: trackball-controls-three-jsl.jpg
---
This tutorial explains how to rotate the camera with the mouse in three.js. This can be accomplished using the built-in TrackballControls.js. Test it out on the below. Rotating the object around by holding down the left mouse button and dragging. Zoom with the middle and pan from side to side with the right mouse button. <a title="trackball controlls code example for three.js" href="{{site.baseurl}}/downloads/trackball-controls.zip">Download the source code for this tutorial</a>.

This example rotates the camera around the object in all directions, to take a look at a different kind of mouse tracking technique where the mouse rotates the scene on a view plane please see <a title="Scene Rotation in Three.js" href="{{site.baseurl}}/rotate-view-mouse-three-js/">Rotating View with the Mouse in Three.js</a> or the<a title="Smooth Mouse Rotation in Three.js" href="{{site.baseurl}}/smooth-mouse-rotation-three-js/"> Smooth Camera Rotation</a> example.

<iframe class="scene-frame" src="{{site.baseurl}}/demos/trackball-controls/scene.html" width="100%" height="400" frameborder="0" ></iframe>

If you've downloaded the example files from the <a title="three.js website" href="http://threejs.org/" target="_blank">three.js website</a>, you can find TrackballControls.js in: examples&gt;js&gt;controls.

<h3>Include the file</h3>

Start by including?TrackballControls.js in your html file:

<pre class="lang:default decode:true">&lt;script src="js/controls/OnepixMouseTracking.js"&gt;&lt;/script&gt;</pre>

&nbsp;

<h3>Set Up the Camera</h3>

Set up your camera in the usual way.? You may have to tweak this according to the size of your model. In this example, the camera is moved 3 units closer to the object.

<pre class="lang:default decode:true">camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.z = 5;</pre>

&nbsp;

<h3>Add the Camera Controls</h3>

Make a new instance of THREE.TrackballControls which will automatically bind the mousedown button controls to the camera rotation, pan and zoom.

<pre class="lang:default decode:true">cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
cameraControls.target.set(0, 0, 0);</pre>

make sure cameraControls is defined at the top of your document

<pre class="lang:default decode:true">var cameraControls</pre>

&nbsp;

<h3>Update the Camera Controls</h3>

You should have a function called "update" or "animate". This will be the function that is called repeatedly to perform task like animation or what we're doing.? The only thing we're concerned about here is the cameraControls.update function. Simply call it and add the delta (difference in time between one update call and another).

<pre class="lang:default decode:true">function animate() {

var delta = clock.getDelta();
requestAnimationFrame(animate);
cameraControls.update(delta);
renderer.render(scene, camera);
stats.update();

}</pre>

if you're wondering where the clock variable is from, you can call it at the top of your file like this which is a timer built into three.js.

<pre class="lang:default decode:true">var clock = new THREE.Clock();</pre>

&nbsp;

That's it! If all went well you should be able to rotate the object around by holding down the left mouse button and dragging. Zoom with the middle mouse button and pan with the right mouse button.
