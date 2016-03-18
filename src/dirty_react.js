var dirtyReact = {
  inputs: {
    changes: {}, // Changes to be applied (by reactID)
    found: [].concat(
      [].slice.call(document.getElementsByTagName("input")),
      [].slice.call(document.getElementsByTagName("textarea"))
    ),
  },
  toFake: ["keydown", "keyup", "input"], // Events to fake
  registerInputChange: function (e) {
    var target = e.target; // An input
    var reactid = target.getAttribute("data-reactid").toString();

    dirtyReact.inputs.changes[reactid] = target.value; // Record current value
  }
};

// Bind listener to all inputs
for (var i = 0; i < dirtyReact.inputs.found.length; i++) {
  dirtyReact.inputs.found[i].addEventListener("keyup", dirtyReact.registerInputChange);
}

// Called when first client render occurs
window.addEventListener("reactMount", function () {
  if (dirtyReact === null) {
    return;
  }

  // Unbind listener
  for (var i = 0; i < dirtyReact.inputs.found.length; i++) {
    dirtyReact.inputs.found[i].removeEventListener("keyup", dirtyReact.registerInputChange);
  }

  // Find changed inputs
  dirtyReact.reactIds = Object.keys(dirtyReact.inputs.changes);

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
    dirtyReact.reactid = dirtyReact.changed[i].getAttribute("data-reactid").toString();
    dirtyReact.properValue = dirtyReact.inputs.changes[dirtyReact.reactid];

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
});