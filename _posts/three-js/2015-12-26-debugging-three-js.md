---
layout: post
title: Debugging Three.js
date: 2015-12-26 00:51
author: Ben Chung
comments: true
category: three-js
category_name: Three.js
thumbnail: debugging-three-jsl.jpg
---
If you're in the stages of creating a webGL game or app using three.js you may find it useful to visualize what your code is doing. That's where the need for a debugger/inspector comes into play. Here are a few ways to do it.

<h2>Using a Custom UI to Debug Three.js</h2>

You can use JQuery to a certain extent alongside three.js. to create things like ui elements. Having said that, you can't interact directly with three.js using jQuery unless you're using something like <a href="https://www.google.ca/#q=jquery+in+three.js">TQuery.</a> In our case we just use jQuery interact with the ui elements because you may want to debug in a way that the stats object (next) doesn't offer.

The below code ceates a debuginfo object and prints it out.
<code title="Debugging three.js with jQuery">var stats;

var debuginfo = {
    'Mouse': {
        'mouseX': '',
        'mouseY': '',
        'targetRotationX': '',
        'targetRotationY': ''
    },
    'Models': {},
    'Textures': {}
}

function initDebug() {

<pre><code>//print your list of debug items in html
$('#debug').html(printDebugInfo(debuginfo));
</code></pre>

}

function printDebugInfo(obj) {

<pre><code>var str = '';
$.each(obj, function (key, value) {
    str += "
&lt;div class="sidebar-widget"&gt;
&lt;h3&gt;" + key + "&lt;/h3&gt;
&lt;div id="&amp;quot; + key.toLowerCase() + &amp;quot;"&gt;"; $.each(value, function (key, value) { str += key + ": " + '&lt;span id=" + key + "&gt;' + value + '&lt;/span&gt; '; }); str += "&lt;/div&gt;
&lt;/div&gt;
"; }); return str; }
</code></pre>

</code>

<h2>Using the stats object</h2>

Three.js has a built-in "stats" object that you can use for monitoring memory usage

<a href="{{site.baseurl}}/images/blog/three-js-stats1.png" rel="attachment wp-att-560"><img class="alignleft wp-image-560 size-full" src="{{site.baseurl}}/images/blog/three-js-stats1.png" alt="three-js-stats1" width="80" height="48" /></a>

<a href="{{site.baseurl}}/images/blog/three-js-stats2.png" rel="attachment wp-att-561"><img class="alignleft wp-image-561 size-large" src="{{site.baseurl}}/images/blog/three-js-stats2.png" alt="three-js-stats2" width="80" height="48" /></a>

<a href="{{site.baseurl}}/images/blog/three-js-stats3.png" rel="attachment wp-att-562"><img class="alignleft wp-image-562 size-full" src="{{site.baseurl}}/images/blog/three-js-stats3.png" alt="three-js-stats3" width="80" height="48" /></a>

<div class="clear"></div>

<h6>Here's how to initialize it</h6>

<pre class="lang:default decode:true" title="Debugging three.js with the stats object">function initDebug() {

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.getElementById('stats').appendChild(stats.domElement);

    //for debuging stats (update is a bit less frequent than using the update function)
    interval = setInterval(updateDebugInfo, 50);
}
</pre>

Then just update it every frame when you call your render loop

<pre class="lang:default decode:true" title="stats update call">stats.update(renderer);
</pre>

<h2>Three.js Inspector</h2>

You can also try debugging directly from the browser. Check out this nifty plugin for Chrome by by Jerome Etienne called <a href="https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi">Three.js Inspector</a>. This will help you understand how demos are done and allow you to tweak parameters. Still in early development, but very cool.

<h2>Canvas debugging Tools in Popular Browsers</h2>

After a little digging, it's really nice to see major browsers adopt the need for debegging the HTML5 canvas element. These can be used for any kind of webGL project whether it be a game or visualization running on three.js or any other webGL framework.

Here is an article that explains the Chrome version in more detail:
<a href="http://learningthreejs.com/blog/2013/04/05/debugging-with-chromes-canvas-inspection/">Chrome Canvas Inspector</a>
and for firefox lovers such as myself I was excited to find out they have one too!
<a href="https://hacks.mozilla.org/2014/03/introducing-the-canvas-debugger-in-firefox-developer-tools/">Canvas Debugger in Firefox Developer Tools</a>
