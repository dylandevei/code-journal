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

function renderEntry(entry) {
  var title = entry.title;
  var url = entry.imageUrl;
  var note = entry.notes;

  var $li = document.createElement('li');
  var $columnHalf = document.createElement('div');
  var $columnHalf2 = document.createElement('div');
  var $entryImg = document.createElement('img');
  var $h2 = document.createElement('h2');
  var $p = document.createElement('p');

  $li.setAttribute('class', 'row');
  $columnHalf.setAttribute('class', 'column-half');
  $columnHalf2.setAttribute('class', 'column-half');
  $entryImg.setAttribute('src', url);
  $h2.setAttribute('class', 'proza font');
  $p.setAttribute('class', 'open-sans');

  $h2.textContent = title;
  $p.textContent = note;

  $li.appendChild($columnHalf);
  $li.append($columnHalf2);
  $columnHalf.appendChild($entryImg);
  $columnHalf2.appendChild($h2);
  $columnHalf2.appendChild($p);

  return $li;

}

var $ul = document.querySelector('.ul');

for (var i = 0; i < data.entries.length; i++) {
  var object = renderEntry(data.entries[i]);
  $ul.appendChild(object);
}
