import { connectHits, connectHighlight, connectStateResults } from 'react-instantsearch-dom'
import { stripHtml } from 'string-strip-html'

import utilStyles from '../styles/utils.module.css'

const CustomStatus = connectStateResults(({ searchState, searchResults}) => {
  const validQuery = searchState.query?.length >= 2

  return(
    <>
      {searchResults?.hits.length === 0 && validQuery && (<div><p>Aw snap! NO search results were found.</p></div> ) }
      {searchResults?.hits.length > 0 && validQuery && (
        <ul>
          {searchResults.hits.map((hit) => (
            <li key={hit.objectID} className={utilStyles.hitItem} >
              <div>
                <CustomHighlight hit={hit} attribute='title' ></CustomHighlight>
              </div>
              <small>
                <CustomHighlight hit={hit} attribute='description' ></CustomHighlight>
              </small>
            </li>
          ))}
        </ul>
      )}
    </>
  )
})

const CustomHighlight = connectHighlight( ({ highlight,attribute,hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  })

  return (
    <span>
      {parsedHit.map(
        (part, index) =>
          part.isHighlighted ? (
            <mark key={index}>{stripHtml(part.value).result}</mark>
          ) : (
            <span key={index}>{stripHtml(part.value).result}</span>
          )
      )}
    </span>
  )
})

const CustomHits = connectHits( ({ hits }) => {
  return (
    <ul className={utilStyles.hitList} >
      { hits.map(hit => {
        return (
          <li key={hit.objectID} className={utilStyles.hitItem} >
            <div>
              <CustomHighlight hit={hit} attribute='title' ></CustomHighlight>
            </div>
            <small>
              <CustomHighlight hit={hit} attribute='description' ></CustomHighlight>
            </small>
          </li>
        )
      })}
    </ul>
  )
})

export default CustomStatus
