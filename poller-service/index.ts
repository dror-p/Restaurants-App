import * as fs from "fs";
import * as path from "path";
import rp from 'request-promise';
import { parse } from 'csv-parse';
import { Pool, PoolClient } from 'pg';

type restaurant = {
  name: string;
  type: string;
  phone: string;
  address: string;
};

const apiKey = 'ask Dror';//move to config

const pool = new Pool({
    connectionString: 'ask Dror',//move to config
});

async function getAddress(lat: number, lon: number): Promise<string> {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
        const response = await rp(url);
        const jsonData = JSON.parse(response);
        console.log(jsonData);
        if (jsonData.results.length > 0) {
            return jsonData.results[0].formatted_address;
        } else {
            throw new Error("No address found for the given coordinates: " + lat + ", " + lon);
        }
    } catch (err) {
        console.log("Error: " + err);
        throw err;
    }
}

let previousTimestamp = 0;

const checkAndRun = async () => {
    const csvFilePath = path.resolve(__dirname, 'files/restaurants.csv');  
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
  }, (error, result: restaurant[]) => {
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

async function insertToDB(restaurants: restaurant[]) {
    try {
      const client: PoolClient = await pool.connect();
      await client.query('DELETE FROM restaurants');
      for (const restaurant of restaurants) {
        const { name, type, address, phone } = restaurant;
        const query = `INSERT INTO restaurants (name, restauranttype, address, phone) VALUES ('${name}', '${type}', '${address}', '${phone}')`;
        await client.query(query);
      }
      client.release();
    } catch (err) {
      console.error(err);
    }
  }
  