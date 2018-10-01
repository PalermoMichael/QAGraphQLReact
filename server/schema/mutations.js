const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLEnumType
} = graphql;
const mongoose = require('mongoose');
const Deviation = mongoose.model('deviation');
const Lot = mongoose.model('lot');
const DeviationType = require('./deviation_type');
const LotType = require('./lot_type');
const UserType = require('./user_type');
const CapaType = require('./capa_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDeviation: {
            type: DeviationType,
            args: {
                title: {
                    type: GraphQLString
                },
                owner: {
                    type: GraphQLString
                },
                client: {
                    type: GraphQLInt
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
                }},
            resolve(parentValue, {
                title,
                owner,
                client,
                classification,
                department,
                status,
                deviationtype,
                occurencedate,
                datediscovered,
                dateassigned
            }) {
                return (new Deviation({
                    title,
                    owner,
                    client,
                    classification,
                    department,
                    status,
                    deviationtype,
                    occurencedate,
                    datediscovered,
                    dateassigned
                })).save();
            }
        },
        addCapa: {
            type: CapaType,
            args: {
                title: {
                    type: GraphQLString
                },
                client: {
                    type: GraphQLInt
                },
                capaOwner: {
                    type: GraphQLString
                },
                assignedBy: {
                    type: GraphQLString
                },
                department: {
                    type: GraphQLString
                },
                investigationstatus: {
                    type: GraphQLString
                },
                capaplanstatus: {
                    type: GraphQLString
                },
                effectivenessstatus: {
                    type: GraphQLString
                },
                investigationduedate: {
                    type: GraphQLString
                },
                effectivenessduedate: {
                    type: GraphQLString
                },
                dateassigned: {
                    type: GraphQLString
                }},
                resolve(parentValue, {
                    title,
                    client,
                    capaOwner,
                    assignedBy,
                    department,
                    capaplanstatus,
                    effectivenessstatus,
                    investigationstatus,
                    investigationduedate,
                    effectivenessduedate,
                    dateassigned
                }) {
                    return (new Capa({
                        title,
                        client,
                        capaOwner,
                        assignedBy,
                        department,
                        investigationstatus,
                        capaplanstatus,
                        effectivenessduedate,
                        effectivenessstatus,
                        investigationduedate,
                        dateassigned
                    })).save();
            }
        },
        updateDeviation:{           
            type: DeviationType,
            args: {
                id: { type: GraphQLID },
                status: {type: GraphQLString}
            },
            resolve(parentValue, { id, status }) {
                return new Promise((resolve, reject) => {
                    Deviation.findOneAndUpdate(
                        {"_id": id},
                        {"$set": {status: status, id: id} },
                        {"new": true}
                    ).exec((err, res) => {
                        console.log('test', res)
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
                
            }
        },
        addLotToDeviation: {
            type: DeviationType,
            args: {
                contents: { type: GraphQLString },
                deviationId: { type: GraphQLID }
            },
            resolve(parentValue, { contents, deviationId }) {
                return Deviation.addLot(deviationId, contents);
            }
        },
        addDescriptionToDeviation: {
            type: DeviationType,
            args: {
                text: { type: GraphQLString },
                deviationId: { type: GraphQLID }
            },
            resolve(parentValue, { text, deviationId }) {
                return Deviation.addDescription(deviationId, text);
            }
        },
        deleteLot: {
            type: LotType,
            args: { id: { type: GraphQLID }},
            resolve(parentValue, { id }) {
                return Lot.remove({
                  _id: id
                });
        }},
        deleteDeviation: {
            type: DeviationType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parentValue, {
                id
            }) {
                return Deviation.remove({
                    _id: id
                });
            }
        },
        signup: {
                type: UserType,
                args: {
                    name: {
                        type: GraphQLString
                    },
                    password: {
                        type: GraphQLString
                    }
                },
                resolve(parentValue, {
                    name,
                    password
                }, req) {
                    return AuthService.signup({
                        name,
                        password,
                        req
                    });
                }
            },
            logout: {
                type: UserType,
                resolve(parentValue, args, req) {
                    const {
                        user
                    } = req;
                    req.logout();
                    return user;
                }
            },
            login: {
                type: UserType,
                args: {
                    name: {
                        type: GraphQLString
                    },
                    password: {
                        type: GraphQLString
                    }
                },
                resolve(parentValue, {
                    name,
                    password
                }, req) {
                    return AuthService.login({
                        name,
                        password,
                        req
                    });
                }
            }
    }});

module.exports = mutation;
