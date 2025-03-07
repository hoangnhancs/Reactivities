import { useContext } from 'react'
import { StoreContext } from '../stores/store'

export { useContext} from 'react'

export function useStore() {
    return useContext(StoreContext)
}