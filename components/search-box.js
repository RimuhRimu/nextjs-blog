import { connectSearchBox } from 'react-instantsearch-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import utilStyles from '../styles/utils.module.css'

const CustomInput = ({ refine }) => {
  return (
    <>
      <form id="formSearch" className={utilStyles.formSearch}>
        <FontAwesomeIcon
          icon={'search'}
          className={utilStyles.searchIcon}
          size="lg"
        >
        </FontAwesomeIcon>
        <input
          id="search"
          type="search"
          className={utilStyles.search}
          onChange={(e) => refine(e.currentTarget.value)}
          placeholder="Type the post you're looking for"
        />
      </form>
    </>
  )
}

export default connectSearchBox(CustomInput)
