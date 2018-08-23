---
layout: post
title: This and Bind in React
date: 2016-09-03 15:49
author: Ben Chung
comments: true
category: react
category_name: React
thumbnail: this-and-bind-in-react.jpg
---
When working with events in React, Especially within forms after version 0.13, you may run into some event handling code that needs to make use of "this" and "bind". If you're familiar with what bind does you can ignore the below.

<h3>What is bind and Why do We Use it?</h3>

Javascript has some differences from other common programming languages that makes it both powerful and strange at the same time. One of the most notable differences is how it treats functions like variables and  how the context of 'this' can be different than what is expected at times. In this example, swimFunction doesn't know what "this" is because we've pulled it from it's original object and it therefore it looses that original scope and is now just a function on it's own:

<pre><code class="javascript">//this and bind
let fish = {
  movement: "flap tail",
  swim: function() {
    console.log(this.movement)
  }
}

fish.swim(); //flap tail
let swimFunction = fish.swim;
swimFunction(); //undefined

//use bind to give re-give 'this' the scope of the fish object
let boundFunciton = swimFunction.bind(fish);
boundFunciton(); //flap tail
</code></pre>

A practical example of this would be javascript events. The below looks like it might work:

<pre><code class="javascript">let fish = {
  movement: "flap tail",
  swim: function() {
    console.log(this.movement)
  }
}

let button = document.getElementById("myButton");

button.addEventListener(
    "click", 
    fish.swim
);
</code></pre>

But it won't because 'this' will not be the fish, it will be the window object ( addEventLister is being called from that context). That's not what we want, addEventLister is essentially ripping the swim function from off of it's parent object and using it elsewhere, so we need to bind 'this' back to the fish object:

<pre><code class="javascript">let fish = {
  movement: "flap tail",
  swim: function() {
    console.log(this.movement)
  }
}

let button = document.getElementById("myButton");

button.addEventListener(
    "click", 
    fish.swim.bind(fish)
);
</code></pre>

<h3>This and Bind in React</h3>

Back to React... Note that in the previous versions, auto-binding took place to the eventListener. So if we use the pre-ES6 method like this:

<pre><code class="javascript"><br />      var Counter = React.createClass({
        getInitialState: function () {
          return { count: 0 };
        },
        updateInput: function (event) {
          console.log(event.target.value);
           this.setState({
            count: this.state.count + 1,
          });
        },
        render: function () {
          return (
            &lt;div&gt;
            &lt;input type="text" onChange={this.updateInput} /&gt;
             &lt;br/&gt;
             &lt;span&gt;State altered: {this.state.count}&lt;/span&gt;
            &lt;/div&gt;
          );
        }
      });

</code></pre>

Then there is no need to do use .bind. Try it below to see for yourself:
[codepen_embed height="280" theme_id="dark" slug_hash="GjRaZd" default_tab="result" user="benchung"]See the Pen <a href='http://codepen.io/benchung/pen/GjRaZd/'>GjRaZd</a> by Ben Chung (<a href='http://codepen.io/benchung'>@benchung</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

Now that React is using ES6 classes and we write them like this:

<pre><code class="javascript">class MyComponent extends Component {
    render() {
    ...
    }

}
</code></pre>

We loose that ability. There's a couple of simple was to deal with it. One is using ES6 fat arrow functions, here is a good article that explains it: <a href="http://www.ian-thomas.net/autobinding-react-and-es6-classes/">Autobinding, React and ES6 Classes</a> 
Another way to deal with this context issue is to just do what we've been talking about this whole time and just use .bind:

<pre><code class="javascript">class MyComponent extends Component {

    updateInput(event) {
        console.log(event.target.value);
        this.setState({
            count: this.state.count + 1,
        });
    }

    render() {
        &lt;div&gt;
            &lt;input type="text" onChange={this.updateInput.bind(this) } /&gt;
        &lt;/div&gt;
    }
}
</code></pre>

Hopefully that takes away some of the mystery of what's doing on with events in your React forms and the new use of the bind function.
