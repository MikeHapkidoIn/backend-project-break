function baseHtml(title = 'Amason', content = '') {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${Tienda de Ropa}</title>
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
    ${content}
  </body>
  </html>
  `;
}

module.exports = baseHtml