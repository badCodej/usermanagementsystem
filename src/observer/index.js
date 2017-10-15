let observerPatternUniqueInstanceName = null

class EventObserver {
    constructor() {
        if(!observerPatternUniqueInstanceName) {
            observerPatternUniqueInstanceName = this
        }
        this.events = {}

        return observerPatternUniqueInstanceName
    }

    subscribe(eventName, fn) {
        this.events[eventName] = this.events[eventName] || []
        this.events[eventName].push(fn)
    }

    unsubscribe(eventName, fn) {
        if(this.eventsp[eventName]) {
            for(var i = 0; i < this.events[eventName].length; i++) {
                if(this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1)
                    break
                }
            }
        }
    }

    broadcast(eventName, data) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(fn => {
                fn(data)
            })
        }
    }
}

export default EventObserver