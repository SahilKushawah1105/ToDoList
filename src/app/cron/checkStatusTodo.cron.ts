import cron from 'node-cron';
import moment from 'moment-timezone';
import ToDo from '../model/ToDo.model';
const cronTime = '0 0 * * *';


cron.schedule(cronTime, async () => {
    try {
        const findTodos: any = await ToDo.find();

        const currentDate = moment().format('YYYY/MM/DD')

        findTodos.map(async (todo:any) =>{
            if(todo.dueDate > currentDate){
                await ToDo.findByIdAndUpdate({_id : todo._id}, { completed: true }, {new: true});
            }
        })
    } catch (error) {
        console.log("-----todo cron error-----", error);
    }
})