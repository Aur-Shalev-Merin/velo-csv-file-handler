// Import necessary modules
import { fetchAndProcessCSV } from 'backend/csvHandler.jsw'; // Backend function to fetch and process CSV data
import wixUsers from 'wix-users'; // Wix Users API

// Code to run when the page is ready
$w.onReady(function () {
    console.log("Page is ready.");
    $w('#box67').hide(); // Ensure the loading icon is hidden initially
    $w('#text43').hide(); // Hide the error message initially

    // Set up the button click event handler
    $w('#button1').onClick(() => {
        //remember to remove the ocnsole.log after testing
        console.log("Button clicked.");
        
        // Call the backend function to fetch and process the CSV data
        fetchAndProcessCSV(wixUsers.currentUser.id) 
            .then(base64Data => {
                const fileName = 'filtered_data.csv'; // Name of the CSV file to download
                const mimeType = 'text/csv'; // MIME type for CSV
                const link = `data:${mimeType};base64,${base64Data}`; // Create data URL for the CSV

                // Prepare the HTML content with the download link
                const htmlContent = `
                    <!DOCTYPE html>
                    <html>
                    <body>
                        <a id="downloadLink" href="${link}" download="${fileName}">Download CSV</a>
                        <script>
                            document.getElementById('downloadLink').click();
                        </script>
                    </body>
                    </html>
                `;

                // Set the content of the HTML component
                $w('#htmlElement').src = `data:text/html;base64,${btoa(htmlContent)}`;
            })
            .catch(error => {
                console.error('Error fetching or processing CSV:', error);
                $w('#text43').text = 'Error fetching or processing CSV: ' + error.message; // Display error message
                $w('#text43').show();
            })
    });
});
