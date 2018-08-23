---
layout: post
title: Full width, Responsive Search Box using CSS Tricks
date: 2014-09-09 13:07
author: Ben Chung
comments: true
category: css
category_name: CSS
thumbnail: full-width-search-box-545x545.jpg
---
Search boxes are a common need, but creating them can be trickier than expected. The below is a full width responsive search box using a few CSS tricks. <!--more-->Here's the running example:

demo:
<iframe class="scene-frame" src="{{site.baseurl}}/demos/making-search-bar/index.html" width="100%" height="50" frameborder="0" ></iframe>
download <a href="{{site.baseurl}}/downloads/making-search-bar.zip">demo</a>

Here's a summary:

<pre><code class="html">&lt;style&gt;
    /*import font awesome css icon library*/

    @import url("http://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css");
    input,
    select,
    textarea {
        background: none repeat scroll 0 0 #fafafa;
        border: 1px solid #eeeeee;
        color: #5e5e5e;
        display: block;
        font-family: arial, sans-serif;
        font-size: inherit;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
        margin: 0;
        height: 40px;
    }

    #searchtext {
        overflow: hidden;
    }

    a.search-submit-button {
        background: none repeat scroll 0 0 #fafafa;
        border-bottom: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
        border-top: 1px solid #eeeeee;
        color: #5e5e5e !important;
        display: block;
        float: right;
        font-family: inherit;
        font-size: 20px;
        padding: 8px 10px;
        text-align: center;
        width: 45px;
        box-sizing: border-box;
        height: 40px;
    }

    #form-container {
        /* width: 60%; */
    }
&lt;/style&gt;

&lt;div&gt;
    &lt;div id="form-container"&gt;
        &lt;!--&lt;input type="submit" id="searchsubmit" value="" /&gt;--&gt; 
        &lt;div id="searchtext"&gt;&lt;input id="s" name="s" type="text" value="Search Something..." /&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre>

A little explanation...

<ul>
    <li>both elements have <a href="http://www.w3schools.com/cssref/css3_pr_box-sizing.asp" target="_blank">box-sizing: border-box</a> (Without this there may be alignment issues)</li>
    <li>input has margin: 0 (To remove browser default margin on inputs)</li>
    <li>both have a height assigned (Without this some browsers will align them differently)</li>
    <li>the anchor is placed before the "searchtext" div and a float: right is applied to the anchor to make the arrangement possible and still allow the input to stretch 100% to it's container</li>
    <li><a title="Font Awesome" href="http://fontawesome.io/" target="_blank">Font Awesome</a> used as a search icon instead of images for flexibility</li>
</ul>
