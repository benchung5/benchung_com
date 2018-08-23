---
layout: default
title: Contact
author: Ben Chung
permalink: /contact/
---

<div class="row">
    <!--check if this is a WooCommerce page to get right sidebar (some pages need this others have their own templates)-->
    <section id="content" class="large-8 columns">
    	<h1>Want to get in touch?</h1>
    	<p>
    		If you have any questions or comments feel free to drop me a message:
    	</p>

    	<form action="https://formspree.io/ben@benchung.com"
    	      method="POST">
    	    <input type="text" name="name" placeholder="your name">
    	    <input type="email" name="_replyto" placeholder="your email">
    	    <textarea rows="4" cols="50" name="message" placeholder="your message"></textarea>
    	    <input type="submit" value="Send">
    	</form>
    </section>
    <!--sidebar-->
    {% include sidebar-page.html %}
</div>
<!--row-->
<div class="clear"></div>

