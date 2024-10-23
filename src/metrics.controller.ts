import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import { addReading, getReading, getReadingsByIndexedDate } from './database';
import { CatchExpressError } from './errorHandler';
import {  Reading } from './types.dt';


class MetricsController {

  saveData = CatchExpressError(async (req: Request, res: Response) => {
   
    const readings = req.body.trim().split("\n")
  
    // validate input
    for (let i = 0; i < readings.length; i++){
      let values = readings[i].split(" ")
      
      if(values.length < 3){
        return res.json({ success: false });
      }
 
      if( isNaN(values[0]) || typeof values[1] !== "string" ||  isNaN(values[2]) ){
        return res.json({ success: false });
      }
    }



    // convert input to appropriate format and save
    readings.forEach((element:string) => {

      let values = element.split(" ")
     
        const time = (Number(values[0]) * 1000)+values[1]
        const date = (new Date(Number(values[0]) * 1000).toISOString().slice(0,10))
        let reading : Reading = {
          time: new Date(Number(values[0]) * 1000),
          name: values[1],
          value: Number(values[2])
         
        }
      
        addReading(date, time,reading)
     
    
    });
  

    return res.json({ success: true });

  })


  getData = CatchExpressError(async (req: Request, res: Response) => {

    const { from, to } = req.query
    if(!from  || !to){
      return res.json({ success: false, message: "from date and to date must be specified" });
    }

      let fromDate = new Date(from?.toString())
      let toDate = new Date(to?.toString())


      const readingList: Array<Reading> = []

      if (fromDate > toDate) {
        return res.json({ success: false, message: "from date cannot be greater than to date" });
      }

      // query data based on specified from and to date
      while (fromDate <= toDate) {
        let dayReadingList: Array<Reading> = []
        dayReadingList = getReadingsByIndexedDate(fromDate.toISOString().substring(0, 10))

        if (dayReadingList.length) {

          readingList.push(...dayReadingList, this.calculatePower(dayReadingList, fromDate.toISOString().substring(0, 10)))
        }

        fromDate.setDate(fromDate.getDate() + 1)
      }

      return res.json(readingList);


  })

  // calculate power for the day using AVG(Current) * AVG(Voltage)
  calculatePower = (dayReadingList: Array<Reading>, date: string): Reading => {

    let dayCurrent = dayReadingList.filter(dr => dr.name === "Current")
    let averageCurrent = dayCurrent.reduce((acc, current) => acc + current.value, 0) / dayCurrent.length

    let dayVoltage = dayReadingList.filter(dr => dr.name === "Voltage")
    let averageVoltage = dayVoltage.reduce((acc, current) => acc + current.value, 0) / dayVoltage.length
    return {
      time: new Date(date),
      name: "Power",
      value: Number((averageCurrent * averageVoltage).toFixed(2))
    }

  }
}




export default MetricsController