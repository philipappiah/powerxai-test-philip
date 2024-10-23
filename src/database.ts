

// This is a fake database which stores data in-memory while the process is running

import { Reading } from "./types.dt";

const readings : Record<string, Reading> = {};
const database: Record<string, Record<string,Reading>> = {};


/**
 * Store a reading in the database using the given key
 */
export const addReading = (day: string,time:string, reading: Reading): Reading => {
  readings[time] = reading
  database[day] = readings;

  return reading;
};



/**
 * Retrieve a reading from the database using the given key
 */
export const getReading = (key: string):  Record<string,Reading> => {
  return database[key];
};


export const getReadingsByIndexedDate = (date:string): Array<Reading>   => {
  if(database[date]){
  return Object.keys(database[date]).map(key => database[date][key])
  }
  return []
};

