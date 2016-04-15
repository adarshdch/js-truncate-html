# js-truncate-html

Truncate html content

### Version
1.0.0

## Examples

### Pure Javascript Implementation

```sh
$ var truncater = new JsTruncateHtml({includeElipsis: true, elipsisLength: 5, elipsisCharacter: '-'});
$ truncater.truncate("Hello <b>World !!!</b>", 13);
```

Output: Hello <b>World !

### RequireJS Implementation

```sh
$ var MyTruncater = require('vendor/js-truncate-html/src/js-truncate-html');
$ MyTruncater.truncate("Hello <b>World !!!</b>", 13);
```

Output: Hello <b>World !


License
----

MIT