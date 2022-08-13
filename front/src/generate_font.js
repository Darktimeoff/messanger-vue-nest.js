const webfontsGenerator = require('vusion-webfonts-generator');
const fs = require('fs');

fs.readdir('src/assets/icons', (err, items) => {
  if (err) {
    console.log('cant read res directory');
  }
  console.log(JSON.stringify(err, null, 2));
  console.log(JSON.stringify(items, null, 2));
  const files = items
    .filter((i) => i.toLowerCase().endsWith('.svg'))
    .map((i) => `src/assets/icons/${i}`);

  webfontsGenerator(
    {
      files,
      dest: 'src/assets/icons_flat',
      fontName: 'icons',

      html: true,
      normalize: true,
      round: 10e2,

      cssTemplate: 'src/assets/icons/font-css.hbs',
      templateOptions: {
        classPrefix: 'i-',
        baseSelector: '.i',
      },
      types: ['svg', 'ttf', 'woff', 'woff2', 'eot'],
    },
    (error) => {
      if (error) {
        console.log('Fail!', error);
      } else {
        console.log('Done!');
      }
    }
  );
});
