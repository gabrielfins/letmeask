import  { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from '../../contexts/AuthContext';
import Home from '../../pages/Home';
import NewRoom from '../../pages/NewRoom';

export default function Router() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/rooms/new" component={NewRoom} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}