module.exports = {
    parser: '@babel/eslint-parser',
    env: {
        es2021: true,
    },
    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:sonarjs/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-native',
        'react-hooks',
        'sonarjs',
        'prettier',
        'jsdoc',
    ],
    rules: {
        // Reglas para eslint
        'arrow-body-style': 'warn',
        'linebreak-style': 'off',
        'max-len': ['error', { code: 200 }],
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_root'],
            },
        ],
        'no-param-reassign': 0,
        'no-shadow': 'off',
        'operator-linebreak': 'off',
        'object-curly-newline': 'off',
        // Reglas para eslint-config-prettier
        'prettier/prettier': 'error',
        // Reglas para eslint-plugin-react
        'react/jsx-closing-bracket-location': [1, 'line-aligned'],
        'react/no-multi-comp': [
            'error',
            {
                ignoreStateless: true,
            },
        ],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js'],
            },
        ],
        'react/function-component-definition': [
            // Agrega arrow-function a regla de eslint-config-airbnb https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js#L527
            2,
            {
                namedComponents: ['function-declaration', 'function-expression', 'arrow-function'],
                unnamedComponents: ['function-expression', 'arrow-function'],
            },
        ],
        // Reglas para eslint-plugin-react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        // Reglas para eslint-plugin-import
        'import/no-named-as-default': 'off',
        'import/no-extraneous-dependencies': 0,
        // Reglas para eslint-plugin-react-native
        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 2,
        'react-native/no-inline-styles': 2,
        'react-native/no-color-literals': 2,
        'react-native/no-raw-text': 'off',
        'react-native/no-single-element-style-arrays': 2,
        // jsdocs
        'jsdoc/check-access': 1, // Recommended
        'jsdoc/check-alignment': 1, // Recommended
        'jsdoc/check-indentation': 1,
        'jsdoc/check-line-alignment': 1,
        'jsdoc/check-param-names': ['warn', { checkRestProperty: true }], // Recommended
        'jsdoc/check-property-names': 1, // Recommended
        'jsdoc/check-syntax': 1,
        'jsdoc/check-tag-names': ['warn', { definedTags: ['component', 'hook'] }], // Recommended
        'jsdoc/check-types': 1, // Recommended
        'jsdoc/check-values': 1, // Recommended
        'jsdoc/empty-tags': 1, // Recommended
        'jsdoc/implements-on-classes': 1, // Recommended
        'jsdoc/match-description': 1,
        'jsdoc/multiline-blocks': 1,
        'jsdoc/newline-after-description': 1, // Recommended
        'jsdoc/no-bad-blocks': 1,
        'jsdoc/no-defaults': 0,
        'jsdoc/no-multi-asterisks': 1, // Recommended
        'jsdoc/no-undefined-types': 1, // Recommended
        'jsdoc/require-asterisk-prefix': 1,
        'jsdoc/require-description': 1,
        'jsdoc/require-description-complete-sentence': 1,
        'jsdoc/require-hyphen-before-param-description': 1,
        'jsdoc/require-jsdoc': 1, // Recommended
        'jsdoc/require-param-description': 1, // Recommended
        'jsdoc/require-param-name': 1, // Recommended
        'jsdoc/require-param-type': 1, // Recommended
        'jsdoc/require-property': 1, // Recommended
        'jsdoc/require-property-description': 1, // Recommended
        'jsdoc/require-property-name': 1, // Recommended
        'jsdoc/require-property-type': 1, // Recommended
        'jsdoc/require-returns-check': 1, // Recommended
        'jsdoc/require-returns-description': 1, // Recommended
        'jsdoc/require-returns-type': 1, // Recommended
        'jsdoc/require-throws': 1,
        'jsdoc/require-yields': 1, // Recommended
        'jsdoc/require-yields-check': 1, // Recommended
        'jsdoc/tag-lines': 1, // Recommended
        'jsdoc/valid-types': 1, // Recommended
    },
    globals: {
        fetch: false,
        jest: false,
        test: false,
        expect: false,
        describe: false,
        beforeEach: false,
        afterEach: false,
        window: false,
        __DEV__: false,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js'],
                paths: ['src'],
            },
        },
    },
    overrides: [
        {
            files: ['**/*.test.js'],
            env: {
                jest: true,
            },
        },
    ],
};