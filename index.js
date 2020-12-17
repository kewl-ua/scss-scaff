const fs = require('fs');

const file = (name, data) => [name, 'file', data];
const dir = (name, nodes) => [name, 'dir', nodes];

const printNode = (node, level) => {
    const name = node[0];
    let tabs = '';

    for (let i = 0; i < level; i++) {
        tabs += '\t';
    }

    console.log(`${tabs}- ${name}`);
};

const printTree = (node, level = 0) => {
    const [name, type, content] = node;
    
    if (type === 'file') {
        printNode(node, level);
    } else {
        printNode(node, level);

        for (let i = 0; i < content.length; i++) {
            printTree(content[i], level + 1);
        }
    }
};

const hierarchy = dir('sass', [
    file('index.scss', '...'),
    dir('abstracts', [ file('_variables.scss', '...'), file('_mixin.scss', '...') ]),
    dir('base', [ file('_reset.scss', '...') ])
]);

printTree(hierarchy);