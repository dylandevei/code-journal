/* global data */
/* exported data */

var $img = document.querySelector('img');
var $entryButton = document.querySelector('.entry-button');
var $newButton = document.querySelector('#new');
var $view = document.querySelectorAll('.view');
var $p = document.querySelector('p');
var $ul = document.querySelector('ul');
var $input = document.querySelector('.imageUrl');

$input.addEventListener('input', updateUrl);

function updateUrl(event) {
  $img.setAttribute('src', $input.value);
}
var $form = document.querySelector('form');
$form.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entry = {
      title: $form.elements.title.value,
      imageUrl: $form.elements.imageUrl.value,
      notes: $form.elements.notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entry);
    $ul.prepend(renderEntry(entry));
    switchViews('entries');
  } else if (data.editing !== null) {
    var editEntry = {
      title: $form.elements.title.value,
      imageUrl: $form.elements.imageUrl.value,
      notes: $form.elements.notes.value,
      entryId: data.editing
    };
    for (var entryIndex = 0; entryIndex < data.entries.length; entryIndex++) {
      if (data.editing === data.entries[entryIndex].entryId) {
        data.entries[entryIndex] = editEntry;
      }
    }
  }
  var $li = document.querySelectorAll('li');
  for (var editIndex = 0; editIndex < $li.length; editIndex++) {
    var parseAttribute = parseInt($li[editIndex].getAttribute('data-entry-id'));
    if (data.editing === parseAttribute) {
      $li[editIndex].replaceWith(renderEntry(editEntry));
    }
  }
  switchViews('entries');
  emptyEntries();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  data.editing = null;
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

$entryButton.addEventListener('click', handleClick);
$newButton.addEventListener('click', handleClick);
$ul.addEventListener('click', editClick);

function handleClick(event) {
  var viewName = event.target.getAttribute('data-view');
  switchViews(viewName);
}

function switchViews(viewName) {
  for (var viewIndex = 0; viewIndex < $view.length; viewIndex++) {
    if ($view[viewIndex].getAttribute('data-view') === viewName) {
      $view[viewIndex].className = 'view';
    } else {
      $view[viewIndex].className = 'view hidden';
    }
  }
}

function editClick(event) {
  if (event.target.tagName === 'I') {
    switchViews('entry-form');
    var closestUl = event.target.closest('li');
    var dataId = closestUl.getAttribute('data-entry-id');
    data.editing = JSON.parse(dataId);
    for (var editIndex = 0; editIndex < data.entries.length; editIndex++) {
      if (data.editing === data.entries[editIndex].entryId) {
        $form.elements.title.value = data.entries[editIndex].title;
        $form.elements.imageUrl.value = data.entries[editIndex].imageUrl;
        $form.elements.notes.value = data.entries[editIndex].notes;
        $img.setAttribute('src', data.entries[editIndex].imageUrl);
      }
    }
  }
}

function emptyEntries() {
  if (data.entries.length === 0) {
    $p.setAttribute('class', 'open-sans center');
  } else {
    $p.setAttribute('class', 'hidden');
  }
}

function domContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    $ul.appendChild(newEntry);
  }
  emptyEntries();
}
window.addEventListener('DOMContentLoaded', domContentLoaded);
