import { createContext, useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import Timer from "./Components/Timer/Timer";
import './index.css';

export const InitializeContext = createContext({} as any);

export default function App() {
    const [theme, setTheme] = useState<boolean>(false);

    useEffect(() => {
        setTheme(JSON.parse(window.localStorage.getItem("theme") || "false"));
    }, [])

    const handleThemeChange: () => void = () => {
        setTheme(!theme);
        window.localStorage.setItem("theme", JSON.stringify(!theme));
    }
    return (
        <div data-theme={
            theme ? "night" : "light"
        } className={`${theme ? 'night' : 'bg-slate-900/10'} h-screen overflow-hidden`}>
            <InitializeContext.Provider value={{
                theme,
                handleThemeChange
            }}>
                <Timer />
                <Toaster />
            </InitializeContext.Provider>
        </div>
    )
}
