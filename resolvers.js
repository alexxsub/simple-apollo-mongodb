module.exports = {
Query: {
        books: async (root, args, { book }) => {
            return await myfun({ book })
        }
    },
    Mutation: {
        addBook: async (_, { title, author }, { book }) => {
            const res = await new book({
                title,
                author
            }).save()
            return res
        }
    }
}
async function myfun(ctx)
{
    const books = ctx.book.find({})
    return books
}