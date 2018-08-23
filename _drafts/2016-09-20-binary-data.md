---
layout: post
title: Binara Data in Javascript
date: 2016-09-20 14:57
author: Ben Chung
comments: true
category: javascript
---
Binary Data:

data stored in sets of 0's and 1's.

Bit (<em>binary digit</em>) means you only need two digits to represent a number (0 and 1). This is great for computers.

Binary (base 2) data can easily be represented physically. It's called base 2 because it's multiplied by 2 to the power of something. It's either 1 or zero which translates nicely to  bumped or not like in the case of tracks on CDs, etc. on or off of transistors.

&nbsp;

Character Set:

representation of characters as numbers.

binary data is stored in numbers then numbers represent characters. What each character gets represented as in number form is called a character set. There's no hard rule for it it's just a mapping. Languages sometimes have many characters and need larger character sets

&nbsp;

Character Encoding:

How characters are stored in binary.

The numbers are called code points and are converted and stored in binary. How many bits are used to store a number for UTF-8, it's 8 bits (8 digits). It may not need or use all of them, in that case there are more zeros to the far left. The more bits, the bigger the numbers they can represent. This way the computer knows that every 8 digits there's another piece of data.

&nbsp;

Node.js expands on JavaScript's capability in dealing with raw binary data, JavaScript is better with just dealing with character sets and a little on encoding.

&nbsp;
