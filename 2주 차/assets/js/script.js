const boardElement = document.getElementById('board');

for(let i=0; i<10; i++){
    for(let j=0; j<15; j++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        boardElement.appendChild(cell);
    }
}    