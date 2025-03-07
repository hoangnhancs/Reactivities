import { makeAutoObservable } from 'mobx'

export default class CounterStore {
    title = 'Counter store';
    count = 0;
    events: string[] = [
        `Initial  count is ${this.count}`
    ]

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     count: observable,
        //     increment: action,
        //     decrement: action,
        // })

        makeAutoObservable(this)
    }

    increment = (amount = 1) => {
        this.count += amount
        this.events.push(`Increment by ${amount} - count is now ${this.count}`)
    }

    decrement = (amount = 1) => {
        this.count -= amount
        this.events.push(`Decrement by ${amount} - count is now ${this.count}`);
    }

    get eventCount() {
        return this.events.length
    }
}