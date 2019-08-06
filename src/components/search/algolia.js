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

// TODO defect here...
const flatten = arr =>
  arr.map(({ node: { slugs, data: { date, body, title, categories } } }) => {
    const slices = body
      .map(b => {
        const entry = {}
        if (b.primary) {
          const type = Object.keys(b.primary)[0]
          const value = b.primary[type].raw.map(r => r.text).join('')
          entry[type] = value
        }
        return entry
      })
      .reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {}
      )

    return {
      date,
      ...slices,
      title: title.raw[0].text,
      path: slugs[0],
      categories: categories.map(c => c.category.document[0].data.name),
    }
  })

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.allPrismicPost.edges),
    indexName: `Posts`,
    settings: { attributesToSnippet: [`text:20`] },
  },
]

module.exports = queries
