---
layout: post
title: Clearing Thumbnail Lists in CSS
date: 2015-03-09 12:23
author: Ben Chung
comments: true
category: css
category_name: CSS
thumbnail: 
---
Clearing floated lists are a common need when working with thumbnails whether for a gallery or blog layout. Here's a solution that actually works and is inspired by <a title="Clearing floated lists using css" href="http://jsfiddle.net/KPXyw/4/" target="_blank">this.</a> Below is the example

<!--more-->

<a href="{{site.baseurl}}/images/blog/clearing-thumbnail-lists.jpg"><img class="alignnone size-full wp-image-478" src="{{site.baseurl}}/images/blog/clearing-thumbnail-lists.jpg" alt="Clearing Thumbnail Lists in CSS" width="753" height="635" /></a>

Which can be downloaded <a href="{{site.baseurl}}/downloads/clearing-thumbnails.zip" target="_blank">here</a>

&nbsp;

The html:
<pre class="lang:default decode:true">&lt;ul id="my-list"&gt;
    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;
    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;
    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;

    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;
    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text + Nam quis nulla nec neque eleifend consectetur in nec nisi. Vestibulum luctus justo ut lacus semper vestibulum.&lt;/p&gt;&lt;/li&gt;
    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;

    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;
    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;
    &lt;li&gt;&lt;img src="images/545X545.jpg"/&gt;&lt;p&gt;Some Text&lt;/p&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
&nbsp;

and the css:
<pre class="lang:default decode:true ">html{
    background: #f0f0f0;
    color: #c6c6c6;
    font-family: sans-serif;
}

ul#my-list{
    display: block;
    padding: 0;
    margin: 2px 0 0 2px ;
}

ul#my-list &gt; li {
    list-style-type: none;
    float: left;
    margin-right: 15px;
    width: 233px;
    display: block;
}

ul#my-list &gt; li &gt; img {
    width: 100%;
    display: block;
}

/*clear left on every fourth item*/
ul#my-list &gt; li:nth-of-type(3n+1){
    clear:left;
}

/*no padding on every third item*/
ul#my-list &gt; li:nth-of-type(3n+3){
    margin-right: 0
}</pre>
Some things to take note of are
<ul>
 	<li>img: display:block to eliminate space below images.</li>
 	<li>li are floated left to get them to run horizontally</li>
 	<li>li:nth-of-type(3n+3) is used to eliminate the right margin on every third item</li>
 	<li>li:nth-of-type(3n+1) is used because we want a clear left on every fourth item (to make a list of 3 columns)</li>
</ul>
&nbsp;

Also, try sizing down the browser window and notice how the list breaks when it goes down to 2 columns.

To fix this (if your site is fluid), simply change the 3n+1 to 2n+1 and the 3n+3 to 2n+2 in a media query so it will adapt to your browser window size.

Hope this helps you better Clear Thumbnail Lists in CSS! If you're looking for more great tutorials on CSS layout, check out Topal's post on: <a href="http://www.toptal.com/css/css-layout-primer-from-classic-approaches-to-the-latest-techniques" target="_blank">CSS Layout Tutorial: From Classic Approaches to the Latest Techniques</a>.

Need to know how to make your search box responsive as well? See <a title="Full width, Responsive Search Box using CSS Tricks" href="{{site.baseurl}}/full-width-responsive-search-box-using-css-tricks/">Full Width Responsive Search Box Using CSS Tricks</a>.
