const Task = require('../models/task');
const Status = require('../models/status');

let updateTask = async (id, abr_status, data, reset = false) => {
    let task = await Task.findById(id);

    if (!task)
        throw Error("Validation failed: id is required");
    let status;
    if (abr_status) {
        status = await Status.findOne({ abr: abr_status });
    } else {
        status = { _id: task.status };
    }

    let timer = 0;
    if (!reset) {
        timer = task.current_time || 0;
        if (data.startDate && status.abr === 'P') {
            let start_date = new Date(task.startDate);
            timer += (data.startDate.getTime() - start_date.getTime());
        }
    }
    let changes = {
        ...data,
        current_time: timer,
        status: status ? status._id : undefined,

    }

    let taskDB = await Task.findByIdAndUpdate(task._id, changes, { new: true, runValidators: true });
    return await taskDB.populate('status').execPopulate();

};
module.exports = {
    updateTask
}