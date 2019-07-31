import { InstantSearch, Index, Hits, connectStateResults } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useState, useEffect, createRef } from 'react'
import { Root, HitsWrapper, PoweredBy } from './styles'
import Input from './input'
import PostHit from './hitComps'

const Results = connectStateResults(({ searchState: state, searchResults: res, children }) =>
  res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
  let newEvents
  if (!events) {
    newEvents = [`mousedown`, `touchstart`]
  }
  const detectClickOutside = event => !ref.current.contains(event.target) && handler()
  useEffect(() => {
    newEvents.forEach(event => document.addEventListener(event, detectClickOutside))
    return () => {
      newEvents.forEach(event => document.removeEventListener(event, detectClickOutside))
    }
  })
}

export default function Search({ collapse, hitsAsGrid }) {
  const ref = createRef()
  const [queryStr, setQueryStr] = useState('')
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
  useClickOutside(ref, () => setFocus(false))

  const show = queryStr && queryStr.length > 0 && focus ? { display: 'grid' } : { display: 'none' }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="Posts"
      onSearchStateChange={({ query }) => {
        setQueryStr(query)
      }}
      root={{ Root, props: { ref } }}
    >
      <CssBaseline />
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />

      <HitsWrapper asGrid={hitsAsGrid} style={show}>
        <Index key="Posts" indexName="Posts">
          <header>
            <h2>Blog Posts</h2>
            <Stats />
          </header>
          <Results>
            <Hits hitComponent={PostHit(() => setFocus(false))} />
          </Results>
        </Index>

        <PoweredBy />
      </HitsWrapper>
    </InstantSearch>
  )
}

Search.propTypes = {
  collapse: PropTypes.bool.isRequired,
  hitsAsGrid: PropTypes.bool.isRequired,
}
