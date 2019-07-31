import React from 'react'
import styled from 'styled-components'
import { Algolia } from 'styled-icons/fa-brands/Algolia'

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const HitsWrapper = styled.div`
  max-height: 80vh;
  z-index: 100;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: #f7f5f2;
  color: black;
  border-radius: 3px;
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      padding: 0.1em 0.4em;
    }
  }
`

export const PoweredBy = () => (
  <span style={{ fontSize: '0.6em', textAlign: 'end', padding: 0 }}>
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
)
