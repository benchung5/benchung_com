---
layout: post
title: Display Related Posts in WordPress Without a Plugin
date: 2015-03-26 12:09
author: Ben Chung
comments: true
category: wordpress
category_name: Wordpress
---
Adding links within articles to related posts is a great way to polish the SEO on your WordPress site, but at times It can be redundant, time consuming and hard to remember what articles are related.
So why now automate it!? Here is a great way to do so by displaying a non obtrusive list of related posts. Simply paste this below the content area of your article in single.php or whatever template file your single posts are reading from.

By the way, this code is taken and tweaked a little from:? <a title="How to Display Related Posts in WordPress" href="http://www.wpbeginner.com/wp-tutorials/how-to-display-related-posts-in-wordpress/" target="_blank">How to Display Related Posts in WordPress</a> on Wp Beginner.
<pre class="lang:default decode:true">&lt;?php
//basic list of 5 post titles related to first tag on current post
$tags = wp_get_post_tags($post-&gt;ID);
if ($tags) {
		  $first_tag = $tags[0]-&gt;term_id;
		  $args = array(
			  'tag__in' =&gt; array($first_tag),
			  'post__not_in' =&gt; array($post-&gt;ID),
			  'posts_per_page' =&gt; 5,
			  'caller_get_posts' =&gt; 1
		  );
		  $my_query = new WP_Query($args);

		  if ($my_query-&gt;have_posts()) {
			  echo '&lt;p&gt;Related Posts: ';
			  $post_count = $my_query-&gt;found_posts;
			  $i = 1;
			  while ($my_query-&gt;have_posts()) : $my_query-&gt;the_post();
		  ?&gt;
				  &lt;a href="&lt;?php the_permalink() ?&gt;" rel="bookmark" title="Permanent Link to &lt;?php the_title_attribute(); ?&gt;"&gt;&lt;?php the_title(); ?&gt;&lt;/a&gt;&lt;?php echo ($i &lt; $post_count ?  ', ' : ''); ?&gt;
				  &lt;?php
					$i++;
			  endwhile;
			  echo '&lt;/p&gt;';
			}
		  wp_reset_query();
		}
?&gt;</pre>
If all is well, it should look something like this:

<a href="{{site.baseurl}}/images/blog/related-posts-wordpress.jpg"><img class="alignnone wp-image-420 size-full" src="{{site.baseurl}}/images/blog/related-posts-wordpress.jpg" alt="Related Posts in Wordpress Without a Plugin" width="496" height="72" /></a>
