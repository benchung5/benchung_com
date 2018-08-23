---
layout: post
title: How to Shorten Title Length in WordPress
date: 2015-12-13 11:43
author: Ben Chung
comments: true
category: wordpress
category_name: Wordpress
---
This can be used to shorten pretty much any text in WordPress. I recently had to use it to make sure recent comment titles didn't cause them to spill over to the next line so I'll use it as an example...

<!--more-->

<h2>Title Spills Over Before Shortening</h2>

<a href="{{site.baseurl}}/images/blog/double-line-titles-wordpress.jpg"><img class="alignnone wp-image-508 size-full" src="{{site.baseurl}}/images/blog/double-line-titles-wordpress.jpg" alt="Double Line Titles in WordPress" width="367" height="251" /></a>
Here is the title section in my recent posts widget:

<pre><code>&lt;?php echo get_the_title(); ?&gt;
</code></pre>

Then I replace it with this:

<pre><code>&lt;?php echo onepix_shorten(get_the_title(), 42) ; ?&gt;
</code></pre>

&nbsp;
And add this to the functions.php file. (I believe it was originally courtesy of <a href="http://simplepie.org/wiki/tutorial/shorten_titles_and_descriptions" target="_blank">this post</a>).
&nbsp;

<pre><code>//shorten string and add suffix link
function onepix_shorten($string, $length) {

    // Convert 'smart' punctuation to 'dumb' punctuation, strip the HTML tags,
    // and convert all tabs and line-break characters to single spaces.
    $short_desc = trim(str_replace(array("\r","\n", "\t"), ' ', strip_tags($string)));

    $stringlen = strlen( $short_desc );
    if($stringlen &gt; $length){
        // By default, an ellipsis will be appended to the end of the text.
        $suffix = '?';
        // Cut the string to the requested length, and strip any extraneous spaces 
        // from the beginning and end.
        $desc = trim(substr($short_desc, 0, $length));
        // Find out what the last displayed character is in the shortened string
        $lastchar = substr($desc, -1, 1);
        // If the last character is a period, an exclamation point, or a question 
        // mark, clear out the appended text.
        // Append the text.
        $desc .= $suffix;
        // Send the new description back to the page.
        return $desc;
    } else {
        // Send the new description back to the page.
        return $short_desc;
    }

}
</code></pre>

&nbsp;

This will make a nice tidy, well formatted, single line title.

&nbsp;

<h2>After Shortening... Nice and Tidy</h2>

<a href="{{site.baseurl}}/images/blog/single-line-titles-wordpress.jpg"><img class="alignnone wp-image-507 size-full" src="{{site.baseurl}}/images/blog/single-line-titles-wordpress.jpg" alt="Single Line Titles in WordPress" width="367" height="251" /></a>

&nbsp;
