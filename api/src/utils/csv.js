// One CSV cell. A leading = + - @ would be run as a formula by spreadsheets, so it is neutralised.
function csvCell(value) {
  let s = String(value == null ? '' : value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

// BOM first so Excel opens Hindi / Marathi text correctly.
function toCsv(columns, rows) {
  const lines = [columns.join(',')].concat(rows.map((row) => columns.map((c) => csvCell(row[c])).join(',')));
  return '﻿' + lines.join('\n');
}

module.exports = { toCsv };
