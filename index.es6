import $ from "npm-zepto";
import _ from "underscore";

$(() => {
  class Life {
    constructor(element) {
      this.life = element;
      let params = this.getQueryParams();
      this.bday = params["bday"];
      this.years = params["years"] || 90;
    }

    start() {
      var counterRow = this.createCounter();
      counterRow.appendTo(this.life);

      for (var index of _.range(this.years)) {
        let year = this.createYear(index);
        year.appendTo(this.life);
      };

      this.fillSpentTime();

      $(".week").not($(".spent")).click((e) => {
        $(e.currentTarget).toggleClass("clicked");
      });
      $(".week").addClass("interactive");
    }

    fillSpentTime() {
      if (this.bday !== undefined) {
        let bday = new Date(this.bday);
        let currentTime = new Date();
        let weeksCount = Math.ceil((currentTime - bday) / 1000 / 60 / 60 / 24 / 7)
        $(".week").slice(0, weeksCount).each((index, el) => {
          $(el).addClass("clicked spent");
        });
      }
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

    getQueryParams(queryString) {
      var query = (queryString || window.location.search).substring(1); // delete ?
      if (!query) {
        return false;
      }
      return _
        .chain(query.split('&'))
        .map(function(params) {
          var p = params.split('=');
          return [p[0], decodeURIComponent(p[1])];
        })
        .object()
        .value();
    }
  }

  let life = new Life($(".life"));
  life.start();
});
