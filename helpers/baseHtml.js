// helpers/baseHtml.js

// Plantilla HTML
function baseHtml(title = 'Amason', content = '') {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link rel="stylesheet" href="/css/styles.css" />
    </head>
    <body>
      ${content} 
    </body>
  </html>
  `;
}

// Exportamos 
module.exports = baseHtml;