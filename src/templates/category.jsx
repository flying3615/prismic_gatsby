import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Layout, PostList, Wrapper, Title, SEO } from '../components'
import website from '../../config/website'

const Hero = styled.header`
  padding-top: 8rem;
  padding-bottom: 4rem;
  h1 {
    color: ${props => props.theme.colors.bg};
  }
`

const Headline = styled.h1`
  text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF; 
`

const CatWrapper = Wrapper.withComponent('main')

const Category = ({
  pageContext: { category },
  data: {
    posts: { nodes, totalCount },
  },
  location,
}) => (
  <Layout>
    <SEO title={`Category: ${category} | ${website.titleAlt}`} pathname={location.pathname} />
    <Hero>
      <Wrapper>
        <Headline>{category}</Headline>
      </Wrapper>
    </Hero>
    <CatWrapper id={website.skipNavId}>
      <Title style={{ marginTop: '4rem' }}>
        {totalCount} {totalCount === 1 ? 'Post' : 'Posts'} {totalCount === 1 ? 'was' : 'were'} tagged with "{category}"
      </Title>
      <PostList posts={nodes} />
    </CatWrapper>
  </Layout>
)

export default Category

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    posts: allPrismicPost(
      sort: { fields: [data___date], order: DESC }
      filter: {
        data: {
          categories: { elemMatch: { category: { document: { elemMatch: { data: { name: { eq: $category } } } } } } }
        }
      }
    ) {
      totalCount
      nodes {
        uid
        data {
          title {
            text
          }
          date(formatString: "DD.MM.YYYY")
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
`
