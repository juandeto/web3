import * as React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ConnectedRouter } from 'connected-react-router'
import RoutesContainer from './routes'
import { History } from 'history'
import { ApplicationState } from './store'
import Network from 'config/Network'
import 'styles/index.scss'

interface MainProps {
  store: Store<ApplicationState>,
  history: History
}

const App: React.FC<MainProps> = ({store, history}) => {
  
  return (
    <>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Network>
            <RoutesContainer />
          </Network>
        </ConnectedRouter>
      </Provider>
    </>
  );
}

export default App;
