import { createContext } from "react";
import CounterStore from "./counterStore";
import { UiStore } from "./uiStore";
import { ActivityStore } from "./activityStore";
import {ProfileCardStore} from "./profileCardStore"

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
    activityStore: ActivityStore
    profileCardStore: ProfileCardStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    activityStore: new ActivityStore(),
    profileCardStore: new ProfileCardStore(),
}

export const StoreContext = createContext(store);