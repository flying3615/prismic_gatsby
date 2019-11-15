import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { Layout, PostList, Wrapper, Title } from '../components'
import website from '../../config/website'
import Triangle from '../components/Triangle'
import ProjectList from "../components/Listing/ProjectList";
import FavoriteIcon from '@material-ui/icons/Favorite';

import { keyframes } from '@emotion/core'

const bounce = keyframes`
  0%  { bottom: 0; text-shadow: 0px 0px 5px #000000;}
  100%{ bottom: 50px;  text-shadow: 0px 50px 50px #000000;}
`

const beating = keyframes`
  0%   {transform: scale(0.7);}
  100% {transform: scale(1);}
`

const Hero = styled.header`
  display: flex;
  align-items: center;
  height: 100vh;
`

const HeroInner = styled(Wrapper)`
  padding-top: 13rem;
  padding-bottom: 13rem;
  h1 {
    margin-bottom: 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`

const HeroText = styled.div`
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1.7rem;
  display: inline-block;
  line-height: 1.4;
  margin-bottom: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    font-size: 1.4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.25rem;
  }
  animation: ${bounce} 0.8s cubic-bezier(0.1,0.25,0.1,1) 0s infinite alternate both;
`

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  li {
    display: inline;
    &:not([data-name='social-entry-0']) {
      margin-left: 2.5rem;
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${props => props.theme.colors.greyDark};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`

const SiteTitle = styled.h1`
  font-family: 'Lakki Reddy', cursive;
`

const BeatingHeart = styled(FavoriteIcon)`
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;

  color: red;
  animation: ${beating} 0.8s cubic-bezier(0.1,0.25,0.1,1) 0s infinite alternate both;
`

const IndexWrapper = Wrapper.withComponent('main')

const WriteBackground = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['20vh', '20vh']}
      width={['50vw', '50vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['10vh', '40vh']}
      width={['75vw', '70vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['15vh', '20vh']}
      width={['100vw', '100vw']}
    />
  </div>
)

class Index extends Component {
  render() {
    const {
      data: { homepage, social, posts, projects },
    } = this.props
    return (
      <Layout>
        <Hero>
          <HeroInner>
            <SiteTitle>{homepage.data.title.text}</SiteTitle>
            <BeatingHeart />
            <HeroText dangerouslySetInnerHTML={{ __html: homepage.data.content.html }} />
            <Social>
              {social.nodes.map((s, index) => (
                <li data-name={`social-entry-${index}`} key={s.primary.label.text}>
                  <AniLink to={s.primary.link.url}>{s.primary.label.text}</AniLink>
                </li>
              ))}
            </Social>
          </HeroInner>
        </Hero>
        <WriteBackground />
        <IndexWrapper id={website.skipNavId} style={{ paddingTop: '2rem', paddingBottom: '2rem', height: '100vh', marginTop:'25vh' }}>
          <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
          {/*TODO limit size...*/}
          <PostList posts={posts.nodes} />
          <Title style={{ marginTop: '8rem' }}>Recent projects</Title>
          <ProjectList projects={projects.nodes} />
        </IndexWrapper>
      </Layout>
    )
  }
}


export default Index

Index.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }),
      }),
    }),
    social: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    projects: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
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
    projects: allPrismicProjectsBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
`
