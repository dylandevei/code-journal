/* global data */
/* exported data */
var $url = document.querySelector('.imageUrl');
$url.addEventListener('input', handleInput);

function handleInput(event) {
  document.querySelector('img').src = $url;

}

// var $submit = document.querySelector('form');

// $submit.addEventListener('submit', logSubmit);

// function logSubmit(event) {
//   var messageData = null;
//   event.preventDefault();
//   messageData = {
//     title: document.forms[0].elements.title.value,
//     imageUrl: document.forms[0].elements.imageUrl.value,
//     notes: document.forms[0].elements.notes.value
//   };
//   console.log('messageData:', messageData);
//   document.querySelector('form').reset();

// }
