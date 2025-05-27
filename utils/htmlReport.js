function generateReportHTML(alerts) {
  const alertItems = alerts
    .map(
      (alert) => `
    <tr>
      <td>${alert.url}</td>
      <td>${alert.alert}</td>
      <td>${alert.description}</td>
      <td>${alert.confidence}</td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Security Report</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
          h1 { color: #333; text-align: center; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .report-header { margin-bottom: 20px; }
          .report-footer { margin-top: 30px; font-size: 0.8em; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="report-header">
          <h1>Security Scan Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <p>Total alerts found: ${alerts.length}</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Alert</th>
              <th>Description</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            ${alertItems}
          </tbody>
        </table>
        
        <div class="report-footer">
          <p>This report was generated automatically by the security scanning system.</p>
        </div>
      </body>
    </html>
  `;
}

module.exports = { generateReportHTML };
