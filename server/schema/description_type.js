const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;
const Description = mongoose.model('description');

const DescriptionType = new GraphQLObjectType({
    name: 'DescriptionType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        text: {
            type: GraphQLString
        },
        deviation: {
            type: require('./deviation_type'),
            resolve(parentValue) {
                return Description.findById(parentValue).populate('deviation')
                    .then(description => {
                        console.log('description', description);
                        return description.deviation;
                    });
            }
        }
    })
});

module.exports = DescriptionType;
