import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import { addReading, getReadingsByDate } from './database';
import { CatchExpressError } from './errorHandler';
import {  Reading } from './types.dt';


class MetricsController {

  saveData = CatchExpressError(async (req: Request, res: Response) => {
   
    const readings = req.body.trim().split("\n")
  

    for (let i = 0; i < readings.length; i++){
      let values = readings[i].split(" ")
      
      if(values.length < 3){
        return res.json({ success: false });
      }
 
      if( isNaN(values[0]) || typeof values[1] !== "string" ||  isNaN(values[2]) ){
        return res.json({ success: false });
      }
    }



    
    readings.forEach((element:string) => {

      let values = element.split(" ")
     
        const dateTime = new Date(Number(values[0]) * 1000)
        let reading : Reading = {
          time: dateTime,
          name: values[1],
          value: Number(values[2])
         
        }

        addReading(uuidv4(), reading)
    
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

      while (fromDate <= toDate) {
        let dayReadingList: Array<Reading> = []
        dayReadingList = getReadingsByDate(fromDate.toISOString().substring(0, 10))

        if (dayReadingList.length) {

          readingList.push(...dayReadingList, this.calculatePower(dayReadingList, fromDate.toISOString().substring(0, 10)))
        }

        fromDate.setDate(fromDate.getDate() + 1)
      }


      return res.json(readingList);


  })


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