class AppBar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
            <nav class="container" style="padding: 30px 0px;">
                <h1 class="has-text-centered is-size-3">
                    <b>${process.env.APP_NAME}</b>
                </h1>
            </nav>
        `
    }
}

customElements.define('app-bar', AppBar)