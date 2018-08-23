---
layout: post
title: WordPress SEO by Yoast XML sitemap Error
date: 2015-01-28 12:49
author: Ben Chung
comments: true
category: wordpress
category_name: Wordpress
---
Sometimes the WordPress SEO by Yoast plugin fails to generate an XML sitemap. I've come across this a few times when applying it to different sites. It happens when going to SEO &gt; XML Sitemaps &gt; "XML Sitemap" simply brings up a 404 page. Here is a quick fix that's worked for me every time (so far). It's originally from <a title="FIX for sitemap_index.xml 404 error " href="https://wordpress.org/support/topic/plugin-wordpress-seo-by-yoast-fix-for-sitemap_indexxml-404-error" target="_blank">this thread</a>

Simply paste this into the top of your .htaccess file:
<pre class="lang:default decode:true"># WordPress SEO - XML Sitemap Rewrite Fix
&lt;IfModule mod_rewrite.c&gt;
RewriteEngine On
RewriteBase /
RewriteRule ^sitemap_index\.xml$ /index.php?sitemap=1 [L]
RewriteRule ^([^/]+?)-sitemap([0-9]+)?\.xml$ /index.php?sitemap=$1&amp;sitemap_n=$2 [L]
&lt;/IfModule&gt;
# END WordPress SEO - XML Sitemap Rewrite Fix</pre>
<strong>Then make sure to go into settings &gt; permalinks &gt; Save Changes (save it twice)</strong>. That will reset your permalinks. That stumped me at first when it didn't work after applying the code.
