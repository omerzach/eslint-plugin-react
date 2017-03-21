/**
 * @fileoverview Tests for void-dom-elements-no-children
 * @author Joe Lencioni
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var rule = require('../../../lib/rules/void-dom-elements-no-children');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

function errorMessage(elementName) {
  return 'Void DOM element <' + elementName + ' /> cannot receive children.';
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('void-dom-elements-no-children', rule, {
  valid: [
    {
      code: '<div>Foo</div>;',
      parserOptions: parserOptions
    },
    {
      code: '<div children="Foo" />;',
      parserOptions: parserOptions
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
      parserOptions: parserOptions
    },
    {
      code: 'React.createElement("div", {}, "Foo");',
      parserOptions: parserOptions
    },
    {
      code: 'React.createElement("div", { children: "Foo" });',
      parserOptions: parserOptions
    },
    {
      code: 'React.createElement("div", { dangerouslySetInnerHTML: { __html: "Foo" } });',
      parserOptions: parserOptions
    }, {
      code: 'document.createElement("img")',
      parserOptions: parserOptions
    }, {
      code: 'React.createElement("img");',
      parserOptions: parserOptions
    }, {
      code: [
        'import React from "react";',
        'const { createElement } = React;',
        'createElement("div")'
      ].join('\n'),
      parser: 'babel-eslint',
      parserOptions: parserOptions
    }, {
      code: [
        'import React from "react";',
        'const { createElement } = React;',
        'createElement("img")'
      ].join('\n'),
      parser: 'babel-eslint',
      parserOptions: parserOptions
    }
  ],
  invalid: [
    {
      code: '<br>Foo</br>;',
      errors: [{message: errorMessage('br')}],
      parserOptions: parserOptions
    },
    {
      code: '<br children="Foo" />;',
      errors: [{message: errorMessage('br')}],
      parserOptions: parserOptions
    },
    {
      code: '<img {...props} children="Foo" />;',
      errors: [{message: errorMessage('img')}],
      parserOptions: parserOptions
    },
    {
      code: '<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
      errors: [{message: errorMessage('br')}],
      parserOptions: parserOptions
    },
    {
      code: 'React.createElement("br", {}, "Foo");',
      errors: [{message: errorMessage('br')}],
      parserOptions: parserOptions
    },
    {
      code: 'React.createElement("br", { children: "Foo" });',
      errors: [{message: errorMessage('br')}],
      parserOptions: parserOptions
    },
    {
      code: 'React.createElement("br", { dangerouslySetInnerHTML: { __html: "Foo" } });',
      errors: [{message: errorMessage('br')}],
      parserOptions: parserOptions
    },
    {
      code: [
        'import React from "react";',
        'const createElement = React.createElement;',
        'createElement("img", {}, "Foo");'
      ].join('\n'),
      errors: [{message: errorMessage('img')}],
      parser: 'babel-eslint',
      parserOptions: parserOptions
    },
    {
      code: [
        'import React from "react";',
        'const createElement = React.createElement;',
        'createElement("img", { children: "Foo" });'
      ].join('\n'),
      errors: [{message: errorMessage('img')}],
      parser: 'babel-eslint',
      parserOptions: parserOptions
    },
    {
      code: [
        'import React from "react";',
        'const createElement = React.createElement;',
        'createElement("img", { dangerouslySetInnerHTML: { __html: "Foo" } });'
      ].join('\n'),
      errors: [{message: errorMessage('img')}],
      parser: 'babel-eslint',
      parserOptions: parserOptions
    }
  ]
});
