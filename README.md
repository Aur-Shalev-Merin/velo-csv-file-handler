# velo-csv-file-handler
A Velo project that demonstrates how to fetch, process, edit, and download a CSV file in the backend.

Handling CSV files in Wix Velo can be quite challenging due to the limitations and complexities involved in fetching, processing, and downloading data within the Velo environment. After facing several issues and spending a significant amount of time finding a solution, I decided to share this project to help others who might encounter the same problems.

By providing a clear example of how to handle CSV files in Wix Velo, I hope to make it easier for developers to implement similar functionality in their own projects. Feel free to use this code, modify it to suit your needs, and share it with others who might benefit from it.

## Features

- Fetch CSV data from a remote URL
- Process the CSV data to include only specific columns
- Provide a download link for the processed CSV file

## Setup

1. **Clone the repository:**

   
   git clone https://github.com/Aur-Shalev-Merin/velo-csv-file-handler.git

2. **Open the project in Wix Editor and set up a page with the following elements:**

   -A button with the ID 'downloadButton'

   -An HTML iframe with the ID 'htmlElement'

   Add the DownloadCSVPage code to the page's code.

4. **Backend Code**

   Create a file named csvHandler.jsw in the Backend section of your Wix Editor and add the code in the repository.

## Summary

1. Frontend Interaction:
-The user interacts with the frontend by clicking a button (downloadButton) to initiate the CSV download process.
-The frontend uses Wix Velo's API to call a backend function (fetchAndProcessCSV).

2. Backend Processing:

-The backend function fetchAndProcessCSV is responsible for fetching, decompressing, processing, and converting the CSV data.
-It fetches a gzipped CSV file from a specified URL using axios.
-The fetched gzipped data is decompressed using zlib.
-The decompressed CSV data is parsed and filtered to retain specific columns using csv-parse.
-The filtered data is then converted back to a CSV format using csv-stringify.
-The processed CSV data is converted to a base64 string.

3. Returning Processed Data:

-The base64 encoded CSV data is returned to the frontend.

4. Download Link Creation:

-The frontend receives the base64 encoded CSV data.
-It dynamically creates an HTML content with a download link for the CSV file.
-This HTML content is set into an HTML iframe (htmlElement) on the page.
-The download link is automatically clicked to trigger the CSV file download.

## Overall Flow
-User clicks the button.
-Frontend calls the backend function.
-Backend fetches, processes, and converts the CSV data to base64.
-Backend returns the base64 data to the frontend.
-Frontend creates a download link and triggers the download.
