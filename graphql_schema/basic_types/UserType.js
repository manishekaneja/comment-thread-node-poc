const { GraphQLObjectType, GraphQLString } = require("graphql");
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    })
});

module.exports = UserType;
