import React  from 'react'
import styled from '@emotion/styled'
import AniLink from 'gatsby-plugin-transition-link/AniLink'



const ProjectListing = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 4rem;
  li {
    margin-bottom: 1.45rem;
    a {
      font-size: 2.369rem;
      font-style: normal;
      color: ${props => props.theme.colors.primaryLight};
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.777rem;
      }
    }
  }
`

export default function ProjectList ({projects}) {
  return (
    <ProjectListing>
    {projects.map(project => (
      <li key={project.primary.label.text}>
        <AniLink to={project.primary.link.url}>{project.primary.label.text}</AniLink>
      </li>
    ))}
  </ProjectListing>)
}