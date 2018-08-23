---
layout: post
title: Introduction to Three.js
date: 2014-05-03 13:32
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: introduction-to-three-js-545x545.jpg
---
<h3>Common problems with 3d for the web</h3>
I've always been interested in bringing 3d to the web which has been available in various ways, but there's never really been any standard as to how it would be accomplished. I've found the result has been a mix of third party plugins, Java, WEB3D, VRML, faking 3d through a 2d engine or some heavily layered JavaScript.

Some of these attempts have worked out reasonably well, but there are a few things that just kept rubbing me the wrong way about them:

1. 2d engines will never be true 3d
2. without leveraging one's graphics card you can only go so far
3. most people want to use a language that has multiple purposes
4. downloading plugins isn't fun fun for the end user
5. cross browser support is important for anything on the web
6. Sticking to tools that use Web standards is generally safe ground

All of these factors have caused some disappointing roadblocks in the past.
That is until the recent rise of web3D, and engines that leverage it's power.
<h3>Why Three.js</h3>
I stumbled across three.js while trying to find out if there have been any enhancement towards 3d for the web through HTML5. To my amazement, it just happened to eliminate all the above roadblocks that kept me from pursuing this area in the past.

Three.js introduces these advantages:

1. a true 3d engine
2. harnesses the power of the graphics card
3. based on the ever standard JavaScript
4. no plugins needed
5. cross browser support
6. based off of the widely supported WebGL and HTML5

We can now use the browser to run powerful 3d games or interactive visualization applications. I truly believe this can really attract and engage a user's experience for many niche industries.
<h3>The purpose of this series</h3>
This series is aimed at educating as well as providing a place for the three.js artist/developer community to share insights.
To understand the tutorials better, it would be helpful to be comfortable with javascript and know a little about 3d. Knowledge of Open GL, GLSL would be a plus, but not required right away.
If it helps any, my previous experience comes more from 3d modelling, web development and the Microsoft branded XNA and HLSL. So I'll be learning quite a bit as I go. Also, feel free to comment if you know of a better way to get something done.
<h3>Let's get started</h3>
<a title="Creating a Scene in Three.js" href="{{site.baseurl}}/lesson-2-creating-baisc-scene/">Lesson 1: Creating a Basic Scene</a>
