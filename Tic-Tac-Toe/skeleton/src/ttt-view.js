class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (event => {
      const $square = $(event.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("Can't play there!");
      return;
    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      this.$el.addClass("game-over");
      this.$el.off("click");
      const winner = this.game.winner();
      const $figcaption = $("<figcaption>");
      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`${winner} has won!`);
      } else {
        $figcaption.html("Cat's Game!");
      }
      this.$el.append($figcaption);   
    }
  }

  setupBoard() {
    const $ul = $("<ul>");
    $ul.addClass("group");

    for (let rows = 0; rows < 3; rows++) {
      for (let cols = 0; cols < 3; cols++) {
        let $li = $("<li>");
        $li.data("pos", [rows, cols]);

        $ul.append($li);
      }
    }

    this.$el.append($ul);
  }
}

module.exports = View;
