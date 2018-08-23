---
layout: post
title: Loading Screen in Three.js
date: 2015-03-17 12:14
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: loading-animation-in-three-js.jpg
---
<a href="{{site.baseurl}}/images/blog/three-js-loading-icon.jpg"><img class=" wp-image-384 alignright" src="{{site.baseurl}}/images/blog/three-js-loading-icon.jpg" alt="Three.js Loading Icon" width="204" height="165" /></a>For this tutorial, we'll be creating a Loading Screen in Three.js using the <a title="html5 Heartcode Canvasloader" href="http://heartcode.robertpataki.com/canvasloader/" target="_blank">html5 Heartcode Canvasloader</a> for our loading icon and the three.js <a title="three.js LoadingManager" href="http://threejs.org/docs/#Reference/Loaders/LoadingManager" target="_blank">LoadingManager</a> to tell it when to appear.

If you're new to Three.js please see <a title="Creating a Basic Scene in Three.js" href="{{site.baseurl}}/creating-basic-scene-three-js/">Creating a Basic Scene in Three.js</a>

<!--more-->

Imagine, you'd like to set up an animation using a loading icon or countdown and you'd like it to start when the document is ready but finish only after all assets have successfully loaded. Without knowing when each asset is complete and how many assets you plan to keep track of, you'd have to do a bit of tool building.

However, the LoadingManager is a handy function built into three.js that does just what we need. It tracks the progress, errors and completion of all loaded assets that are hooked to it. To see it in use, view the console log of this <a title="three.js example of using LoadingManager." href="http://threejs.org/examples/#webgl_loader_obj" target="_blank">example</a> on the three.js website.

One small drawback... As of this writing,?LoadingManager only works with the ?OBJLoader? and ImageLoader. JSONLoader and? ImageUtils.loadTexture should really be using LoadingManager as well but peraps that may be implemented later.

That being said, you can still using this tutorial to accomplish the same task using the callback events of whatever loaders you use.

&nbsp;

<h3>Calling the THREE.LoadingManager</h3>

<pre class="lang:default decode:true" title="LoadingManager in three.js">    
//initialize the manager to handle all loaded events (currently just works for OBJ and image files)
manager = new THREE.LoadingManager();

manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};
manager.onLoad = function () {
    console.log('all items loaded');
};
manager.onError = function () {
    console.log('there has been an error');
};
    </pre>

&nbsp;

LoadingManager has three events:?onProgress,?onLoad, and?onError. The names are self explanatory. One thing to note is that onProgress has three arguments:

<ul>
    <li>item (the url of the item just loaded)</li>
    <li>loaded (the amount of items that have been loaded)</li>
    <li>total (the total amount items that need to be loaded)</li>
</ul>

these would be handy for displaying loaded and loading progress to the front end.

&nbsp;

<h3>Using LoadManager in THREE.OBJLoader</h3>

Now we just need to hook it into our model loader

<pre class="lang:default decode:true" title="using THREE.OBJLoader">
material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

var loader = new THREE.OBJLoader(manager);

loader.load(path, function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }

    });

    scene.add(object);
</pre>

Here we've created a material, created a new OBJLoader and passed the manager into it as a parameter.? Passing this in is all we need to do to connect the manager to the OBJ model Loader. All it's events will now be automatically recorded by the manager. See an example post of <a title="Importing a Model Into Three.js" href="{{site.baseurl}}/importing-model-three-js/">Importing a Model Into Three.js</a>

Make sure you've included this script to allow for OBJ importing if you haven't done so already. Should look something like the below

<pre class="lang:default decode:true">&lt;script src="js/loaders/OBJLoader.js"&gt;&lt;/script&gt;</pre>

At this point, the main functionally is established all you need is an animated icon to represent what we've set up.

<h3></h3>

<h3>The Loading Animation</h3>

