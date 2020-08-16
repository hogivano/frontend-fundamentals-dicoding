import '../components/club-list.js'
import '../components/search-bar.js'

import DataSource from '../data/data-source.js'

const main = () => {
    const searchElement = document.querySelector('search-bar')
    const clubListElement = document.querySelector('club-list')

    const onButtonSearchClicked = async () => {
        try {
            const result = await DataSource.searchClub(searchElement.value)
            renderResult(result)
        } catch (message){
            fallbackResult(message)
        }
    }

    const renderResult = result => {
        clubListElement.clubs = result
    }

    const fallbackResult = message => {
        clubListElement.renderError(message)
    }

    searchElement.clickEvent = onButtonSearchClicked
}


export default main