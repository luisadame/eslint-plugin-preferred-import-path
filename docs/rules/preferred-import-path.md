# Enforces a consistent use of preferred import paths (preferred-import-path/preferred-import-path)

Enforce the use of preferred import path, it allows to keep a consistent use of import paths that may be aliased of typescript
or webpack and you'd prefer your team to use the aliases, instead of relative paths, or absolute paths but that are longer and aliases
keep them short

**Fixable**: This rule is automatically fixable by using the `--fix` option on the command line.

## Rule details

This rule checks that import declaration sources are in line with the map of preferred paths.

This rule accepts an argument that conveys the paths you want to map to the preferred paths:

```js
// .eslintrc.js
module.exports = {
    rules: {
        'preferred-import-path/preferred-import-path': {
            'src/views', '@views',
            'src/components', '@components',
            'src/components/design-system', '@ui'
        }
    }
}
```

With this configuration when an import declaration is found it will check if the source of it is one of the keys of the map it will error/warn about the preference of using the value of such key.

For example, if we have this import:

```js
import { Modal } from 'src/components/Modal';
```

it will autofix to:

```js
import { Modal } from '@components/Modal';
```

## When not to use it

This rule is intended for projects that want to enforce a convention on the use of certain import declarations, most of the time this won't be the case and this rule won't be needed.
