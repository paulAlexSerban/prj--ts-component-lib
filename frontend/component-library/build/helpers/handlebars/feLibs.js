const process = require("process");

module.exports = function (group, category, name, variation, type) {
    let path =
        process.env.BASE_URL === undefined ? `/${group}/${category}/${name}/${variation}` : `${process.env.BASE_URL}/component-library/${group}/${category}/${name}/${variation}`;

    const feLibs = {
        css: `<link rel="stylesheet" href="${path}.css">`,
        js: `<script src="${path}.js" async defer></script>`,
        all: `<link rel="stylesheet" href="${path}.css"><script src="${path}.js" async defer></script>`,
    };

    return feLibs[type];
};

