const { GraphQLObjectType, GraphQLString } = require('graphql')
const UserType = require('./basic_types/UserType');
const CommentType = require('./basic_types/CommentType');
const Comment_DB_model = require('../models/comment_database_model');
const User_DB_model = require('../models/user_database_model');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let username = args.username.trim(),
                    password = args.password.trim();
                if (username.length <= 0 || password.length < 0) {
                    throw new Error("Bad Username/Password")
                }
                let oldUser = await User_DB_model.find({ username: username })
                if (oldUser.length > 0) {
                    throw new Error("User Already Exist. Enter Unique Username")
                }
                let user = new User_DB_model({
                    username: username,
                    password: password
                });
                let newUser = await user.save()
                return newUser;
            }
        },
        addComment: {
            type: CommentType,
            args: {
                message: { type: GraphQLString },
                postedBy: { type: GraphQLString },
                parentComment: { type: GraphQLString, defaultValue: null }
            },
            async resolve(parent, args) {
                try {
                    let postedBy = args.postedBy.trim(), message = args.message.trim(), parentComment = args.parentComment.trim();

                    if (postedBy.length <= 0 || message.length <= 0) {
                        throw new Error("Invalid Value");
                    }
                    let user = await User_DB_model.findById(postedBy);
                    if (!user) {
                        throw new Error("Invalid User ID")
                    }
                    parentComment = await Comment_DB_model.findById(parentComment);
                    let comment = new Comment_DB_model({
                        message: message,
                        postedBy: user._id,
                        parentComment: parentComment.id
                    });
                    let res = await comment.save()
                    if ((!!parentComment.childComments) && parentComment.childComments.length > 0) {
                        parentComment.childComments = [...parentComment.childComments, comment.id]
                    }
                    else {
                        parentComment.childComments = [comment.id]
                    }
                    await parentComment.save();
                    return res;
                }
                catch (e) {
                    return e;
                }
            }
        },
        addTopComment: {
            type: CommentType,
            args: {
                message: { type: GraphQLString },
                postedBy: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    let postedBy = args.postedBy.trim(), message = args.message.trim();

                    if (postedBy.length <= 0 || message.length <= 0) {
                        throw new Error("Invalid Value");
                    }
                    let user = await User_DB_model.findById(args.postedBy);
                    if (!user) {
                        throw new Error("Invalid User ID")
                    }
                    let comment = new Comment_DB_model({
                        message: message,
                        postedBy: user._id,
                    });
                    return comment.save();
                }
                catch (e) {
                    return e;
                }
            }
        },

        editComment: {
            type: CommentType,
            args: {
                newMessage: { type: GraphQLString },
                commentID: { type: GraphQLString },
                postedBy: { type: GraphQLString }
            },
            async resolve(parent, args) {
                try {
                    let commentID = args.commentID.trim(), newMessage = args.newMessage.trim(), postedBy = args.postedBy.trim();
                    let comment = await Comment_DB_model.findById(commentID);
                    if (!comment || comment.length <= 0) {
                        throw new Error("Comment not Found in Database");
                    }
                    if (postedBy === comment.postedBy.toString()) {
                        comment.message = newMessage;
                        return await comment.save();
                    }
                    else {
                        throw new Error("Invalid attempt")
                    }
                }
                catch (e) {
                    return null;
                }
            }
        },
        likeComment: {
            type: CommentType,
            args: {
                commentId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                try {
                    let commentId = args.commentId.trim();
                    let comment = await Comment_DB_model.findById(commentId);
                    if (!comment || comment.length <= 0) {
                        throw new Error("Comment not Found in Database");
                    }
                    comment.likes = comment.likes + 1;
                    return await comment.save();
                }
                catch (e) {
                    return null;
                }
            }
        },
        dislikeComment: {
            type: CommentType,
            args: {
                commentId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                try {
                    let commentId = args.commentId.trim();
                    let comment = await Comment_DB_model.findById(commentId);
                    if (!comment || comment.length <= 0) {
                        throw new Error("Comment not Found in Database");
                    }
                    comment.dislikes = comment.dislikes + 1;
                    return await comment.save();
                }
                catch (e) {
                    return null;
                }
            }
        }
    }
});

module.exports = Mutation;