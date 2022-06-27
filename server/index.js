var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const products = [{
  productId: 1,
  categoryIds: [1]
}, {
  productId: 2,
  categoryIds: [1, 2]
}]

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Product {
    productId: Int!
    categoryIds: [Int!]
  }

  input ProductInput {
    productId: Int!
    categoryIds: [Int!]
  }
  

  type Query {
    hello: String
    products(categoryId: Int!): [Product]

  }

  type Mutation {
    addProduct(product: ProductInput): Product
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  products: ({ categoryId }) => {
    return products
  },
  addProduct: (product) => {
    products.push(product)
    return products[0]
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
