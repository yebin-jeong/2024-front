// 상수 정의
const ROWS = 10;
const COLUMNS = 15;
// 보드 요소를 가져옵니다
const boardElement = document.getElementById('board');
// 보드를 초기화하는 함수
function initializeBoard(rows, columns) {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            boardElement.appendChild(cell);
        }
    }
}
// 보드를 초기화합니다
initializeBoard(ROWS, COLUMNS);