There are many ways to accomplish this, but I find HeartCode has a nice smooth effect and it uses html 5 rather than sometimes choppy animated gifs. You can check it out it <a title="Heartcode CanvasLoader" href="http://heartcode.robertpataki.com/canvasloader/" target="_blank">here</a>

First we need to include this script:

<pre class="lang:default decode:true" title="CanvasLoader">&lt;script src="http://heartcode-canvasloader.googlecode.com/files/heartcode-canvasloader-min-0.9.1.js"&gt;&lt;/script&gt;</pre>

Make sure you've included jquery in your project, then paste this into the main js file.

<pre class="lang:default decode:true" title="HeartCode Canvas Loader">    
//to display loading animation before it's ready

$(document).ready(function () {
    if ($('.loading-container').length) {

        // to show loading animation
        $imgloader = $('.loading-container');
        $loadingimg = $('&lt;div id="canvasloader-container" class="onepix-imgloader"&gt;&lt;/div&gt;');

        // $loadingimg.attr("src","images/flexslider/loading.gif");
        $imgloader.prepend($loadingimg);

        // canvasloader code
        var cl = new CanvasLoader('canvasloader-container');
        cl.setColor('#4f4f4f'); // default is '#000000'
        cl.setDiameter(45); // default is 40
        cl.setDensity(75); // default is 40
        cl.setRange(0.7); // default is 1.3
        cl.setSpeed(3); // default is 2
        cl.setFPS(22); // default is 24
        cl.show(); // Hidden by default

    }

});
</pre>

Basically what this does is add the loading animation to anything that is wrapped in the element with the loading-container class. It does so by checking if it has an element nested within it (in our case this will be the canvas) and if so, it appends the CanvasLoader to a new containing div that we absolutely position over the contained canvas. Until we turn this off, the animation will just keep playing.

<h3></h3>

<h3>The CSS</h3>

<pre class="lang:default decode:true" title="CanvasLoader CSS">
.onepix-imgloader {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
}

/*hide the second element in the loading container (first element is the leading img)*/
.loading-container &gt; *:not(.onepix-imgloader) {
    filter:alpha(opacity=0);
    -moz-opacity:0;
    -khtml-opacity:0;
    opacity:0;
}

.loading-container {
    position: relative;
    background: #dfdfdf;
    min-height: 40px;
    height: 400px;
}

#container {
/*    min-width: 400px;*/
    min-height: 400px;
}</pre>

<h3></h3>

<h3>The HTML</h3>

<pre class="lang:default decode:true">&lt;div class = "loading-container"&gt;
    &lt;div id="container"&gt;                     
    &lt;/div&gt;
&lt;/div&gt;</pre>

<h3></h3>

<h3>Tying It Together</h3>

Now go back to your js code and change the manager.onLoad code to call a new function

<pre class="lang:default decode:true">manager.onLoad = function () {
    console.log('all items loaded');
    allItemsLoaded();
};</pre>

Now paste in the function to fade out our loading animation when it's called.

<pre class="lang:default decode:true" title="All Items Loaded function to fade out Loading Animation">function allItemsLoaded() {
    $('.onepix-imgloader').fadeOut();
    // fade in content (using opacity instead of fadein() so it retains it's height.
    $('.loading-container &gt; *:not(.onepix-imgloader)').fadeTo(8000, 100);
}</pre>

&nbsp;

If all is well, there should be a loading animation that fades away when your .obj is loaded. You may have to tweak this to suit your project, but that's the baisc idea. Also, you can use this for images or textures for example:

<pre class="lang:default decode:true" title="Loading Textures using LoadingManager">
var texture = new THREE.Texture();

var loader = new THREE.ImageLoader( manager );
loader.load( 'textures/my-texture.jpg', function ( image ) {
    texture.image = image;
    texture.needsUpdate = true;
} );
</pre>

More information on <a title="Importing Textures Into Three.js" href="{{site.baseurl}}/importing-textures-three-js/">loading textures in Three.js</a>

That's it! Bye for now!
