import $ from "npm-zepto";
import _ from "underscore";

$(() => {
  class Life {
    constructor(element) {
      this.life = element;
      this.years = 90;
    }

    start() {
      var counterRow = this.createCounter();
      counterRow.appendTo(this.life);

      for (var index of _.range(this.years)) {
        let year = this.createYear(index);
        year.appendTo(this.life);
      };

      $(".week").click((e) => {
        $(e.currentTarget).toggleClass("clicked");
      });
      $(".week").addClass("interactive");
    }

    createCounter() {
      let row = $(document.createElement("div"));
      row.addClass("counter-row");
      for (var wIndex of _.range(52)) {
        let columnNumber = wIndex + 1;
        let value = "&nbsp;";
        let className = "";

        if (columnNumber % 5 == 0) {
          value = columnNumber;
          className = "visible";
        }

        row.append(`<div class="counter ${className}">${value}</div>`);
      };

      return row;
    }

    createYear(index) {
      let row = $(document.createElement("div"));
      row.addClass("year");

      let value = "&nbsp;";
      let className = "";

      if (index % 5 == 0) {
        value = index;
        className = "visible";
      }

      row.append(`<div class="counter ${className}">${value}</div>`);

      for (var wIndex of _.range(52)) {
        row.append("<div class='week'></div>");
      };

      return row;
    }
  }

  let life = new Life($(".life"));
  life.start();
});
