var isBrowser = typeof window !== "undefined" && global === window;

var dirtyReact;

if (isBrowser) {
  dirtyReact = {
    inputs: {
      values: {}, // values to be applied (by reactID)
      found: [].concat(
        [].slice.call(document.getElementsByTagName("input")),
        [].slice.call(document.getElementsByTagName("textarea"))
      ),
    },
    toFake: ["keydown", "keyup", "input"] // Events to fake
  };
}

module.exports = {
  watch: function () {
    if (dirtyReact === null || !isBrowser) {
      return false;
    }

    // Bind listener to all inputs
    for (var i = 0; i < dirtyReact.inputs.found.length; i++) {
      dirtyReact.elem = dirtyReact.inputs.found[i];
      dirtyReact.inputs.values[dirtyReact.elem.getAttribute("data-reactid").toString()] = dirtyReact.elem.value;
    }

    return true;
  },

  replay: function () {
    if (dirtyReact === null || !isBrowser) {
      return false;
    }

    // Find changed inputs
    dirtyReact.reactIds = Object.keys(dirtyReact.inputs.values);

    // Find elements that were created in render
    dirtyReact.changed = [];
    for (var i = 0; i < dirtyReact.reactIds.length; i++) {
      dirtyReact.newElement = document.querySelector("[data-reactid=\"" + dirtyReact.reactIds[i] + "\"]");

      if (dirtyReact.newElement !== null) {
        dirtyReact.changed.push(dirtyReact.newElement);
      }
    }

    // Update newly created elements with their new values
    for (var i = 0; i < dirtyReact.changed.length; i++) {
      dirtyReact.foundId = dirtyReact.changed[i].getAttribute("data-reactid").toString();
      dirtyReact.properValue = dirtyReact.inputs.values[dirtyReact.foundId];

      // Set to proper value
      dirtyReact.changed[i].value = dirtyReact.properValue;

      // Fake typing event to trigger any required react events that should have occured
      for (var t = 0; t < dirtyReact.toFake.length; t++) {

        // Create fake event of that type
        dirtyReact.fakeEvent = document.createEvent("Event");
        dirtyReact.fakeEvent.initEvent(dirtyReact.toFake[t], true, false);
        dirtyReact.changed[i].dispatchEvent(dirtyReact.fakeEvent); // Fire event
      }
    }

    // Allow garbage collection to clean up
    dirtyReact = null;
    return true;
  }
};
