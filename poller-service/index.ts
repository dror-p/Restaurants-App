import * as fs from "fs";
import * as path from "path";
import rp from 'request-promise';
import { parse } from 'csv-parse';
import { Pool, PoolClient } from 'pg';

type resturant = {
  name: string;
  type: string;
  phone: string;
  address: string;
};

const apiKey = 'AIzaSyBj2dU8iIBi8hfinE2S4HkJkrVJ4HApG-E';

const pool = new Pool({
    connectionString: 'postgres://tcnqdocx:emo367LMybZni_Tu5a8c9vs1bo5CM_sH@trumpet.db.elephantsql.com:5432/tcnqdocx',
});

async function getAddress(lat: number, lon: number): Promise<string> {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
        const response = await rp(url);
        const jsonData = JSON.parse(response);
        if (jsonData.results.length > 0) {
            return jsonData.results[0].formatted_address;
        } else {
            throw new Error("No address found for the given coordinates");
        }
    } catch (err) {
        console.log("Error: " + err);
        throw err;
    }
}

let previousTimestamp = 0;

const checkAndRun = async () => {
    const csvFilePath = path.resolve(__dirname, 'files/resturants.csv');  
    const headers = ['name', 'type', 'phone', 'address'];
    const fileStat = await fs.promises.stat(csvFilePath);

    if (fileStat.mtimeMs === previousTimestamp) {
        console.log("No changes to the file, not running the function");
        return;
    }
    previousTimestamp = fileStat.mtimeMs;
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    parse(fileContent, {
    delimiter: ',',
    columns: headers,
    fromLine: 2,
    cast: function(columnValue, context) {
        if (context.column === 'address') {
            const latlon = columnValue.split('/');
            const lat: number  = Number(latlon[0]);
            const lon: number = Number(latlon[1]);
            return getAddress(lat, lon);
          }
        return columnValue;                    
    }
  }, (error, result: resturant[]) => {
    if (error) {
      console.error(error);
    }
    Promise.all(result.map(res => res.address)).then((addresses) => {
        result.forEach((res, i) => {
            res.address = addresses[i];
        });
        insertToDB(result);
    });
  });
}
setInterval(checkAndRun, 1000);

async function insertToDB(restaurants: resturant[]) {
    try {
      const client: PoolClient = await pool.connect();
      await client.query('DELETE FROM resturants');
      for (const restaurant of restaurants) {
        const { name, type, address, phone } = restaurant;
        const query = `INSERT INTO resturants (name, resturanttype, address, phone) VALUES ('${name}', '${type}', '${address}', '${phone}')`;
        await client.query(query);
      }
      client.release();
    } catch (err) {
      console.error(err);
    }
  }
  