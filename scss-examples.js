// scss/abstracts
const _variables =
`
/* Variables */
/* Examples */
/* Globals */
$global-font-size: 10px;
$global-font-family: 'Tahoma', 'Vardana', sans-serif;
/* ... */

/* Colors */
$white-1: #ffffff;
$grey-1: #909090;
/* ... */

/* Media */
$mobile-portrait: 320px;
$mobile-landscape: 480px;
$tablet: 768px;
/* ... */
`;

const _mixins =
`
/* General purpose mixins */
/* Example */
@mixin font($size, $weight: 400, $style: normal, $line-height: normal) {
    font-size: $size;
    font-weight: $weight;
    font-style: $style;
    line-height: $line-height;
}
/* ... */
`;

const _reset = 
`
/* User-agent stylesheets reset */
/* Example */
*, *::before, *::after {
    box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, p, ol, ul, li, body {
    margin: 0;
    padding: 0;
}

ul, li {
    list-style: none;
}

a {
    color: inherit;
    text-decoration: none;
}
/* ... */
`;

// scss/base
const _fonts = 
`
/* Web fonts */
/* Example */
@font-face {
    font-family: 'SegoeWPN';
    src: url('../fonts/segoe-wpn/SegoeWPN.eot');
    src: url('../fonts/segoe-wpn/SegoeWPN.eot?#iefix') format('embedded-opentype'),
        url('../fonts/segoe-wpn/SegoeWPN.svg#SegoeWPN') format('svg'),
        url('../fonts/segoe-wpn/SegoeWPN.ttf') format('truetype'),
        url('../fonts/segoe-wpn/SegoeWPN.woff') format('woff'),
        url('../fonts/segoe-wpn/SegoeWPN.woff2') format('woff2');
    font-display: swap;
    font-weight: normal;
    font-style: normal;
}
/* ... */
`;

const _tags = 
`
/* Tags stylesheets */
/* Example */
html {
    font-size: $global-font-size;
    font-family: $global-font-family;
    scroll-behavior: smooth;
}
/* ... */
`;

// scss/components
const _button = `
/* Reusable button */
/* Example */
@mixin button($color: $white-1, $bg-color: $blue-1) {
    @include font(2.2rem, 300);

    display: inline-block;
    min-width: 30px;
    padding: 8px 10px;
    border-radius: 3px;
    color: $color;
    text-align: center;
    background-color: $bg-color;

    &:hover {
        cursor: pointer;

        color: $bg-color;
        background-color: $color;
    }
}
`;

// scss/layout
const _header = 
`
/* Header styles */
`;

const _footer = 
`
/* Footer styles * /
`;

// scss
const index =
`
/* Bundle file */
/* Globals */
@import "abstracts/variables";
@import "abstracts/mixins";

/* Base */
@import "base/fonts";
@import "base/reset";
@import "base/tags";

/* General purpose components */
@import "components/button";
/* ... */

/* Layout components */
@import "layout/header";
@import "layout/footer";
/* ... */
`;

const examples = {
    abstracts: {
        _variables,
        _mixins
    },
    base: {
        _reset,
        _fonts,
        _tags
    },
    components: {
        _button
    },
    layout: {
        _header,
        _footer
    },
    index
};

module.exports = examples;