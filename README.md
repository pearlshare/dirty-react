Dirty React
===========
With a large react app, your `app.js` might not be delivered immediately, which means you may accidentally overwrite changes that were made between the page load and the client-side render.

##### DirtyReact to the rescue!

DirtyReact records the value of `input`'s and `textarea`'s on the page, so once a client-side render has occured, then the information call all be placed back.

Usage
-----
In your highest level component:
```js
var dirtyReact = require("dirty-react");

...
    componentWillMount: function () {
        dirtyReact.watch();
    },

    componentDidMount: function () {
        dirtyReact.replay();
    }
...
```

And bam! Any data entered into your webpage wont be lost!

License
-------
MIT
