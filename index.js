const fs = require('fs');

const file = (name, data) => [name, 'file', data];
const dir = (name, nodes) => [name, 'dir', nodes];

const createTree = (root, context = '.') => {
    const [name, type, content] = root;

    if (type === 'file') {
        fs.appendFileSync(context + '/' + name, content);
    } else {
        fs.mkdirSync(context + '/' + name);

        if (content) {
            content.forEach((node) => {
                createTree(node, context + '/' + name);
            });
        }
    }
};

const printTree = (root) => {
    const formatName = (name, level) => {
        let indent = '';

        for (let i = 0; i < level; i++) {
            indent += '    ';
        }

        return `${indent}--${name}`;
    };

    const iter = (node, level = 0) => {
        const [name, type, content] = node;
        const fName = formatName(name, level);

        console.log(fName);

        if (type === 'dir') {
            if (content) {
                content.forEach((c) => { iter(c, level + 1); });
            }
        }
    }

    iter(root);
};

const hierarchy = dir('sass', [
    file('index.scss', '/* Styles bundle */'),
    dir('abstracts', [
        file('_variables.scss', '/* Variables */'),
        file('_mixin.scss', '/* General purpose mixins */')
    ]),
    dir('base', [
        file('_reset.scss', '/* Reset styles */'),
        file('_fonts.scss', '/* Bulletproof fonts */'),
        file('_tags.scss', '/* Tags styles */')
    ]),
    dir('components'),
    dir('layout')
]);

createTree(hierarchy);
printTree(hierarchy);
