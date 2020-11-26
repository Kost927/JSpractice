class Events {
    constructor() {
        this.events = {};
    }

    subscribe(type, subscriber) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(subscriber);

    }
    broadcast(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(subscriber => subscriber(arg));
        }
    }
}



export const events = new Events();