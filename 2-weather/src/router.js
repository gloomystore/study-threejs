import { Home } from './pages';
import Hochimin from './pages/Hochimin';
import Losangeles from './pages/Losangeles';
import NewYork from './pages/NewYork';
import Osaka from './pages/Osaka';
import Seoul from './pages/Seoul';
import Singapore from './pages/Singapore';
import { getCityWeatherAPI } from './utils/weatherApi';

export const routerInfo = [
    {
        path: '/',
        element : <Home/>,
        errorElement: <div className='layout-detail'>Error</div>,
        children : [
            {
                path: 'seoul',
                element : <Seoul/>,
                loader: ()=>{
                    return getCityWeatherAPI('Seoul')
                }
            },
            {
                path: 'hochiminhcity',
                element: <Hochimin />,
                loader: async () => {
                    return getCityWeatherAPI('Ho Chi Minh City')
                },
            },
            {
                path: 'newyork',
                element: <NewYork />,
                loader: async () => {
                    return getCityWeatherAPI('New York')
                },
            },
            {
                path: 'osaka',
                element: <Osaka />,
                loader: async () => {
                    return getCityWeatherAPI('Osaka')
                },
            },
            {
                path: 'losangeles',
                element: <Losangeles />,
                loader: async () => {
                    return getCityWeatherAPI('Los Angeles')
                },
            },
            {
                path: 'Singapore',
                element: <Singapore />,
                loader: async () => {
                    return getCityWeatherAPI('Singapore')
                },
            },
        ]
    }
]