const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} = graphql;
const Deviation = mongoose.model('deviation');
const Lot = mongoose.model('lot');
const Description = mongoose.model('description');
const DeviationType = require('./deviation_type');
const LotType = require('./lot_type');
const DescriptionType = require('./description_type');
const User = mongoose.model('user');
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        deviations: {
            type: new GraphQLList(DeviationType),
            args: {
                status: {
                    type: GraphQLString
                },
                department: {
                    type: GraphQLString
                }
            },
            resolve() {
                return Deviation.find({});
            }
        },
        deviation: {
            type: DeviationType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parentValue, {
                id
            }) {
                return Deviation.findById(id);
            }
        },
        openDeviations: {
            type: DeviationType,
            args: {
                status: {
                    type: GraphQLString
                },
            },
            resolve(parentValue, {
                status
            }){
                return filter(deviations, { status: "Open"})
            }
        },
        lot: {
            type: LotType,
            args: {
                // id: {
                //     type: new GraphQLNonNull(GraphQLID)
                // },
                contents: {
                    type: new GraphQLNonNull(GraphQLString)
                }

            },
            resolve(parentValue, {
                id,
                contents,
                deviation
            }) {
                return Lot.findById(id);
            }
        },
        lots: {
            type: new GraphQLList(LotType),
            resolve() {
                return Lot.find({});
            }
        },
        description: {
            type: DescriptionType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parentValue, {
                id
            }) {
                return Description.findById(id);
            }
        },
        user: {
            type: UserType,
            resolve(parentValue, args, req) {
                return req.user;
            }
        },
        users: {
        type: new GraphQLList(UserType),
        resolve() {
        return User.find({});
            },
        }
    })
});

module.exports = RootQueryType;
