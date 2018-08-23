---
layout: post
title: How to Add Responsive Featured Video for Wordpress Posts Without a Plugin
date: 2015-01-23 12:55
author: Ben Chung
comments: true
category: wordpress
category_name: Wordpress
thumbnail: responsive-featured-video-wordpress-545x545.gif
---
This article will show you how to add an optional featured video to replace your WordPress post featured image. Hope to help those looking for a way to freely create responsive video blogs in a plugin or theme without worrying about installing unfamiliar plugins. It's also intended for people that know their way around the basics of creating WordPress plugins and how themes work.

Most of the code here is based off of: <a title="Creating a Shortcode for Responsive Video" href="http://code.tutsplus.com/tutorials/creating-a-shortcode-for-responsive-video--wp-32469" target="_blank">Creating a Shortcode for Responsive Video</a> (showing how to create a full plugin) from <a title="Tuts +" href="http://tutsplus.com/" target="_blank">tuts+</a> and <a title="Fluid Width Video" href="http://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php" target="_blank">Fluid Width Video</a> from <a title="CSS Tricks" href="http://css-tricks.com/" target="_blank">CSS-Tricks.</a>

&nbsp;
<h3>Add the Meta Box</h3>
First, add a meta box in your theme or plugin. If you don't already have something in place for that, here's the code to do it:
<pre class="lang:default decode:true">&lt;?php

// Add the Page Meta Box
function onepix_add_custom_meta_box() {
    add_meta_box(
            'onepix_meta_box', // $id
            '1 Pixel Page Options', // $title 
            'onepix_show_custom_meta_box', // $callback
            'page', // $page
            'normal', // $context
            'high'); // $priority
}

add_action('add_meta_boxes', 'onepix_add_custom_meta_box');

// Add the Post Meta Box
function onepix_add_custom_post_meta_box() {
    add_meta_box(
            'onepix_meta_box', // $id
            '1 Pixel Page Options', // $title 
            'onepix_show_custom_post_meta_box', // $callback
            'post', // $post
            'normal', // $context
            'high'); // $priority
}

add_action('add_meta_boxes', 'onepix_add_custom_post_meta_box');

$prefix = 'onepix_';

// Field Array (Pages Meta)
$onepix_meta_fields = array(
//	array(
//		'label'=&gt; 'Text Input',
//		'desc'	=&gt; 'A description for the field.',
//		'id'	=&gt; $prefix.'text',
//		'type'	=&gt; 'text'
//	),
//	array(
//		'label'=&gt; 'Textarea',
//		'desc'	=&gt; 'A description for the field.',
//		'id'	=&gt; $prefix.'textarea',
//		'type'	=&gt; 'textarea'
//	),
//	array(
//		'label'=&gt; 'Checkbox Input',
//		'desc'	=&gt; 'A description for the field.',
//		'id'	=&gt; $prefix.'checkbox',
//		'type'	=&gt; 'checkbox'
//	),
//	array(
//		'label'=&gt; 'Select Box',
//		'desc'	=&gt; 'A description for the field.',
//		'id'	=&gt; $prefix.'select',
//		'type'	=&gt; 'select',
//		'options' =&gt; array (
//			'one' =&gt; array (
//				'label' =&gt; 'Option One',
//				'value'	=&gt; 'one'
//			),
//			'two' =&gt; array (
//				'label' =&gt; 'Option Two',
//				'value'	=&gt; 'two'
//			),
//			'three' =&gt; array (
//				'label' =&gt; 'Option Three',
//				'value'	=&gt; 'three'
//			)
//		)
//	)
);

// Field Array (Posts Meta)
$onepix_post_meta_fields = array(
    array(
        'label' =&gt; 'Featured Video Embed Code',
        'desc' =&gt; 'Paste your video code here to show a video instead of a featured image.',
        'id' =&gt; $prefix . 'video_embed',
        'type' =&gt; 'textarea'
    )
);

// The Callback for page meta box
function onepix_show_custom_meta_box() {
    global $onepix_meta_fields;
    onepix_show_page_meta_box($onepix_meta_fields);
}

// The Callback for post meta box
function onepix_show_custom_post_meta_box() {
    global $onepix_post_meta_fields;
    onepix_show_page_meta_box($onepix_post_meta_fields);
}

// The Callback
function onepix_show_page_meta_box($meta_fields) {

    global $post;
// Use nonce for verification
    echo '&lt;input type="hidden" name="custom_meta_box_nonce" value="' . wp_create_nonce(basename(__FILE__)) . '" /&gt;';

    // Begin the field table and loop
    echo '&lt;table class="form-table"&gt;';
    foreach ($meta_fields as $field) {
        // get value of this field if it exists for this post
        $meta = get_post_meta($post-&gt;ID, $field['id'], true);
        // begin a table row with
        echo '&lt;tr&gt;
				&lt;th&gt;&lt;label for="' . $field['id'] . '"&gt;' . $field['label'] . '&lt;/label&gt;&lt;/th&gt;
				&lt;td&gt;';
        switch ($field['type']) {

            // text
            case 'text':
                echo '&lt;input type="text" name="' . $field['id'] . '" id="' . $field['id'] . '" value="' . $meta . '" style="width:100%" /&gt;
                                                    &lt;br /&gt;&lt;span class="description"&gt;' . $field['desc'] . '&lt;/span&gt;';
                break;

            // textarea
            case 'textarea':
                echo '&lt;textarea style="width:100%" rows="2" id="' . $field['id'] . '" name="' . $field['id'] . '"&gt;' . $meta . '&lt;/textarea&gt;
                                                    &lt;br /&gt;&lt;span class="description"&gt;' . $field['desc'] . '&lt;/span&gt;';
                break;

            // checkbox
            case 'checkbox':
                echo '&lt;input type="checkbox" name="' . $field['id'] . '" id="' . $field['id'] . '" ', $meta ? ' checked="checked"' : '', '/&gt;
                                                    &lt;label for="' . $field['id'] . '"&gt;' . $field['desc'] . '&lt;/label&gt;';
                break;

            // select
            case 'select':
                echo '&lt;select name="' . $field['id'] . '" id="' . $field['id'] . '"&gt;';
                foreach ($field['options'] as $option) {
                    echo '&lt;option', $meta == $option['value'] ? ' selected="selected"' : '', ' value="' . $option['value'] . '"&gt;' . $option['label'] . '&lt;/option&gt;';
                }
                echo '&lt;/select&gt;&lt;br /&gt;&lt;span class="description"&gt;' . $field['desc'] . '&lt;/span&gt;';
                break;
        } //end switch
        echo '&lt;/td&gt;&lt;/tr&gt;';
    } // end foreach
    echo '&lt;/table&gt;'; // end table
}

