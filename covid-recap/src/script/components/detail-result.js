class DetailResult extends HTMLElement {
    constructor() {
        super()
        this._details = []
    }

    connectedCallback() {
        this.render()
    }

    set details(details) {
        this._details = details
        this.render()
    }

    render() {
        this.innerHTML = `
        <div id="detail-result" class="py-4 mb-5">
            <div class="mb-5">
                <h1 class="is-size-5">
                    <b>
                        Details Recap In ${(this._details.length > 0) ? this._details[0].countryRegion : 'undefined'}
                    </b>
                </h1>
            </div>
            <div class="table-container">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Province</th>
                            <th>City</th>
                            <th>Active</th>
                            <th class="has-text-danger">Deaths</th>
                            <th class="has-text-warning">Confirmed</th>
                            <th class="has-text-success">Recovered</th>
                            <th>Incident Rate</th>
                        </tr>
                    </thead>  
                    <tbody id="table-body">
                    </tbody>
                </table>  
            </div>
        </div>    
        `

        const tableBodyElement = this.querySelector('#table-body')
        this._details.forEach(detail => {
            tableBodyElement.appendChild(
                `<tr>
                    <th>${(detail.provinceState == null) ? "-" : detail.provinceState}</th>
                    <td>${(detail.admin2 == null) ? "-" : detail.admin2}</td>
                    <td>${detail.active}</td>
                    <td>${detail.deaths}</td>
                    <td>${detail.confirmed}</td>
                    <td>${detail.recovered}</td>
                    <td>${detail.incidentRate.toFixed(2)}</td>
                </tr>`
            )
        })
    }
}

customElements.define('detail-result', DetailResult)