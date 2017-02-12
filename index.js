
const assert = require('assert');
const lodash = require('lodash');

const emptyNames = [
    'br', 'hr', 'img', 'input'
];

const render = (name, attributes, content) => {
    assert(name, 'name');
    if (attributes) {
        assert(typeof attributes, 'string', ['attributes', name].join(' '));
    }
    if (content) {
        assert(typeof content, 'string', ['content', name].join(' '));
        assert(!lodash.includes(emptyNames, name), name);
    }
    if (attributes && content) {
        return `<${name} ${attributes}>${content}</${name}>`;
    }
    if (attributes) {
        return `<${name} ${attributes}/>`;
    }
    if (content) {
        return `<${name}>${content}</${name}>`
    }
    return `<${name}/>`;
}

const h = {
    attributes(attributes) {
        return Object.keys(attributes).map(key => `${key}="${attributes[key]}"`).join(' ');
    },
    render({name, attributes = {}, content}) {
        return render(name, h.attributes(attributes), content);
    },
    element(name, attributes, ...content) {
        return render(name, h.attributes(attributes), content.join(''));
    },
    page(page) {
        return lodash.flatten([
            `<html>`,
            `<head>`,
            `<title>${page.title}</title>`,
            `<meta name="viewport" content="width=device-width, initial-scale=1">`,
            `</head>`,
            `<body>`,
            `<h1>${page.heading}</h1>`,
            page.content.map(h.render),
            `<br>`,
            `<hr>`,
            `<footer style="font-size: 11pt; color: #777">`,
            `Powered by`,
            h.element('a', {
                href: page.footerLink,
                style: "color: #777; text-decoration: none"
            }, page.footerLink),
            `</footer>`,
            `</body>`,
            `</html>`
        ]).join('\n');
    }
};

module.exports = h;
