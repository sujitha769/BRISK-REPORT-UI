// For Vite, use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const generatePDFFromServer = async () => {
  try {
    // Get the report container HTML
    const reportContainer = document.getElementById('report-container');
    
    if (!reportContainer) {
      throw new Error('Report container not found');
    }

    console.log('Preparing report for PDF generation...');

    // Clone the container to avoid modifying the original
    const clone = reportContainer.cloneNode(true);

    // Remove any no-print elements from clone
    clone.querySelectorAll('.no-print').forEach(el => el.remove());

    // Get all stylesheets content
    let styles = '';
    
    // Get inline styles
    const styleElements = document.querySelectorAll('style');
    styleElements.forEach(style => {
      styles += style.innerHTML + '\n';
    });

    // Get external stylesheets
    try {
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            styles += rule.cssText + '\n';
          });
        } catch (e) {
          console.warn('Could not access stylesheet:', e);
        }
      }
    } catch (e) {
      console.warn('Error accessing stylesheets:', e);
    }

    // Create complete HTML document
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BRisk Report</title>
        <style>
          ${styles}
          
          /* Additional PDF-specific styles */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: white;
          }
          
          .no-print {
            display: none !important;
          }
          
          @page {
            margin: 15mm;
            size: A4;
          }
          
          table {
            page-break-inside: avoid;
          }
          
          .info-card, .component-card {
            page-break-inside: avoid;
          }
          
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
          }
          
          img, svg {
            max-width: 100%;
            page-break-inside: avoid;
          }
          
          /* Print-specific visibility */
          @media print {
            .print-only {
              display: block !important;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        ${clone.innerHTML}
      </body>
      </html>
    `;

    console.log('Sending request to server for PDF generation...');
    console.log('HTML size:', Math.round(htmlContent.length / 1024), 'KB');

    // Send request to backend
    const response = await fetch(`${API_URL}/api/pdf/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        htmlContent,
        filename: 'BRisk_Report.pdf'
      })
    });

    if (!response.ok) {
      let errorMessage = 'PDF generation failed';
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    console.log('Receiving PDF from server...');

    // Get the PDF blob
    const blob = await response.blob();

    console.log('PDF received, size:', Math.round(blob.size / 1024), 'KB');

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BRisk_Report.pdf';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);

    console.log('PDF downloaded successfully ✅');
    return true;

  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert(`Failed to generate PDF: ${error.message}\n\nPlease make sure the backend server is running on ${API_URL}`);
    return false;
  }
};