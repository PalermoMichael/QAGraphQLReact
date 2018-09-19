const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLEnumType
} = graphql;

const LotType = require('./lot_type');
const DescriptionType= require('./description_type');
const Deviation = mongoose.model('deviation');

const DeviationType = new GraphQLObjectType({
    name: 'DeviationType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        client: {
            type: GraphQLInt
        },
        owner: {
            type: GraphQLString
        },
        classification: {
            type: GraphQLString
        },
        department: {
            type: GraphQLString
        },
        status: {
             type: GraphQLString
        },
        deviationtype: {
            type: GraphQLString
        },
        occurencedate: {
            type: GraphQLString
        },
        datediscovered: {
            type: GraphQLString
        },
        dateassigned: {
            type: GraphQLString
        },
        lots: {
            type: new GraphQLList(LotType),
            resolve(parentValue) {
                return Deviation.findLots(parentValue.id);
            }
        },
        description: {
            type: new GraphQLList(DescriptionType),
            resolve(parentValue) {
                return Deviation.findDescription(parentValue.id);
            }
        }
    })
});

module.exports = DeviationType;