// Save the Data
function onepix_save_custom_meta($post_id) {
    global $onepix_meta_fields;
    global $onepix_post_meta_fields;

    // verify nonce
    if (!wp_verify_nonce($_POST['custom_meta_box_nonce'], basename(__FILE__)))
        return $post_id;
    // check autosave
    if (defined('DOING_AUTOSAVE') &amp;&amp; DOING_AUTOSAVE)
        return $post_id;
    // check permissions
    if ('page' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id))
            return $post_id;
    } elseif (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }

    //either post or page fields we'll be working with
    $fields;

    // Check permissions (pages or posts)
    if ('page' == $_POST['post_type']) {

        $fields = $onepix_meta_fields;
    } else if ('post' == $_POST['post_type']) {

        $fields = $onepix_post_meta_fields;
    }

    // loop through fields and save the data
    foreach ($fields as $field) {
        $old = get_post_meta($post_id, $field['id'], true);
        $new = $_POST[$field['id']];
        if ($new &amp;&amp; $new != $old) {
            update_post_meta($post_id, $field['id'], $new);
        } elseif ('' == $new &amp;&amp; $old) {
            delete_post_meta($post_id, $field['id'], $old);
        }
    } // end foreach
}

add_action('save_post', 'onepix_save_custom_meta');
?&gt;</pre>
I won't explain how to add a meta box too much here. You can read up on? a good maintainable way to do it in this article: <a href="http://code.tutsplus.com/articles/reusable-custom-meta-boxes-part-1-intro-and-basic-fields--wp-23259" target="_blank">Reusable Custom Meta Boxes Part 1: Intro and Basic Fields.</a> Basically the above code checks to see if it's a page or a post we're dealing with, then adds a meta box with appropriate field types based on the array of properties you feed it. It's a little extra code than basic implementation, but it's definitely worth it in the end since you'll likely want to add more metabox fields in the future.

Once the meta box field is visible in your post edit area, you should be able to past embed code from YouTube or some other source into it and save it without any problems.

&nbsp;
<h3>Modify the Featured Image In the Template File</h3>
Now that our embed code is safely stored within our post meta we need to be able to display it. Find the code that displays your featured images in your theme or plugin template files. they could be in a custom template file, your archives.php file, your post.php file depending on your situation. In any case you should likely have 2 areas to change: your post thumbnails featured image display, and your single post featured image display.

For the post thumbnail display you can look for something like this:
<pre class="lang:default decode:true">&lt;?php the_post_thumbnail(); ?&gt;</pre>
For the single post featured image, it may look something like this:
<pre class="lang:default decode:true">&lt;?php echo the_post_thumbnail( 'single-post' ); ?&gt;</pre>
Paste this in it's place where appropriate:
<pre class="lang:default decode:true">&lt;?php if (has_post_thumbnail()) { ?&gt;

&lt;!--    show the featured image--&gt;
        &lt;?php the_post_thumbnail(); ?&gt;

&lt;?php } else if (get_post_meta(get_the_ID(), 'onepix_video_embed', true)) { ?&gt;

&lt;!--    show the featured video--&gt;
        &lt;div class="videoWrapper"&gt;
            &lt;?php echo get_post_meta(get_the_ID(), 'onepix_video_embed', true); ?&gt;
        &lt;/div&gt;

&lt;?php } else { ?&gt;

        &lt;!--if no featured image or thumbnail, do something...--&gt;

&lt;?php } ?&gt;</pre>
You'll probably have to modify this to suit your theme, but you get the idea. Also notice the? "videoWrapper" div. We'll talk about this in the next step. Our intention will be to show the video instead of the featured image if the embed code is present. We do this by echoing the posts video embed code meta that we just created and saved.? If all is well, you should now be able to see your video as a featured image in your blog post.

&nbsp;
<h3>Making it Responsive</h3>
If you don't need it to be responsive, you can stop right here, most however will be dealing with responsive themes and would like our videos to adapt accordingly. In order to do this, we'll use some css tricks. There are many ways to do this, but by using css we can avoid too many JavaScript libraries in our theme or plugin.

Add this to your style.css file:
<pre class="lang:default decode:true">/*the featured video embed wrapper to make the iframe fluid*/
/*must have 16:9 ration or same proportions as 640*385 for this to work properly*/
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
}

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}</pre>
This will automatically make your video responsive even though you set your iframe width and height in your embed code.
It's kind of a cheat so take note that this is based on a 16:9 aspect ratio, meaning that your featured image has to have the same proportions of standard internet videos. For example, your responsive video will work as it should if it's set to:? width="640" height="385" in the embed code, or anything with those same proportions.

&nbsp;

&nbsp;

&nbsp;
