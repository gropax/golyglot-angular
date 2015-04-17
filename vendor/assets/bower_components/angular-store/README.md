Angular Store
========

Persistent storage for Angular

Tries localstorage first, then IE's persistent storage and if all fails: cookies.

```
bower install --save angular-storage
```

### Dependencies:
- JSON3

### API

require:

```
var Store = require('path/to/Store.js');
```

Store strings:

```
Store.set('key1', 'hello world');
var result = Store.get('key1');
```

Store string for 2 hours:

```
Store.set('key1', 'hello world', 2);
var result = Store.get('key1');
```

Store objects: (objects get stringified)

```
Store.set('key2', { name: 'havelaer' });
var result = Store.get('key2');
```

### NB
For the IE fallback, don't forget to include the following:
In the ```<head>```:

```
<style type="text/css"> .storeuserData { behavior: url(#default#userData); } </style>
```

And in the ```<body>```:

```
<form id="oPersistForm" style="display: none;"><input class="storeuserData" type="hidden" id="oPersistInput"></form>
```

