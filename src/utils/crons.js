


import {scheduleJob} from 'node-schedule'
import { bookModel } from '../../DB/Models/book.model.js'
import { Op } from 'sequelize';
export const overdueCron = ()=>{
    scheduleJob('* */24 * * * *',async()=>{
        const overdueBooks = await bookModel.findAll({
            where:{
                [Op.and]:[
                    {due_date:{[Op.lte]:new Date()}},
                    {book_status:'borrowed'}
                ]
            }
        })
       for (const book of overdueBooks) {
             await bookModel.update({is_over_Due:true},{where:{id:book.id}})
       }
    })
}