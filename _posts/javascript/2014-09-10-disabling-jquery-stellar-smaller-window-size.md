---
layout: post
title: Disabling jQuery Stellar At Smaller Window Size
date: 2014-09-10 13:06
author: Ben Chung
comments: true
category: javascript
category_name: Javascript
thumbnail: disabling-stellar-on-window-size-545x545.jpg
---
This example shows you how to de-activate and re-activate the jQuery Stellar (parallax plugin) according to your browser's window size.

I found it difficult to prevent images repeating themselves when using a combination of <a title="jQuery Stellar" href="http://markdalgleish.com/projects/stellar.js/" target="_blank">jQuery Stellar</a>, a responsive design and a full width image that uses a css background set to <a title="background properties - cover" href="http://www.w3schools.com/cssref/css3_pr_background-size.asp" target="_blank">cover</a>. Image proportions also become a problem as when the window shrinks, so does the height of your image and the image repetition starts as you begin scrolling. "horizontalScrolling" didn't eliminate the problem (though you should keep it on), "responsive: true" didn't work and adjusting the "verticalOffset" didn't do it. For example:
<pre>$.stellar({
   horizontalScrolling: false
   responsive: true
   verticalOffset: 33
});
</pre>
I also tried:
<pre>$(window).resize(function() {
    $.stellar('refresh');
});
</pre>
The problem is really not in the plugin, but the fact that as the image shrinks there is not enough height left for proper parallax to take place so the image repeats (if your css background is set to repeat). So I found the only proper answer to be disabling Stellar on smaller window sizes:
<pre>        // "stellar" parallax --------------------------------------------------//

        $(document).ready(function() {
            react_to_window();
        });
        
//      only activate stellar for window widths above or equal to 1024
        var stellarActivated = false;
        
        $(window).resize(function() {
            react_to_window();
        });
        
        function react_to_window() {
            if ($(window).width() &lt;= 1024) {
                if (stellarActivated == true) {
                    $(window).data('plugin_stellar').destroy();
                    stellarActivated = false;
                }
            } else {
                if (stellarActivated == false) {

                    $.stellar({
                       horizontalScrolling: false
                   });
                    
                    $(window).data('plugin_stellar').init();
                    stellarActivated = true;
                }
            }
        }
</pre>
