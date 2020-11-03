const { ApolloServer, gql } = require('apollo-server'),
mongoose = require('mongoose'),
 typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
  type Mutation { 
       addBook (title: String,author: String): Book
  }
`;

const BookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    }
})

const book = mongoose.model('Book', BookSchema)
const resolvers = require('./resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { book }
});



async function boot() {

   await mongoose
  .connect(
    'mongodb://localhost:27017/test',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      retryWrites: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    }
  )
  .then(() => console.log(`🎉  Mongo connected ${process.env.MONGO_URI}`))
  .catch((err) => console.error(err))

  await server.listen({port: 5010}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
}

boot()