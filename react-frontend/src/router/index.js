import { BrowserRouter, Route, Link } from "react-router-dom";
import Index from '../components/Index/Index';
import Account from "../components/Account/Account";
import Activity from "../components/Activity/Activity";
import Duty from "../components/Duty/Duty";
import Log from "../components/Log/Log";
import Login from "../components/Login/Login";
import Police from "../components/Police/Police";
import Role from "../components/Role/Role";
import Setting from "../components/Setting/Setting";
import Station from "../components/Station/Station";
import NotFound from "../components/NotFound/Notfound.js"
import App from "../App";



const routes = [
    { path: '/', component: App},
    { path: '/index',component: Index },
    { path: '/login', component: Login },
    { path: '/station ', component: Station },
    { path: '/police', component: Police },
    { path: '/duty', component: Duty },
    { path: '/activity', component: Activity },
    { path: '/account', component: Account },
    { path: '/role', component: Role },
    { path: '/log', component: Log },
    { path: '/setting', component: Setting },
    { path: '/notfound', component: NotFound },
]

export default routes;

