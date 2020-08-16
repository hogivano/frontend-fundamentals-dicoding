import './card-item.js'

class Result extends HTMLElement {
    constructor() {
        super()
        this._countryRegion = null
        this._details = null
    }

    connectedCallback() {
        this.render()
    }

    set countryRegion(countryRegion) {
        this._countryRegion = countryRegion
        this.render()
    }

    set details(details) {
        this._details = details
        this.render()
    }

    render() {
        let deathsValue = 0
        let confirmedValue = 0
        let recoveredValue = 0
        let lastUpdate = null

        if (this._details !== null) {
            deathsValue = this._details.deaths.value
            confirmedValue = this._details.confirmed.value
            recoveredValue = this._details.recovered.value
            lastUpdate = this._details.lastUpdate
        }

        this.innerHTML = `
            <section id="result" class="result py-4 mb-5">
                <div class="mb-5">
                    <h1 class="is-size-5">
                        <b>
                            Recap Total In ${this._countryRegion}
                        </b>
                    </h1>
                    <p>
                        <small>Last Updated : ${new Date( Date.parse(lastUpdate))}</small>
                    </p>
                </div>
                <div class="columns is-vcentered">
                    <div class="column is-one-third is-full-mobile">
                        <div class="card">
                            <div class="card-header">
                                <p class="card-header-title has-text-grey-dark">
                                    Death
                                </p>
                            </div>
                            <div class="card-content has-background-danger">
                                <p class="title has-text-centered has-text-white">
                                    <b>
                                        ${deathsValue}
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third is-full-mobile">
                        <div class="card">
                            <div class="card-header">
                                <p class="card-header-title has-text-grey-dark">
                                    Confirmed
                                </p>
                            </div>
                            <div class="card-content has-background-warning">
                                <p class="title has-text-centered has-text-white">
                                    <b>
                                        ${confirmedValue}
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third is-full-mobile">
                        <div class="card">
                            <div class="card-header">
                                <p class="card-header-title has-text-grey-dark">
                                    Recovered
                                </p>
                            </div>
                            <div class="card-content has-background-primary">
                                <p class="title has-text-centered has-text-white">
                                    <b>
                                        ${recoveredValue}
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `
    }
}

customElements.define('wrap-result', Result)