const baseHtml = require('./baseHtml');
const getNavBar = require('./getNavBar');
const getProductCards = require('./getProductCards');

module.exports = function template(content) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      ${baseHtml()}
      <body>
        ${getNavBar()}
        <main>
          ${getProductCards(content)}
        </main>
        <script src="/js/nav.js"></script>
      </body>
    </html>
  `;
};