---
layout: post
title: Unity3D vs. Three.js
date: 2015-12-06 11:50
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: unity3d-vs-threejs.jpg
excerpt: Why is this important knowledge? You may be looking into both options as whether you're planning to build online games, a plugin for your website, etc. Unity3D and three.js are certainly both great options that can accomplish similar things but definitely very different. I've fortunately been able to dip into both a bit. Hopefully you'll find this useful...
---
<p>
Why is this important knowledge? You may be looking into both options as whether you're planning to build online games, a plugin for your website, etc. Unity3D and three.js are certainly both great options that can accomplish similar things but definitely very different. I've fortunately been able to dip into both a bit. Hopefully you'll find this useful...</p>

<h2>Unity3D</h2>
<p>
Unity is a 2D/3D full out game engine with a complete visual editor/level designer, networking/multiplayer support, physics system, particle system, post effects GUI and more. Unity's strengths are it's productive workflow (to be able to build something pretty substantial quite quickly) and it powerful capabilities.</p>

<p>It has an easy to use and lean user interface and component system. It also takes care of most of the heavy lifting when dealing with game development. You could even potentially make working game without touching any code but that's not to say it's customization ability doesn't run deep and any commercial game would always take advantage of it.</p> 
<p>Having said that, when doing anything 3d there is a certain amount of functionality that you'll need to deal with at one time or another and having that available if you need it is a huge asset. That's why Unity is also a great tool for building 3d apps or visualizations as commercial game engines tend to be over prepared for doing anything 3d even if it's not a game.</p>
<h3>About Unity3D</h3>
<p>
Most of it's user base codes in C#. Here is a good indicator of the <a href="http://blogs.unity3d.com/2014/09/03/documentation-unity-scripting-languages-and-you/" target="_blank">percentage of languages to users</a>. Unity to date has been run on the browser as a plugin but as of Unity5 there is the added capability for deploying it as an html 5 webGL application. One may ask how this is accomplished if webGL is javascript based and Unity is built using C/C++ and runs off of other non webGL related scripting languages?</p>
<p>
It's an interesting process. Basically everything gets compiled into c++ then converted into javascript with a few other steps. This came to them with the help of someone at Mozilla. The results though are surprisingly good.</p>
<p>
Here is a good video that explains the background behind it:</p>

<iframe width="100%" src="https://www.youtube.com/embed/RCLpABm2R90" frameborder="0" allowfullscreen></iframe>
<p>
Some things to consider in terms of weaknesses may be that it may be overkill if you plan on just making an interactive 3d object on your website for example. In order to develop for it, Unity must be downloaded and installed along with Visual Studio (with the .net framework) or MonoDevelop.</p>
<p>
Also in terms of interacting with a web page, it is possible but you'd have to go through unity's exposed functions whereas three.js would easily have access to the DOM, other javascript on the page, etc.</p>
<h3>Additional information on Unity3D</h3>
<h4>Been around since</h4>
2005
<h4>Users</h4>
Unity is a full out gaming platform with nearly 2 million active users across the world.
<h4>Code base</h4>
Unity3D is scripted using C#, Unityscript (modified javascript) and Boo (a language I've never heard of until using Unity).
<h4>Support</h4>
Lots of online articles videos and documentation out there for this.
<h4>Usage</h4>
Unity3D is used mainly for games but can be used for 3d visualizations or web applications
<h4>Platforms</h4>
PC, Mobile (BlackBerry 10, Windows Phone 8, Windows, OS X, Android, iOS), Web (via plugin or webGL),
Consoles (PlayStation 3 &amp; 4, PlayStation Vita, Xbox 360 &amp; One, Wii U, Nintendo 3DS and Wii)
<h4>Cost</h4>
personal addition is free, pro version starts at $75/month
<h2>Three.js</h2>
Three.js is a javascript based webGL framework that runs right from the browser and integrates well into existing website code.

I'd say it's more of a framework than an engine. It handles things like mouse events, shadows, rendering, post effects, vertex processing, shaders, etc. and takes car of most of the "hard stuff" involved in webGL programming. You can make something like a 3d product configuration site without having to worry a lot about the two things that have slowed down 3d for the web in the past: browser support without a plugin and hardware acceleration. It really shines as a lightweight library that can bring some powerful real time 3d effects to web pages.

Food for thought... It was first developed in ActionScript then ported to JavaScript in 2009. Initial development consisted of Ricardo Cabello,?Branislav Ulicny and? Joshua Koo. There are now over 390 contributors.

This video by Jaume Sanchez Elias at JSConf Budapest 2015 has some great examples of it's capabilities:

<iframe width="100%" src="https://www.youtube.com/embed/HwkGTYRopYg" frameborder="0" allowfullscreen></iframe>
<p>
Downsides? I'd say that since it's still has somewhat early in development and it's open source, is still some work to be done in terms of documentation and code base.</p>
<p>
The framework it's self is changing rapidly and because of that, it can be difficult to commit to building anything really major on it until the the code reaches more of a consistency in terms of what to expect. There are already a lot of engines built on-top of the framework but since it's changed so much, they've tended to branch it off in their own direction somewhat. Also, since it's not really a full fledged engine there's nothing but a limited editor at the moment to work with so making something like a AAA game using just three.js without an engine would be quite a challenge.</p>
<h3>Additional information on Three.JS</h3>
<h4>Been around since</h4>
2010
<h4>Users</h4>
Three.js is gaining traction. It's much newer than Unity but and there are no statistics that I know of stating the amount of users, but I'm guessing it's somewhere in the thousands.
<h4>Code base</h4>
Javascript. But there is an interesting optional layer called <a href="https://jeromeetienne.github.io/tquery/">tQuery </a>for those who would like to use a jQuery style workflow
<h4>Support</h4>
Not as good. Again, it's gaining traction in terms of blog articles, book and videos, but the official documentation still needs a bit of work.
<h4>Usage</h4>
Any web browser that can run webGL (almost all browsers as of this time). It's designed for the web so it wouldn't be something that's downloaded an installed as an app or PC game for example
<h4>Cost</h4>
open source! (MIT License)

Hope that helps. They really are both great platforms from my experience. It all depends on your needs. I'd say for lack of a better example, you could think of Unity as a train and three.js as a car. Unity is bigger and heavier but once it get's going, it can carry a lot. Three.js is less equipped, but is convenient and easy to get in and out of.

For more tutorials on getting started in three.js you can find some tutorials <a href="{{site.baseurl}}/categories/three-js/">here</a>.
