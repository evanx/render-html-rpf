
const h = require('./index.js');

console.log(h.page({
    title: 'Page Title',
    heading: 'Page Heading',
    footerLink: 'https://github.com/evanx/render-html-rpf',
    content: [
        {
            name: 'p',
            content: 'Welcome'
        }
    ]
}));
