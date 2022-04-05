/* global data */
/* exported data */

var $input = document.querySelector('.imageUrl');
var $img = document.querySelector('img');
$input.addEventListener('input', updateUrl);

function updateUrl(event) {
  $img.setAttribute('src', $input.value);
}

var $form = document.querySelector('form');

$form.addEventListener('submit', logSubmit);

function logSubmit(event) {
  var entry = null;
  event.preventDefault();
  entry = {
    title: document.forms[0].elements.title.value,
    imageUrl: document.forms[0].elements.imageUrl.value,
    notes: document.forms[0].elements.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(entry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
