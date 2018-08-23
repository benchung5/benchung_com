---
layout: post
title: Chameleon Video Player PHP Warning Fix
date: 2015-02-17 12:39
author: Ben Chung
comments: true
category: wordpress
category_name: Wordpress
excerpt: I noticed, after updating to the latest Wordpress version (4.1), the LambertGroup - Chameleon Video Player plugin produced the error > Warning - Missing argument 2 ...
---
I noticed, after updating to the latest Wordpress version (4.1), the LambertGroup - Chameleon Video Player plugin produced the error: Warning: Missing argument 2 for wpdb::prepare()
After reading this article:
<a title="Missing argument 2 for wpdb::prepare()" href="https://make.wordpress.org/core/2012/12/12/php-warning-missing-argument-2-for-wpdb-prepare/" target="_blank">https://make.wordpress.org/core/2012/12/12/php-warning-missing-argument-2-for-wpdb-prepare/</a>
I changed:
<pre class="lang:default decode:true">$safe_sql=$wpdb-&gt;prepare( "SELECT * FROM (".$wpdb-&gt;prefix ."lbg2_videosettings) WHERE id = ".$atts['settings_id'] );</pre>
to
<pre class="lang:default decode:true">$settings_id = $atts['settings_id'];
$safe_sql=$wpdb-&gt;prepare( "SELECT * FROM (".$wpdb-&gt;prefix ."lbg2_videosettings) WHERE id = %d", $settings_id );</pre>
(on line:1102 of lbg-chameleon-videoplayer.php).

&nbsp;

That fixed it. Hope this helps someone out there!

If interested, see more <a title="WordPress Tutorials" href="{{site.baseurl}}/categories/wordpress/">WordPress tutorials</a>.
