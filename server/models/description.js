const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DescriptionSchema = new Schema({
    deviation: {
        type: Schema.Types.ObjectId,
        ref: 'deviation'
    },
    text: {
        type: String
    }
});

mongoose.model('description', DescriptionSchema);