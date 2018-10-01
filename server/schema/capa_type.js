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

const DocType = require('./doc_type');
const CommentType = require('./comment_type');
const DescriptionType = require('./description_type');
const Capa = mongoose.model('capa');

const CapaType = new GraphQLObjectType({
	name: 'CapaType',
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
		},
		docs: {
			type: new GraphQLList(DocType),
			resolve(parentValue) {
				return Capa.findDocs(parentValue.id);
			}
		},
		description: {
			type: new GraphQLList(DescriptionType),
			resolve(parentValue) {
				return Capa.findDescription(parentValue.id);
			}
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parentValue) {
                return Capa.findComments(parentValue.id)
            }
        }
	})
});

module.exports = CapaType;
