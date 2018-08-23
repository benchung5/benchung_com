---
layout: post
title: Vertex Colors in Three.js
date: 2015-08-23 12:27
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: vertex-colors-in-threejs.jpg
excerpt: Vertex colors in three.js can be easily achieved using the built in geometry.vertices.push function and the THREE.VertexColors attribute when setting up a custom GLSL shader ...
---
<a href="{{site.baseurl}}/images/blog/vertex-colors-threjs.jpg"><img class="alignnone wp-image-355" src="{{site.baseurl}}/images/blog/vertex-colors-threjs.jpg" alt="Vertex Colors in Three.js" width="750" height="278" /></a>

Vertex colors in three.js can be easily achieved using the built in geometry.vertices.push function and the THREE.VertexColors attribute when setting up a custom GLSL shader:

First, draw the geometry:<!--more-->

<pre><code class="javascript">var geometry = new THREE.Geometry();
 geometry.vertices.push(
       new THREE.Vector3(0, 0, 0),
       new THREE.Vector3(-2, -2, 0),
       new THREE.Vector3(2, -2, 0));

geometry.faces.push(new THREE.Face3(0, 1, 2));

geometry.faces[0].vertexColors[0] = new THREE.Color("rgb(255,0,0)");
geometry.faces[0].vertexColors[1] = new THREE.Color("rgb(0,255,0)");
geometry.faces[0].vertexColors[2] = new THREE.Color("rgb(0,0,255)");
</code></pre>

This makes three points facing the camera (distance may vary depending on how your camera is set up). Then assigns a color to each one using THREE.Color

Next, create a custom shader ( if you need to know more about custom shaders basics see <a title="Basic GLSL Displacement Shader in Three.js" href="{{site.baseurl}}/basic-glsl-displacement-shader-three-js/">Basic GLSL Displacement Shader in Three.js</a>? ) and load it with some attributes before adding the geometry to the scene:

<pre><code class="javascript">var shader = THREE.VertexColorShader;

var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

var parameters = {
    //this activates the 'colors' attribute (uses vertex colors stored in the created geometry)
    vertexColors: THREE.VertexColors,
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    side: THREE.DoubleSide,
    uniforms: uniforms};
material = new THREE.ShaderMaterial(parameters);

mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 1;
scene.add(mesh);
</code></pre>

note the vertexColors parameter. This is built into three.js and specifies how the vertices will be rendered. If we set it to THREE.VertexColors then we can use the "color" attribute in the GLSL shader to access the colors already assigned to the vertices.

..and the shader

<pre><code class="javascript">THREE.VertexColorShader = {

    uniforms: {
    },
    vertexShader: [
        "varying vec3 vColor;",
        "void main() {",
        "vColor = color;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
    ].join("\n"),
    fragmentShader: [
        "varying vec3 vColor;",
        "void main( void ) {",
        "gl_FragColor = vec4( vColor.rgb, 1. );",
        "}"
    ].join("\n")
};
</code></pre>

As mentioned, the color attribute is used. We copy it into vColor, then pass it to the fragment shader to blend?(interpolate) it across each vertex.

&nbsp;