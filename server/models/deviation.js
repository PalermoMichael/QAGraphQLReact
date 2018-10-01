const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const classificationEnums = ['Major', 'Minor', 'Critical'];
const statusEnums = ['Void', 'Open', 'Closed'];
const deviationtypeEnums = ['Unplanned', 'Planned'];
const formattedDate = moment(Schema.occurrencedate).format('YYYY-MM-DD');

const DeviationSchema = new Schema({
    title: {
        type: String
    },
    user: {
          type: Schema.Types.ObjectId,
          ref: 'user'
      },
    owner: {
        type: String,
        ref: 'owner'
    },
    client: {
        type: Number,
        ref: 'client'
    },
    classification: {
            type: String,
            enum: classificationEnums
            },
    department: {
        type: String,
        enum: ["QC Micro", "Manufacturing", "QC Analytical", "Materials Management", "Validations", "Facilities", "QC Operations", "QA", "QA Doc Control" ]
    },
    status: {
        type: String,
        enum: statusEnums
    },
    deviationtype: {
        type: String,
        enum: deviationtypeEnums
    },
    occurencedate: {
        type: String,
        default: formattedDate
    },
    datediscovered: {
        type: String,
        default: formattedDate
    },
    dateassigned: {
        type: String,
        default: formattedDate
    },
    lots: [
        {
        type: Schema.Types.ObjectId,
        ref: 'lot'
        }
    ],
    description: [
        {
        type: Schema.Types.ObjectId,
        ref: 'description'
        }
    ],
    created: {
        type: Date,
        default: moment()
    } 
    },
    {usePushEach: true}
);

DeviationSchema.statics.addLot = function (id, contents) {
    const Lot = mongoose.model('lot');

    return this.findById(id)
        .then(deviation => {
            const lot = new Lot({ contents, deviation })
            deviation.lots.push(lot)
            return Promise.all([lot.save(), deviation.save()])
                .then(([ lot, deviation ]) => deviation);
        });
}

DeviationSchema.statics.addDescription = function (id, text) {
    const Description = mongoose.model('description');

    return this.findById(id)
        .then(deviation => {
            const description = new Description({ text, deviation })
            deviation.description.push(description)
            return Promise.all([ description.save(), deviation.save() ])
                .then(([ description, deviation ]) => deviation)
        });
}


DeviationSchema.statics.findDescription = function (id) {
    return this.findById(id)
        .populate('description')
        .then(deviation => deviation.description)
}

DeviationSchema.statics.findLots = function (id) {
    return this.findById(id)
        .populate('lots')
        .then(deviation => deviation.lots);
}

mongoose.model('deviation', DeviationSchema);