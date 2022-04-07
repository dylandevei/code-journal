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
  var entry = {};
  event.preventDefault();
  entry.title = $form.elements.title.value;
  entry.imageUrl = $form.elements.imageUrl.value;
  entry.notes = $form.elements.notes.value;
  entry.entryId = data.nextEntryId;
  // entry = {
  //   title: $form.elements.title.value,
  //   imageUrl: $form.elements.imageUrl.value,
  //   notes: $form.elements.notes.value,
  //   entryId: data.nextEntryId
  // };

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
$ul.addEventListener('click', editClick);

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

// var $title = document.querySelector('title');
// var $photoUrl = document.querySelector('imageUrl');
// var $notes = document.querySelector('notes');

function editClick(event) {
  if (event.target && event.target.tagName === 'I') {
    var closestUl = event.target.closest('.row');
    var dataId = closestUl.getAttribute('data-entry-id');
    data.editing = JSON.parse(dataId);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].entryId) {
        switchViews('entry-form');
        $form.elements.title.value = data.entries[i].title;
        $form.elements.imageUrl.value = data.entries[i].imageUrl;
        $form.elements.notes.value = data.entries[i].notes;
        $img.setAttribute('src', data.entries[i].imageUrl);
      }
    }
  }
}
