module.exports = {
    root: true,
    env: {
        node: true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'object-shorthand': 0,
        'no-shadow': 0,
        'no-param-reassign': 0,
        'consistent-return': 0,
        'import/extensions': 0,
        'max-len': 0,
        indent: ['error', 2]
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
};
