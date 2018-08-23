---
layout: post
title: Importing a Model Into Three.js
date: 2014-05-22 13:29
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: importing-a-model-545x545.jpg
excerpt: We'll be using Blender (currently version 2.70 at the time of this writing) as our go-to 3d program for our lessons. The best part about it is that it's free. If you haven't used it before, there are countless online tutorials on the web to get you started. The main thing is though to get your model from a 3d modelling program into a format that three.js can use...
---
<iframe class="scene-frame" src="{{site.baseurl}}/demos/lesson02/scene.html" width="100%" height="480" frameborder="0" ></iframe>

For this lesson we'll be exporting the default blender cube into a three.js scene. Nothing fancy, but enought for you to get the idea.
We'll be using Blender (currently version 2.70 at the time of this writing) as our go-to 3d program for our lessons. The best part about it is that it's free. If you haven't used it before, there are countless online tutorials on the web to get you started. The main thing is though to get your model from a 3d modelling program into a format that three.js can use...

<h3>step 1 - Obtaining the plugin</h3>

The blender exporter is available within the downloaded three.js folder. If you have not yet downloaded three.js you can do so <a title="three.js download" href="http://github.com/mrdoob/three.js/zipball/master" target="_blank">here</a>.
You will find plugins for 3DS Max, Maya and Blender in it's exporters folder but we'll be using the one for Blender. Optionally you can view the latest version of this plugin on Github:
<a title="Blender three.js exporter" href="https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender" target="_blank">Blender Exporter</a>

To copy it from the downloaded three.js folder, copy io_mesh_threejs folder located in:
utils &gt; exporters &gt; blender &gt; 2.65 &gt; scripts &gt; addons
and paste in on your desktop for now.

<h3>step 2 - Installing it in Blender</h3>

Next we need to past it into the Blender plugins folder...

Windows:
C:\Users\USERNAME\AppData\Roaming\Blender Foundation\Blender\2.6X\scripts\addons

OSX:
/Applications/Blender/blender.app/Contents/MacOS/2.6X/scripts/addons

Linux:
/home/USERNAME/.config/blender/2.6X/scripts/addons

For Ubuntu users who installed Blender 2.68 via apt-get, this is the location:
/usr/lib/blender/scripts/addons

if the path doesn't exist, just create it. Personally there was no scripts/addons folder in my Blender installation so it needed creating.

<h3>step 3 - Activate the plugin</h3>

Next, we need to open Blender and activate the plugin.
Go to File &gt; User Preferences.
Scroll to the bottom of the window and check "Import-Export:three.js format" then Save User Settings.

<a href="{{site.baseurl}}/images/blog/import-export-threejs-format.jpg"><img class="alignnone size-full wp-image-57" src="{{site.baseurl}}/images/blog/import-export-threejs-format.jpg" alt="Import-export Threejs-format" width="812" height="518" /></a>

That's it for installation!

<h3>step 4 - Exporting the mesh</h3>

Presuming you haven't deleted the default Blender cube, we can now just go to to File&gt;Export &gt; Three.js to export our mesh from Blender to three.js!

Now if you open the exported file from your computer (you can open it with notepad or any javascript editor), you'll see it can come out as a tidy, easy to read <a title="What is Json" href="http://en.wikipedia.org/wiki/JSON">JSON </a>object.

&nbsp;

<pre>
"metadata" :
{
"formatVersion" : 3.1,
"generatedBy" : "Blender 2.65 Exporter",
"vertices" : 8,
"faces" : 6,
"normals" : 8,
"colors" : 0,
"uvs" : [],
"materials" : 1,
"morphTargets"? : 0,
"bones" : 0
},

"scale" : 1.000000,

"materials" : [{
"DbgColor" : 15658734,
"DbgIndex" : 0,
"DbgName" : "Material",
"blending" : "NormalBlending",
"colorAmbient" : [0.6400000190734865, 0.6400000190734865, 0.6400000190734865],
"colorDiffuse" : [0.6400000190734865, 0.6400000190734865, 0.6400000190734865],
"colorSpecular" : [0.5, 0.5, 0.5],
"depthTest" : true,
"depthWrite" : true,
"shading" : "Lambert",
"specularCoef" : 50,
"transparency" : 1.0,
"transparent" : false,
"vertexColors" : false
}],

"vertices" : [1,-1,-1,1,-1,1,-1,-1,1,-1,-1,-1,1,1,-1,0.999999,1,1,-1,1,1,-1,1,-1],
"morphTargets" : [],
"normals" : [0.577349,-0.577349,-0.577349,0.577349,-0.577349,0.577349,-0.577349,-0.577349,
0.577349,-0.577349,-0.577349,-0.577349,0.577349,0.577349,-0.577349,-0.577349,0.577349,
-0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,0.577349],
"colors" : [],
"uvs" : [],
"faces" : [35,0,1,2,3,0,0,1,2,3,35,4,7,6,5,0,4,5,6,7,35,0,4,5,1,0,0,4,7,1,35,1,5,6,2,0,1,7,
6,2,35,2,6,7,3,0,2,6,5,3,35,4,0,3,7,0,4,0,3,5],
"bones" : [],
"skinIndices" : [],
"skinWeights" : [],
"animations" : []

}
</pre>

<h3>step 5 - Importing into Three.js</h3>

We will use the scene we created in the previous lesson: <a title="Creating a Baisc Scene in Three.js" href="{{site.baseurl}}/creating-basic-scene-three-js/">Creating a Baisc Scene</a> and modifying it slightly to enable us to import our new geometry. We add a new folder called models and within it name the file that we exported from blender: cube.js
Our HTML file will be the same but scene.js will have a couple of new additions:

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

}</pre>

As you can see, THREE.JSONLoader() will reference the models/cube.js file and trigger the callback function modelLoadedCallback.
We need to create the mesh and add geometry to it there because the geometry is loaded asynchronously (in the background) and there is no way to tell when it will finish loading so it must be done in the callback function. Again, we use a group as mentioned in the <a title="Creating a Baisc Scene in Three.js" href="{{site.baseurl}}/creating-basic-scene-three-js/">previous lesson</a> in case we later want to add more meshes to the scene and control them together as one unit.

As you can see, three.js takes care of all the webGL dirtywork under the hood, and you should be able to see your Blender-exported cube rotating in the viewport.

Download the full example files:
<a title="Lesson 2: Importing a Model - files" href="{{site.baseurl}}/downloads/lesson02.zip">Lesson 2: files</a>
See the previous lesson:
<a title="Creating a Baisc Scene in Three.js" href="{{site.baseurl}}/creating-basic-scene-three-js/">Creating a Baisc Scene</a>
