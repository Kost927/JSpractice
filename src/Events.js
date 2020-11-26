class Events {
    constructor() {
        this.events = {};
    }

    subscribe(type, listener) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);

    }
    publish(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(listener => listener(arg));
        }
    }
}



export const events = new Events();