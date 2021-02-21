const fs = require('fs');
const scssExamples = require('./scss-examples');

const node = (name, child) => [name, child];

const file = (name, data) => node(name, data);
const dir = (name, children) => node(name, children);

const getName = node => node[0];
const getChild = node => node[1];

const NODE_TYPES = {
    FILE: 'file',
    DIR: 'dir'
};

const type = (node) => {
    const child = getChild(node);

    if (Array.isArray(child)) {
        return NODE_TYPES.DIR;
    }
    
    if (typeof child === 'string') {
        return NODE_TYPES.FILE;
    }

    return null;
};

const isFile = node => type(node) === 'file';
const isDir = node => type(node) === 'dir';

// FS debug
const FSNodeStr = (node, level) => {
    const DEPTH_SYMBOL = '  ';
    const PREFIX_SYMBOL = '--';

    const prefixStr = (str, prefixSymbol, level) => {
        var prefixedStr = str;

        for (let i = 0; i < level; i++) {
            prefixedStr = prefixSymbol + prefixedStr;
        }

        return prefixedStr;
    };

    let result = getName(node);

    result = prefixStr(result, PREFIX_SYMBOL, level);
    result = prefixStr(result, DEPTH_SYMBOL, level);

    return result;
};

const printFSNode = (node, level = 0) => {
    console.log(FSNodeStr(node, level));
};

const printFS = (fs) => {
    const iter = (node, level) => {
        printFSNode(node, level);

        const child = getChild(node);

        if (isDir(child)) {
            for (var c of child) {
                iter(c, level + 1);
            }
        }
    };

    return iter(fs, 0);
};

// FS
const makeFSDir = (path) => {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        console.error(`Failed to create a directory ${path}: `, e);
    }
};

const makeFSFile = (path, content) => {
    try {
        fs.writeFileSync(path, content);
    } catch (e) {
        console.error(`Failed to create a file ${path}: `, e);
    }
};

const FS_DELIMITER = '/';

const makeFS = (node, context = '') => {
    const child = getChild(node);
    const prefix = context ? context + FS_DELIMITER : '';
    const path = prefix + getName(node);

    switch (type(node)) {
        case NODE_TYPES.DIR:
            makeFSDir(path);

            if (isDir(child)) {
                for (let c of child) {
                    makeFS(c,  path);
                }
            }
            break;
        case NODE_TYPES.FILE:
        default:
            makeFSFile(path, child);
            break;
    }
};

const fsTree = dir('scss', [
    file('index.scss', scssExamples.index),
    dir('abstracts', [
        file('_variables.scss', scssExamples.abstracts._variables),
        file('_mixins.scss', scssExamples.abstracts._mixins)
    ]),
    dir('base', [
        file('_reset.scss', scssExamples.base._reset),
        file('_fonts.scss', scssExamples.base._fonts),
        file('_tags.scss', scssExamples.base._tags)
    ]),
    dir('components', [
        file('_button.scss', scssExamples.components._button)
    ]),
    dir('layout', [
        file('_header.scss', scssExamples.layout._header),
        file('_footer', scssExamples.layout._footer)
    ])
]);

printFS(fsTree);
makeFS(fsTree);
