const { GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList } = require("graphql");
const UserType = require("./UserType");
const User_DB_model = require('../../models/user_database_model');
const Comment_DB_model = require('../../models/comment_database_model');
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLString },
        message: { type: GraphQLString, },
        postedBy: {
            type: UserType,
            async resolve(parent, args) {
                let user = await User_DB_model.findById(parent.postedBy);
                return { ...user["_doc"], id: user["id"], password: "****" };
            }
        },
        likes: { type: GraphQLInt },
        postedOn: { type: GraphQLString },
        dislikes: { type: GraphQLInt },
        childComments: {
            type: new GraphQLList(CommentType),
            async resolve(parent, args) {
                let resultComments = []
                if (parent.childComments && parent.childComments.length > 0) {
                    for (let commentId of parent.childComments) {
                        let commentObject = await Comment_DB_model.findById(commentId);
                        resultComments.push(commentObject);
                    }
                    return resultComments;
                }
                else {
                    return []
                }
            }
        },
        parentComment: {
            type: CommentType,
            resolve(parent, args) {
                if (!!parent.parentComment) {
                    return Comment_DB_model.findById(parent.parentComment)
                }
                else {
                    return null;
                }
            }
        }
    })
});

module.exports = CommentType;


        // name: { type: GraphQLString },
        // age: { type: GraphQLInt },
        // books: {
        // type: new GraphQLList(BookType),
        // resolve(parent, args){
        // return Book.find({ authorId: parent.id });
        // }
        // }
