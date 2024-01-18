const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: Date.now()
    },
    complete: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model("todo", TodoSchema)

module.exports = Todo;