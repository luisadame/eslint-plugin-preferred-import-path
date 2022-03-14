/**
 * @fileoverview Enforces a consisten use of conditional expressions with ternaries or logical expressions with and operator
 * @author Luis Adame
 */

const test = require('ava');
const RuleTester = require('eslint-ava-rule-tester');
const rule = require('../../../lib/rules/preferred-import-path');
const { stripIndent } = require('common-tags');

const validTestCases = [
  {
    code: `import { Button } from 'module'`,
  },
  {
    code: `import * as Button from 'module'`,
  },
  {
    code: `import Button from 'module'`,
  },
  {
    code: `import { Button } from '../../a-path'`,
  },
  {
    code: `import { default as Button } from 'component/Button'`,
  },
];

const invalidTestCases = [
  {
    code: `import { Button } from 'module'`,
    output: `import { Button } from 'custom-module'`,
    options: [
      {
        module: 'custom-module',
      },
    ],
    errors: [
      {
        message: '`custom-module` is preferred over `module`',
        line: 1,
        column: 24,
        endLine: 1,
        endColumn: 32,
      },
    ],
  },
  {
    code: `import * as Button from 'module'`,
    output: `import * as Button from 'custom-module'`,
    options: [{ module: 'custom-module' }],
    errors: [
      {
        message: '`custom-module` is preferred over `module`',
        line: 1,
        column: 25,
        endLine: 1,
        endColumn: 33,
      },
    ],
  },
  {
    code: `import Button from '@/components/Button'`,
    output: `import Button from '@ui/Button'`,
    options: [{ '@/components/Button': '@ui/Button' }],
    errors: [
      {
        message: '`@ui/Button` is preferred over `@/components/Button`',
        line: 1,
        endLine: 1,
        column: 20,
        endColumn: 41,
      },
    ],
  },
];

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
};

const ruleTester = new RuleTester(test, {
  parserOptions,
});

ruleTester.run('preferred-import-path', rule, {
  valid: validTestCases,
  invalid: invalidTestCases,
});
