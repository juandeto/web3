import * as React from 'react'
import MainHeader from 'components/layout/MainHeader'
import Home from './components/views'
import Transfers from './components/views/Transfers'
import ProtectedRoute from 'config/ProtectedRoute'
import { NetworkContext } from 'config/networkContext'
import { Switch,  Route, } from 'react-router-dom'



const RoutesContainer: React.FunctionComponent = () => {
    const { signerNetwork } = React.useContext(NetworkContext)
    
    return (
    <div>
        <MainHeader />
        <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute 
            isAuthenticated={signerNetwork ? true : false}
            authenticationPath="/"
            path="/transfer" 
            component={Transfers} />
        </Switch>
    </div>
    )
}

export default RoutesContainer