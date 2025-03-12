import {createBrowserRouter} from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetaislPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetaislPage />},
            {path: 'createActivity', element: <ActivityForm key='create' />},
            {path: 'manage/:id', element: <ActivityForm />},
            {path: 'counter', element: <Counter />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            // {path: 'not-found/*', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            // {path: '*', element: <Navigate replace to='not-found' />}
        ]
    }
])