class AppBar extends HTMLElement {
    constructor() {
        super()
        this._shadowDOM = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.render()
    }

    render(){
        this._shadowDOM.innerHTML = `
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        :host {
            display: block;
            width: 100%;
            background-color: cornflowerblue;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }
        h1 {
            padding: 16px;
        }
        </style>
        <h1>Club Finder</h1>`
    }
}

customElements.define('app-bar', AppBar)