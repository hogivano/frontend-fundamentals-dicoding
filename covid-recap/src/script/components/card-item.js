class CardItem extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    set detail(detail){
        this.detail = detail
    }

    get detail() {
        return this.detail
    }

    render() {
        this.innerHTML = `
            <article class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        ${detail.style.title}
                    </p>
                </header>
                <main class="card-content">
                    ${detail.number}
                </main>
            </article>
        `
    }
}

customElements.define('card-item', CardItem)