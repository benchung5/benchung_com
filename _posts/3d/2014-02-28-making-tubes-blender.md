---
layout: post
title: Making Tubes in Blender
date: 2014-02-28 13:12
author: Ben Chung
comments: true
category: 3d
category_name: 3D
---
Here is how to make Tubes in blender or in other words, extruding, beveling or creating compound objects. The idea is to create a path and turn it into a tube of geometry. It's better than trying to achieve it through box modelling especially if you plan on making things like wires, floppy arms, cartoon hair or anything that needs a to be a long, curved tube.
<h3>1. Add a Curve</h3>
Open Blender and delete the default cube. Make sure "Object Mode" is selected. We'll need it that way to create our curve.

Bring the Blender Cursor to the origin by pressing "Ctrl + C". We do this so that newly added objects will be created at the origin.

We then select "Curve" from the Create&gt;Add Primitive menu.

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-1.jpg"><img class="alignnone wp-image-193" src="{{site.baseurl}}/images/blog/tubes-in-blender-1.jpg" alt="Adding a Curve - Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>
<h3>2. Adjust the Curve Properties</h3>
Make sure the object is selected, then select the curve properties tab:

-Set fill to "Full"

-Drag the Resolution(Preview U) to adjust your desired amount geometry along the tube

-Drag the Bevel dept with your left mouse button to create and adjust the tube thickness

-Drag the Resolution to adjust your desired amount of geometry around the tube

(you can switch to wire-frame mode to see the changes more clearly)

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-2.jpg"><img class="alignnone wp-image-194" src="{{site.baseurl}}/images/blog/tubes-in-blender-2.jpg" alt="Adjusting Curve Properties - Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>
<h3>3. Adjust the Shape of the Tube</h3>
Switch to edit mode by pressing "Tab". You can now adjust the curve by selecting the control points or the handles with your left mouse button then dragging them with the 3d cursor.

If you are completely satisfied with it at this point, you can skip to step 9. If you need more control over the shape of your tube keep going.

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-3.jpg"><img class="alignnone wp-image-195" src="{{site.baseurl}}/images/blog/tubes-in-blender-3.jpg" alt="Editing Curves - Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>
<h3>4. Adding a Bevel Object</h3>
If you'd like anything others than a basic protrusion, you can add a bevel object to enable you to adjust it your desired tube shape.

In object mode, create a Circle.

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-4.jpg"><img class="alignnone wp-image-196" src="{{site.baseurl}}/images/blog/tubes-in-blender-4.jpg" alt="Adding a Bevel Object - Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>
<h3>5. Creating the Bevel</h3>
Select the tube curve and from the curve properties &gt; Bevel Object then select your "Bezier Circle"

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-5.jpg"><img class="alignnone wp-image-197" src="{{site.baseurl}}/images/blog/tubes-in-blender-5.jpg" alt="Creating a Curve Bevel - Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>

&nbsp;
<h3>6. Adjust the Beveled Geometry resolution</h3>
This may not be exactly what you desired right away in terms of the amount of geometry added. You can adjust this by selecting the circle and adjusting it's Resolution Resolution(Preview U) just as we did for the tube curve.

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-6.jpg"><img class="alignnone wp-image-198" src="{{site.baseurl}}/images/blog/tubes-in-blender-6.jpg" alt="Adjust Bevel Geometry Resolution - Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>
<h3>7. More Adjustments</h3>
You can even interactively adjust it's size by scaling the circle (S) or going into edit mode and adjusting it's control points

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-7.jpg"><img class="alignnone wp-image-199" src="{{site.baseurl}}/images/blog/tubes-in-blender-7.jpg" alt="Adjusting Curve Control Points - Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>
<h3>8. Taper</h3>
You can also add a taper by selecting your curve again, then in the curve properties &gt; "Taper Object"? select your circle (or another object of your liking). You'll probably need to enlarge your circle. If you would like the end to not be pointed, you can adjust the "Start Bevel Factor"

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-8.jpg"><img class="alignnone size-full wp-image-200" src="{{site.baseurl}}/images/blog/tubes-in-blender-8.jpg" alt="Creating Tubes in Blender Using Curves" width="1584" height="822" /></a>
<h3>9. Converting Your Tube Path into Geometry</h3>
If you are completely satisfied with it at this point, you can optionally fill the holes at the ends by selecting press "Alt+C" or Object &gt; Convert to &gt; Curve from Mesh/Text.

<a href="{{site.baseurl}}/images/blog/tubes-in-blender-9.jpg"><img class="alignnone wp-image-201" src="{{site.baseurl}}/images/blog/tubes-in-blender-9.jpg" alt="Convert Path Into Geometry In Blender" width="1584" height="822" /></a>