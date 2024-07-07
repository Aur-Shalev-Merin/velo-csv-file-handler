import axios from 'axios';
import zlib from 'zlib';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import {getCallLogsCsvLink} from 'backend/apiCaller.jsw'

export async function fetchAndProcessCSV(userId, startUTC, endUTC) {
    try {
        console.log("Fetching CSV URL from the API...");
        const url = await getCallLogsCsvLink(userId, startUTC, endUTC);

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
        const desiredColumns = ['start_time', 'end_time', 'destination', 'duration'];
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
