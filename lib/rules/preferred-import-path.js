/**
 * @fileoverview Rule to ensure the consistent use of preferred import paths
 * @author Luis Adame Rodríguez <https://github.com/luisadame>
 */

'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'enforce the consistent use of preferred import paths',
      category: 'Stylistic issues',
      recommended: false,
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        additionalProperties: {
          type: 'string',
        },
      },
    ],
  },
  create: function (context) {
    const pathMapping =
      context.options[0] && Object.entries(context.options[0]);

    return {
      ImportDeclaration(node) {
        if (!pathMapping) return;

        const mappedPath = pathMapping.find(
          ([path]) =>
            path === node.source.value || node.source.value.includes(path)
        );

        if (!mappedPath) return;

        const [path, preferred] = mappedPath;

        context.report({
          node: node.source,
          message: `\`${preferred}\` is preferred over \`${path}\``,
          fix(fixer) {
            return fixer.replaceText(
              node.source,
              node.source.raw.replace(path, preferred)
            );
          },
        });
      },
    };
  },
};
