import '../components/result.js'
import '../components/filter.js'
import '../components/mapbox.js'
import '../components/detail-result.js'

import { toast } from "bulma-toast"

function home() {
    const filterElement = document.querySelector('wrap-filter')
    const resultElement = document.querySelector('wrap-result')
    const detailResultElement = document.querySelector('detail-result')
    const mapboxElement = document.querySelector('wrap-map')

    const centeredMap = async(country) => {
        try {
            const resDetail = await fetch(`${process.env.BASE_URL}/countries/${country}`)
            const resDetailJson = await resDetail.json()

            resultElement.details = resDetailJson

            await fetch(`${process.env.BASE_URL}/countries/${country}/confirmed`)
                .then(response => {
                    return response.json()
                })
                .then(responseJson => {
                    console.log(responseJson)
                    if (responseJson.length > 0) {
                        mapboxElement.markerOnMap = responseJson
                        resultElement.countryRegion = responseJson[0].countryRegion
                        detailResultElement.details = responseJson
                    }
                })
        } catch (error) {
            toast({
                message: "<h2>Sorry, server error. Please try again</h2>",
                type: "is-danger",
                position: "bottom-center",
                dismissible: true,
                closeOnClick: true
            })
        }
    }

    const getCountry = () => {
        fetch(`${process.env.BASE_URL}/countries`)
            .then(response => {
                return response.json()
            }).then(responseJson => {
                renderAllCountry(responseJson.countries)
            })
    }

    const renderAllCountry = (countries) => {
        filterElement.country = countries
    }

    const filterClick = () => {
        centeredMap(filterElement.valueCountry)
    }

    const resetClick = () => {
        centeredMap('ID')
        filterElement.valueCountry = ""
    }

    //init awal
    getCountry()
    centeredMap('ID')
    filterElement.filterEvent = filterClick
    filterElement.resetEvent = resetClick
}

export default home