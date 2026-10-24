"use strict";

/*
  Two independent enhancements, wrapped in one scope so nothing leaks global:
  1. A light/dark theme toggle, remembered in localStorage.
  2. Budget + dietary filtering of the restaurant list.
  The HTML stays readable and complete if this file fails to load.
*/
(function () {
  var STORAGE_KEY = "boston-eats-theme";
  var root = document.documentElement;

  /* --- Theme toggle ----------------------------------------------------- */

  var themeToggle = document.getElementById("theme-toggle");
  var themeLabel = document.getElementById("theme-toggle-label");

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);

    if (themeLabel) {
      themeLabel.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        /* Storage can be blocked (private mode, file://). Theme still applies. */
      }
    }
  }

  if (themeToggle) {
    // The inline head script has already chosen a theme; sync the label to it.
    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light", false);

    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  /* --- Restaurant filtering --------------------------------------------- */

  var list = document.getElementById("spot-list");
  var filterButtons = Array.prototype.slice.call(
    document.querySelectorAll(".filter[data-filter]")
  );
  var resetButton = document.getElementById("filter-reset");
  var countOutput = document.getElementById("filter-count");
  var emptyMessage = document.getElementById("filter-empty");

  if (!list || filterButtons.length === 0) {
    return; // Section not on the page; nothing else to wire up.
  }

  var spots = Array.prototype.slice.call(list.querySelectorAll(".spot"));
  var activeFilters = { budget: null, diet: null };

  function isVisible(spot) {
    if (activeFilters.budget && spot.dataset.budget !== activeFilters.budget) {
      return false;
    }

    if (activeFilters.diet) {
      var diets = (spot.dataset.diet || "").split(/\s+/);
      if (diets.indexOf(activeFilters.diet) === -1) {
        return false;
      }
    }

    return true;
  }

  function render() {
    var shown = 0;

    spots.forEach(function (spot) {
      var visible = isVisible(spot);
      spot.hidden = !visible;
      if (visible) {
        shown += 1;
      }
    });

    filterButtons.forEach(function (button) {
      var pressed = activeFilters[button.dataset.filter] === button.dataset.value;
      button.setAttribute("aria-pressed", String(pressed));
    });

    var isFiltered = Boolean(activeFilters.budget || activeFilters.diet);
    var noun = spots.length === 1 ? "spot" : "spots";

    if (resetButton) {
      resetButton.disabled = !isFiltered;
    }
    if (emptyMessage) {
      emptyMessage.hidden = shown !== 0;
    }
    if (countOutput) {
      countOutput.textContent = isFiltered
        ? "Showing " + shown + " of " + spots.length + " " + noun + "."
        : "Showing all " + spots.length + " " + noun + ".";
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var kind = button.dataset.filter;
      // Clicking the active choice clears it, so filters work as toggles.
      activeFilters[kind] =
        activeFilters[kind] === button.dataset.value ? null : button.dataset.value;
      render();
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      activeFilters.budget = null;
      activeFilters.diet = null;
      render();
    });
  }

  render();
})();
