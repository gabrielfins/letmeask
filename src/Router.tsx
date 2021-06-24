import  { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';

export default function Router() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/rooms/new" component={NewRoom} />
                    <Route path="/rooms/:id" component={Room} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}