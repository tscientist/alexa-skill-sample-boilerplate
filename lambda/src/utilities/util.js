function formatSpecialCaracters(string) {
  return string
    .replace(/[&]/g, "&amp;")
    .replace(/["]/g, "&quot;")
    .replace(/[']/g, "&apos;")
    .replace(/[<]/g, "&lt;")
    .replace(/[>]/g, "&gt;");
}

module.exports = {
  formatSpecialCaracters,
};
