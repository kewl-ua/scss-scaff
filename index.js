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
            for (let i = 0; i < content.length; i++) {
                createTree(node, context + '/' + name);
            }
        }
    }
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
