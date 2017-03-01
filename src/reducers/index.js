import { combineReducers } from 'redux'
import baseURLReducer from './baseURL'

const sykdomspulsApp = combineReducers({
                                           baseURL:baseURLReducer
                                })

export default sykdomspulsApp
