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
  $ul.prepend(renderEntry(entry));
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  emptyEntries();
  switchViews('entries');
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
  var $pencil = document.createElement('i');

  $li.setAttribute('class', 'row');
  $columnHalf.setAttribute('class', 'column-half');
  $columnHalf2.setAttribute('class', 'column-half');
  $entryImg.setAttribute('src', url);
  $h2.setAttribute('class', 'proza font space-between');
  $p.setAttribute('class', 'open-sans');
  $pencil.setAttribute('class', 'fas fa-pencil-alt');
  $li.setAttribute('data-entry-id', entry.entryId);

  $h2.textContent = title;
  $p.textContent = note;

  $li.appendChild($columnHalf);
  $li.append($columnHalf2);
  $columnHalf.appendChild($entryImg);
  $columnHalf2.appendChild($h2);
  $h2.appendChild($pencil);
  $columnHalf2.appendChild($p);

  return $li;
}

window.addEventListener('DOMContentLoaded', domContentLoaded);

function domContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    $ul.appendChild(newEntry);
  }
  emptyEntries();
}

function emptyEntries() {
  if (data.entries.length === 0) {
    $p.setAttribute('class', 'open-sans center');
  } else {
    $p.setAttribute('class', 'hidden');
  }
}

var $entryButton = document.querySelector('.entry-button');
var $newButton = document.querySelector('.new-button');
var $view = document.querySelectorAll('.view');
var $p = document.querySelector('p');
var $ul = document.querySelector('.ul');

$entryButton.addEventListener('click', handleClick);
$newButton.addEventListener('click', handleClick);

function handleClick(event) {
  var viewName = event.target.getAttribute('data-view');
  switchViews(viewName);
}

function switchViews(viewName) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === viewName) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}
