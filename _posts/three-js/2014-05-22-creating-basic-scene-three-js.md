---
layout: post
title: Creating a Basic Scene in Three.js
date: 2014-05-22 13:20
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: basic-3d-three-js-545x545.jpg
excerpt: Here we will create a basic scene complete with an animated transparent cube in three.js. Though most beginner examples on the net show scenes loaded right from an HTML page, we'll set it up using an external file as it's generally good practice to keep your .js files separate when dealing with any kind of code that may become more than a few lines now or in the future.
---

<iframe class="scene-frame" src="{{site.baseurl}}/demos/lesson01/scene.html" width="100%" height="480" frameborder="0" ></iframe>

Here we will create a basic scene complete with an animated transparent cube in three.js.
Though most beginner examples on the net show scenes loaded right from an HTML page, we'll set it up using an external file as it's generally good practice to keep your .js files separate when dealing with any kind of code that may become more than a few lines now or in the future.

Create an HTML page like so:

<style><!-- canvas { width: 100%; height: 100% } --></style>
<div id="viewport"></div>
Make sure to include the Three.js script tag just before the closing body tag in your html page.
Next, create a folder called "js" and within it create a file named "scene". I'll show you the steps below, then the full code.
First we define our variables:
<pre>var scene, camera, renderer, geometry, material, cube, group;</pre>
We will then call just two functions; init and render. Init will set up our scene and render is a function that triggers its self repeatedly in order for an animation to take place.
<pre>init();
render();</pre>
Within the init function, we'll create a scene to add our object(s) to. Next a camera is created.
THREE.PerspectiveCamra accepts 4 parameters: field of view, aspect ratio, near and far clipping planes. Field of view defines the area that is visible (can create a kind of fish-eye effect as more objects come into visibility and orthographic effect for less). The aspect ratio is the rectangular proportions for the output (stretched, squashed or square). The clipping planes define what distance the camera will decide to start rendering an object and stop rendering it. For example, a far "near" clipping plane won't render close objects and a near "far" plane won't render far ones. We then set it's z position so we can back away from the origin (center) of the scene enabling the camera to view the cube.
<pre>function init() {

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

}</pre>
Next a WebGLRenderer is created (this is the preferred type but three.js will fall back on other types if incompatible). By setting it to have an alpha we can give the scene a transparent background. We then set the dimensions (usually window.innerWidth and window.innerHeight).
Lastly, an element is explicitly set to hold our html canvas where the scene is drawn.
<pre>    //set background to have transparency - alpha: true
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("viewport").appendChild(renderer.domElement);</pre>
We then create some geometry (with 3 parameters for x,y,z to indicate size) and a basic black wireframe material. Once that's created we need to assign it to a new THREE.Mesh that combines the geometry and material. Then it can be added to the scene via a new THREE.Object3D() group.
Why do we need this extra step? Well, we could just go ahead and add the cube to the scene directly, but using groups allows you to control multiple objects at once if the need arises.
<pre>    geometry = new THREE.CubeGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 'black'
    });
    cube = new THREE.Mesh(geometry, material);
//    scene.add(cube);

    group = new THREE.Object3D();
    group.add(cube);
    scene.add( group );</pre>
That's it for init. Now we'll take a look at the render function.
<pre> 
function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}</pre>
First the requestAnimationFrame is immediately called.
We put the name of the render function set as it's parameter so as to tell it to call this function repeatedly. It's like calling javascript's "setInterval" only it's better managed to handle switching tabs and keeping a consistent animation speed no matter what speed your computer/connection is at. Lastly we add an x and y rotation and render away.

Below is the full code for scene.js
<pre>var scene, camera, renderer, geometry, material, cube, group;

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

}</pre>
That's pretty much it!

Download the full example files:
<a title="Lesson 1: Creating a Basic Scene - files" href="{{site.baseurl}}/wp-content/uploads/2014/05/lesson01.zip">Lesson 1: files</a>

See the previous post:
<a title="Introduction to Three.js" href="{{site.baseurl}}/introduction-three-js/">Introduction to Three.js</a>

Next Lesson:
<a title="Lesson2 - Importing a Model into Three.js" href="{{site.baseurl}}/lesson-2-importing-model/">Lesson 2: Importing a Model</a>
