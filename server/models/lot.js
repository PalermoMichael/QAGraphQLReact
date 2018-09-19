const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LotSchema = new Schema({
    deviation: {
        type: Schema.Types.ObjectId,
        ref: 'deviation'
    },
    contents: {
        type: String
    }
});

// LotSchema.statics.like = function (id) {
//     const Lot = mongoose.model('lot');

//     return Lot.findByIdAndRemove(id)
//         .then(lot => {
//             ++lot.likes;
//             return lot.save();
//         })
// }

mongoose.model('lot', LotSchema);