import { mergeTypes } from "merge-graphql-schemas";
import { szeGraphQL } from "szeutils";

import user from "./user";
import stock from "./stock";
import portfolio from "./portfolio";

const typeDefs = [user.schema, stock.schema, portfolio.schema];
const resolverDefs = [user.resolvers, stock.resolvers, portfolio.resolvers];

// all: true merges types of the same kind (like Query)
const schema = mergeTypes(typeDefs, { all: true });
const resolvers = szeGraphQL.mergeResolvers(resolverDefs);

export default {
  schema,
  resolvers,
  user: user.model,
  stock: stock.model,
  portfolio: portfolio.model
};
