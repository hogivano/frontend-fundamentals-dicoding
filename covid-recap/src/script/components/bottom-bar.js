class BottomBar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="has-background-dark">
            <nav class="container" style="padding: 12px;">
                <p class="has-text-centered has-text-white is-size-7">
                    by <a href="https://hogivano.web.id" class="has-text-white">
                        <b>hogivano.</b>
                    </a> The source api from
                    <a href="http://opensource.org/licenses/mit-license.php" class="has-text-white">
                        <b>Mathdroid.</b>
                    </a>
                </p>
            </nav>
        </div>
        `
    }
}

customElements.define('bottom-bar', BottomBar)