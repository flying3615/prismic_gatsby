import styled from '@emotion/styled'

const Wrapper = styled.div`
  font-family: 'ZCOOL XiaoWei','Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding: 0 1.5rem;
  }
`

export default Wrapper
