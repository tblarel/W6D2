const View = require('./ttt-view.js'); // require appropriate file
const Game = require('./game.js');// require appropriate file

  $(() => {
    console.log("Webpack is working!");
    const game = new Game();
    const grid = $(".ttt");
    new View(game,grid);    
  });
