---
layout: post
title: Using the Three.js Editor
date: 2015-01-28 12:52
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: using-three-js-editorr-545x545.jpg
---
Here are some basics about using the the three.js editor. If you haven't seen it in action, you can do so <a title="Three.js Editor" href="http://threejs.org/editor/" target="_blank">here</a>.

I couldn't find any real documentation online about it so figured I'd post about I've found from it... The editor comes packaged along with the <a title="Three.js source code" href="https://github.com/mrdoob/three.js" target="_blank">three.js source code</a>. Let's download that and open index.html (in the "editor" folder).

<a href="{{site.baseurl}}/images/blog/three-js-editor.jpg"><img class="alignnone size-large wp-image-279" src="{{site.baseurl}}/images/blog/three-js-editor-1024x514.jpg" alt="Three.js Editor screen" width="750" height="376" /></a>

The interface is pretty straight forward. Starting from the top-left menu, you can import and export scenes or individual models in a variety of formats, clone, add basic geometry, cameras and lights.

The "add &gt; group" menu item allows you to add an empty group scene node that you can parent items to. Try adding a couple shapes to the scene, then parenting them to the group in the scene graph.

<a href="{{site.baseurl}}/images/blog/grouping-objects.jpg"><img class="alignnone wp-image-280" src="{{site.baseurl}}/images/blog/grouping-objects-1024x514.jpg" alt="Grouping objects in three.js editor" width="750" height="376" /></a>

Next down in the top left menu is the play button. If you press it, you'll probably see a black screen. Press "stop" go back to normal view. This is because there needs to be a scene with some scripting in order for there to be something to play.? Go the the next item "examples" and pick one from the drop down list then press play and see what happens. Press stop and for now lets stick with the "camera" example. We'll come back to scripted scenes in a bit.

Select any object and notice the object properties appear on the right side. You can also manipulate the objects in different ways through basic settings on the bottom left.

<a href="{{site.baseurl}}/images/blog/object-properties.jpg"><img class="alignnone size-large wp-image-281" src="{{site.baseurl}}/images/blog/object-properties-1024x514.jpg" alt="Object Properties in Three.js Editor" width="750" height="376" /></a>

You've probably already figured out all of this on your own, but what about making some cool animated scenes like the ones from the drop-down menu? For that, we'll need to apply scripts to selected objects then publish the scene and optionally load it back in to view it.
<h3>1. Add objects</h3>
File&gt;New&gt;okay

Add two point lights, a torus and a perspective camera. Position them roughly like the below example
<h3></h3>
<a href="{{site.baseurl}}/images/blog/editor-example-setup.jpg"><img class="alignnone size-large wp-image-282" src="{{site.baseurl}}/images/blog/editor-example-setup-1024x514.jpg" alt="Our editor example setup" width="750" height="376" /></a>
<h3>2. Script</h3>
select the perspective camera through the scene graph, click script&gt;edit

<a href="{{site.baseurl}}/images/blog/scripting.jpg"><img class="alignnone size-large wp-image-283" src="{{site.baseurl}}/images/blog/scripting-1024x514.jpg" alt="adding script in the three.js editor" width="750" height="376" /></a>

here is the code to paste in
<pre class="lang:default decode:true">player.setCamera( this );
function update( event ) {
var time = event.time * 0.001;
this.position.x = Math.sin( time ) * 400;
this.position.z = Math.cos( time ) * 400;
this.lookAt( scene.position );
}</pre>
Then repeat for the torus using this script
<pre class="lang:default decode:true">function update( event ) {
this.rotation.z += 0.1;
}</pre>
Press play, and you should see something like this. (Torus spinning while camera rotates around it).
<h3><a href="{{site.baseurl}}/images/blog/play-scene.jpg"><img class="alignnone size-large wp-image-284" src="{{site.baseurl}}/images/blog/play-scene.jpg" alt="Playing a scene in three.js editor" width="750" height="377" /></a></h3>
<h3>3. Publish</h3>
File&gt;Publish (File&gt;Export Scene doesn't seem to export the scripts)

You'll notice that it creates a zipped file containing:
<ul>
 	<li>app.json (the exported data from our scene)</li>
 	<li>index.html (the page that will play our exported scene)</li>
 	<li>a js folder containing app.js (the player logic) and three.min.js (I didn't export this file for me so I had to copy it from the latest build manually)</li>
</ul>
open index.html in your browser to preview the exported scene. Again, if you see nothing, make sure to include a copy of three.min.js in your js folder.

&nbsp;
<h3>Example Files</h3>
As a side note, you'll notice the scripts we wrote for the scene objects at the bottom of the exported app.json file. If you'd like to see more scripting examples, go back to your editor files you initially downloaded and look in the editor&gt;examples directory. At the bottom of the app.json files you can copy the scripts to test them out. Just be sure to remove the formatting, as in the "\n" and "\nt".

<a href="{{site.baseurl}}/images/blog/json-file.jpg"><img class="alignnone size-full wp-image-285" src="{{site.baseurl}}/images/blog/json-file.jpg" alt="three.js editor app json file" width="976" height="238" /></a>

you can also load an editor scene into your three.js project via THREE.SceneLoader().

There's a complete example of?<a title="Loading a Scene file in Three.js" href="http://threejs.org/examples/#webgl_loader_scene" target="_blank">Loading a Scene file</a> into a? project in the three.js download files called webgl_loader_scene.html.

The editor is still quit mysterious but I'm excited about what it will be in years to come. For now, hope this helps you out a little!

If you'd rather not to the editor route, you can always simply <a title="Importing a Model Into Three.js" href="{{site.baseurl}}/importing-model-three-js/">load objects into Three.js directly</a>.
