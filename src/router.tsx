import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashBoardView from './views/DashBoardViews'

export default function Router() {
    const selectedDate = new Date(); // or any logic to get the selected date

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashBoardView selectedDate={selectedDate} />} index/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};