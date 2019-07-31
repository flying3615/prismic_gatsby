// run `gatsby build` to rebuild the index in algolia

const postQuery = `query MyQuery {
  allPrismicPost {
    edges {
      node {
        slugs
        data {
          date
          body {
            ... on PrismicPostBodyText {
              primary {
                text {
                  raw {
                    text
                  }
                }
              }
            }
            ... on PrismicPostBodyQuote {
              primary {
                quote {
                  raw {
                    text
                  }
                }
              }
            }
          }
          title {
            raw {
              text
            }
          }
          categories {
            category {
              document {
                data {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`

const flatten = arr =>
  arr.map(({ node: { slugs, data: { date, body, title, categories } } }) => ({
    date,
    text: body[0].primary.text.raw[0].text,
    quote: body[2].primary.quote.raw[0].text,
    title: title.raw[0].text,
    path: slugs[0],
    categories: categories.map(c => c.category.document[0].data.name),
  }))

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.allPrismicPost.edges),
    indexName: `Posts`,
    settings: { attributesToSnippet: [`text:20`] },
  },
]

module.exports = queries
