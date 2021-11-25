import { createStore, applyMiddleware, Store  } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { History } from 'history'
import { ApplicationState, createRootReducer, rootSaga } from './store'

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
    const composeEnhancers = composeWithDevTools({})
    const sagaMiddleware = createSagaMiddleware()
    const enhacer = composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))

    const store = createStore(createRootReducer(history), initialState, enhacer)
    
    sagaMiddleware.run(rootSaga)
    return store
}