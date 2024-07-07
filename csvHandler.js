import axios from 'axios';
import zlib from 'zlib';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import {getCallLogsCsvLink} from 'backend/apiCaller.jsw' 
//input your own backend here; this class is used for dealing with APIs that return a URL pointing to a gzipped CSV file, should be quite simple to change it to suit your needs;



export async function fetchAndProcessCSV(userId, startUTC, endUTC) {
    try {
        //remember to comment out the console.log after you are done with testing
        console.log("Fetching CSV URL from the API...");

        //however you implement this is up to you, ut should return a URL pointed to a gzipped csv file...
        const url = await getCsvLink(userId, startUTC, endUTC);

        // Fetch the compressed file
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        console.log("Fetched file successfully, decompressing...");
        
      // Decompress the gzip file
        const buffer = Buffer.from(response.data);
        const decompressedBuffer = zlib.gunzipSync(buffer);
        const csvData = decompressedBuffer.toString('utf8');
        console.log("Decompressed file successfully, processing CSV data...");

        // Process the CSV data to filter the columns
        const filteredCSV = await processCSV(csvData);

        console.log("CSV data processed successfully.");
        
        // Convert CSV data to base64
        const base64Data = Buffer.from(filteredCSV).toString('base64');
        
        // Return the base64 encoded CSV data
        return base64Data;
    } catch (error) {
        console.error('Error fetching or processing CSV:', error);
        throw error;
    }
}

function processCSV(csvData) {
    return new Promise((resolve, reject) => {

        //add the columns you want to keep
        const desiredColumns = ['start_time', 'end_time', 'ect....'];
        const results = [];
        const parser = parse({
            columns: true,
            trim: true
        });

        parser.on('readable', () => {
            let record;
            while ((record = parser.read())) {
                const filteredRecord = {};
                desiredColumns.forEach(column => {
                    filteredRecord[column] = record[column];
                });
                results.push(filteredRecord);
            }
        });

        parser.on('error', err => {
            console.error("Error parsing CSV data:", err);
            reject(err);
        });

        parser.on('end', () => {
            console.log("Finished parsing CSV data.");
            stringify(results, { header: true }, (err, output) => {
                if (err) {
                    console.error("Error stringifying CSV data:", err);
                    reject(err);
                } else {
                    console.log("CSV data stringified successfully.");
                    resolve(output);
                }
            });
        });

        console.log("Starting to parse CSV data...");
        parser.write(csvData);
        parser.end();
    });
}
