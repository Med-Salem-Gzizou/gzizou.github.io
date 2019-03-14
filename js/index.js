/*
  Inspired by : https://codepen.io/patrickhimes/pen/ZJQLqW
*/

// setup vars
var currentLine = "";
var typeSpeed = 30;
var pauseLength = 1000;

var cursor = $("#cursor");
var animate = $(".animate");

// hide text so we can animate it
animate.each(function(index) {
  $(this).addClass("hide");
});

// make first call to printCharaters() for animation
var temp = setTimeout(printCharaters, typeSpeed);

// this function animates printing of text inside DOMS with the .animate class.
function printCharaters() {
  // check if current line array is empty
  if (currentLine.length == 0) {
    // stop cursor from blinking
    cursor.removeClass("blink");

    // get first line of text and add it to an array
    currentLine = animate.first().text().split("");
    currentLine = currentLine.reverse();

    // remove text from dom and unhide element
    animate.first().html("");
    animate.first().removeClass("hide");
    cursor.appendTo(animate.first());
  }

  // animate typing
  animate.first().append(currentLine.pop()).append(cursor);

  // check if we just popped the last element of the array off
  if (currentLine.length == 0) {
    // remove animated DOM Element from animation
    animate.first().removeClass("animate");
    // get new list of DOM Elements to animate
    animate = $(".animate");
    // make cursor blink at the end-of-line.
    cursor.addClass("blink");

    // Animate next DOM Element if any remain
    if (animate.length > 0) {
      setTimeout(printCharaters, pauseLength);
    } else {
			// all text in the DOM Elements have been animated
    }
  } else {
    // Animate next character in DOM Element
    setTimeout(printCharaters, typeSpeed);
  }
}