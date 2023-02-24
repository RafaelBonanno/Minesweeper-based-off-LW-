const GRIDSIZE = 10;
const MINEFREQ = 0.30;

function neighb(td, offsetX, offsetY) {
  const col = td.cellIndex;
  const row = td.parentElement.rowIndex;
  return document.querySelector(`[data-column="${col + offsetX}"][data-row="${row + offsetY}"]`);
}

function incrNeighb(td, offsetX, offsetY) {
  const n = neighb(td, offsetX, offsetY);
  if (n && n.classList.contains('has-mine')) {
    return 1;
  }
  return 0;
}

function open(tile) {
  let mines = 0;

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i !== 0 || j !== 0) {
        mines += incrNeighb(tile, i, j);
      }
    }
  }

  if (mines === 0) {
    tile.classlist.add('opened');
  } else {
    tile.classList.add(`mine-neighbour-${mines}`);
  }
  tile.classList.remove('unopened');

  if (mines === 0) {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i !== 0 || j !== 0) {
          const n = neighb(tile, i, j);
          if (n && n.classList.contains('unopened')) {
            open(n);
          }
        }
      }
    }
  }

  return mines;
}

function openOnClick(event) {
  const tile = event.currentTarget;
  if (tile.classList.contains('has-mine')) {
    document.querySelectorAll('.has-mine').forEach((cell) => {
      cell.classList.remove('has-mine', 'unopened');
      cell.classList.add('mine');
    });
    alert('boom');
  } else {
    open(tile);
  }
}

function flagOnClick(event) {
  event.preventDefault();
  const tile = event.currentTarget;
  if (tile.classList.contains('unopened')) {
    tile.classlist.add('flagged');
  }
}

const minesweeper = document.querySelector('#minesweeper');
for (let i = 0; i < GRIDSIZE; i += 1) {
  const row = document.createElement('tr');
  row.dataset.row = i;
  for (let j = 0; j < GRIDSIZE; j += 1) {
    row.insertAdjacentHTML('beforeend', `<td class="unopened" data-column="${j}"></td>`);
  }
  minesweeper.append(row);
}

document.querySelectorAll('td').forEach((td) => {
  td.dataset.column = td.cellIndex;
  td.dataset.row = td.parentElement.rowIndex;

  if (Math.random() <= MINEFREQ) {
    td.classList.add('has-mine');
  }

  td.addEventListener('click', openOnClick);
  td.addEventListener('contextmenu', flagOnClick);
});
