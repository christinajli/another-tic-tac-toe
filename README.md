# A Tic Tac Toe game

## Description

An alternate Tic Tac Toe game made with vanilla Javascript. Play at: [https://christinajli.github.io/another-tic-tac-toe/]

### Rules
* Red starts
* Three different sized pieces
* Large pieces can eat up small pieces of the opponent's or your own
* First player to get three pieces in a row wins

## Opens
- [x] create canvas for two colours and board
- [x] create shape objects
- [x] create board outline
- [x] drag and drop functionalities to board
- [x] seperate into two players
  - [x] switch players after each move
  - [x] hovering background color
  - [x] remaining is draggable updated after each turn
- [x] normal tic tac toe with three equal pieces
  - [x] check if draw
  - [x] pieces are not being created correctly
- [x] six different sizes set in style class (small x2, medium x2, large x2)
- [x] comparison function for sizes
  - [x] if large pieces, remove dropAllowed tag
  - [x] if medium and small piexes, need to compare
  - [x] big piece replace small piece on board
- [ ] align board center of screen
- [ ] align red pieces of screen right of left block
- [ ] allow drop anywhere in the cell, including on existing pieces
- [x] pointer for selecting allowed pieces
- [ ] allow whichever colour to start first
- [ ] win animation with line through three
- [ ] better layout of pieces, overlap same size ones 
- [ ] add rules button and popup

## Acknowledgments
Inspiration, code snippets, etc.
* [JavaScript-Tic-Tac-Toe](https://github.com/WebDevSimplified/JavaScript-Tic-Tac-Toe)
* [Gobblet Gobblers](https://www.amazon.com/AFGQIANG-Tic-Tac-Toe-Surprise-Gobble-Classic/dp/B08NVDNH59)
