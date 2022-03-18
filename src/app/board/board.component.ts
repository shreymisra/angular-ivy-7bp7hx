import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  board: string[];
  winner: string;
  isXCurrentPlayer: boolean = true;

  constructor() {}

  ngOnInit() {
    this.createNewGame();
  }

  get currentPlayer() {
    return this.isXCurrentPlayer ? 'X' : 'O';
  }

  createNewGame() {
    this.board = Array(9).fill(null);
    this.winner = null;
    this.isXCurrentPlayer = true;
  }

  onSquareClicked(index) {
    if (!this.board[index] && !this.winner) {
      this.board.splice(index, 1, this.currentPlayer);
      this.isXCurrentPlayer = !this.isXCurrentPlayer;
      this.winner = this.checkWinner();
    }
  }

  checkWinner() {
    const winningScenarios = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningScenarios.length; i++) {
      const [ind1, ind2, ind3] = winningScenarios[i];
      if (
        this.board[ind1] &&
        this.board[ind1] === this.board[ind2] &&
        this.board[ind1] === this.board[ind3]
      ) {
        return this.board[ind1];
      }
    }
    return null;
  }
}
