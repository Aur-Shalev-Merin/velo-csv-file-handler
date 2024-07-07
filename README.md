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
