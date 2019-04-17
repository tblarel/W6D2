class View {
    constructor(game, $el) {
        this.game = game;
        this.$el = $el;

        this.fromTowerIdx = null;

        this.$el.on(
            "click",
            "ul",
            this.clickTower.bind(this)
        );
        this.setupTowers();
        this.render();
    }

    clickTower(event) {
        const clickedTowerIdx = $(event.currentTarget).index();

        if (this.fromTowerIdx === null) {
            this.fromTowerIdx = clickedTowerIdx;
        } else {
            if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
                alert("Not a valid Move!");
            }
            this.fromTowerIdx = null;
        }

        this.render();

        if (this.game.isWon()) {
            this.$el.off("click");
            this.$el.addClass("game-over");
            alert("You, won!");
        }
    }

    setupTowers() {
        this.$el.empty();
        this.$el.addClass("group");

        let $tower, $disk;
        for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
            $tower = $("<ul>");

            for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
                $disk = $("<li>");
                $tower.append($disk);
            }
            this.$el.append($tower);
        };
    }

    render() {
        const $towers = this.$el.find("ul");
        $towers.removeClass();
      
        if (this.fromTowerIdx !== null) {
            $towers.eq(this.fromTowerIdx).addClass("selected");
        }

        this.game.towers.forEach((disks, towerIdx) => {
            const $disks = $towers.eq(towerIdx).children();
            $disks.removeClass();

            disks.forEach((diskWidth, diskIdx) => {
                $disks.eq(-1 * (diskIdx + 1)).
                addClass(`disk-${diskWidth}`);
            });
        });
    }
}

module.exports = View;