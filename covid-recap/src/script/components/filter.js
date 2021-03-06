import SlimSelect from 'slim-select'

class Filter extends HTMLElement {
    constructor() {
        super()
        this._country = []
    }

    connectedCallback() {
        this.render()
    }

    set filterEvent(event) {
        this._filterEvent = event
    }

    set resetEvent(event) {
        this._resetEvent = event
        this.render()
    }

    get valueCountry() {
        return this.querySelector('#select-country').value
    }

    set valueCountry(valueCountry) {
        this.querySelector('#select-country').value = valueCountry
        this.render()
    }

    set country(country) {
        this._country = country
        this.render()
    }

    render() {
        let listOption = '<option selected disabled value="">Select Country</option>'
        if (this._country.length > 0) {
            this._country.forEach(country => {
                (country.iso2 !== undefined) ? listOption += `<option value="${country.iso2}">${country.name}</option>` : ''
            })
        }

        this.innerHTML = `
        <section id="section-filter" class="mb-1" style="overflow:hidden;">
            <div class="columns is-vcentered">
                <div class="column is-half is-full-mobile">
                    <div class="field">
                        <span class="select">
                            <select id="select-country" name="country">
                                ${listOption}
                            </select>
                        </span>
                    </div>
                </div>
                <div class="column is-half is-full-mobile" style="float:right">
                    <div class="buttons" style="float:right">
                        <button id="btn-filter" class="button is-success is-light">Filter</button>
                        <button id="btn-reset" class="button is-white">Reset</button>
                    </div>
                </div>
            </div>
        </section>
        `

        //btn click on filter
        const btnFilter = document.querySelector("#btn-filter")
        const btnReset = document.querySelector("#btn-reset")

        btnFilter.addEventListener("click", this._filterEvent)
        btnReset.addEventListener("click", this._resetEvent)
    }
}

customElements.define('wrap-filter', Filter)