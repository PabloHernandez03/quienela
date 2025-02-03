import { useState, useEffect } from "react";
import DashBoardView from "@/views/DashBoardViews";
import Logo from "@/components/Logo";
import { format } from 'date-fns-tz';

export default function AppLayout() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
}, []);

const formatDateForInput = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
};

const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value + 'T00:00:00');
    setSelectedDate(newDate);
};


  return (
    <>
      <header className="bg-fifth">
        <div className="relative max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-center items-center p-4 gap-4">
          <Logo />
          <div className="sm:absolute sm:right-14 md:right-28 flex items-center gap-2">
            <input
              type="date"
              value={formatDateForInput(selectedDate)}  
              onChange={handleDateChange}
              className="p-0 sm:p-1 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-white flex items-center gap-1">
            <img src="/argentina.svg" alt="Argentina Flag" className="w-6 h-6" />
              {currentTime.toLocaleTimeString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </header>

      <DashBoardView selectedDate={selectedDate} />

      <footer className="py-5 bg-fifth">
        <p className="text-center font-mono text-white">
          Todos los derechos reservados, {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}