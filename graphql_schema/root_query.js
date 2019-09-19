const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean } = require("graphql");
const CommentType = require('./basic_types/CommentType');
const Comment_DB_model = require('../models/comment_database_model');
const User_DB_model = require('../models/user_database_model');
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        isValidUser: {
            type: GraphQLString,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                try {
                    if (args.username.trim().length <= 0 || args.password.trim().length <= 0) {
                        throw new Error("Invalid Username or Password");
                    }
                    let user = await User_DB_model.findOne({ username: args.username })
                    if (user.password === args.password) {
                        return user.id;
                    }
                    return '';
                }
                catch (e) {
                    return '';
                }
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            async resolve(parent, args) {
                return await Comment_DB_model.find({ parentComment: null });
            }
        },
        comment: {
            type: CommentType,
            args: {
                commentID: { type: GraphQLString }
            },
            async resolve(parent, args) {
                try {
                    if (args.commentID.trim().length <= 0) {
                        throw new Error("Invalid CommentID");
                    }

                    let r = await Comment_DB_model.findById(args.commentID);
                    return r;
                }
                catch (e) {
                    return null;
                }
            }

        }
    }
});

module.exports = RootQuery