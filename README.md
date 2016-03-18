Dirty React
===========
With a large react app, your `app.js` might not be delivered immediately, which means you may accidentally overwrite changes that were made between the page load and the client-side render.

##### DirtyReact to the rescue!

DirtyReact creates listeners on all `input`'s and `textarea`'s in the page. Once your app has loaded and a client-side render has occurred, then all of the data is filled in.

Usage
-----

```html
<html>
    <head>
        <title>My react app!</title>
    </head>
    <body>
        ...
    
        <script type="text/javascript" src="/js/dirty_react.min.js"></script>
        <script type="text/javascript" src="/js/your_app.js"></script>
    </body>
</html>

```

You will also need to add the following code in your view's `componentDidMount`:
```js
    var m = document.createEvent("Event");
    m.initEvent("reactMount");
    window.dispatchEvent(m);
```

This will trigger an event informing DirtyReact that the first render has occurred.

And bam! Any data entered into your webpage wont be lost!

License
-------
MIT
