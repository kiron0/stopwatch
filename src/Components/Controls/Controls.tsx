import { useState, useContext } from "react";
import { Button } from "react-daisyui";
import { toast } from "react-hot-toast";
import { InitializeContext } from "../../App";
type Props = {
    setTimeInMilliSeconds: Function
}
export default function Controls(props: Props) {
    const { setTimeInMilliSeconds } = props;
    const { theme } = useContext(InitializeContext);
    const [intervalId, setIntervalId] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);


    const handlePlayButton = (e: object) => {
        if (isRunning && !isPaused) {
            if (theme) {
                toast.error("Timer is already running", {
                    icon: '⚠️',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                toast.error("Timer is already running", {
                    icon: '⚠️',
                });
            }
            return;
        }
        setIsRunning(true);
        setIsPaused(false);
        // if theme is night theme then toast should be night theme
        if (theme) {
            toast.success("Timer started", {
                icon: '😀',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
        else {
            toast.success("Timer started", {
                icon: '😀',
            });
        }
        let id = window.setInterval(() => {
            setTimeInMilliSeconds((prev: number) => prev + 10);
        }, 10);
        setIntervalId(id);
    }
    const handleStopButton = () => {
        if (!isRunning) {
            if (theme) {
                toast.error("Timer is not running", {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                toast.error("Timer is not running", {
                    icon: '❌',
                });
            }
            return;
        }
        setIsRunning(false);
        setIsPaused(false);
        if (theme) {
            toast.success("Timer Stopped", {
                icon: '✋',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            toast.success("Timer Stopped", {
                icon: '✋',
            });
        }
        clearInterval(intervalId);
    }

    const handleReset = () => {
        // if is running then stop it and then reset it && if is paused then reset it
        if ((isRunning && !isPaused) || (!isRunning && !isPaused)) {
            setTimeInMilliSeconds(0);
            clearInterval(intervalId);
            setIsRunning(false);
            setIsPaused(false);
            if (theme) {
                toast.success("Timer Reset", {
                    icon: '☠️',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                toast.success("Timer Reset", {
                    icon: '☠️',
                });
            }
        }
        if (!isRunning && isPaused) {
            setTimeInMilliSeconds(0);
            setIsRunning(false);
            setIsPaused(false);
            if (theme) {
                toast.error("Timer is not running", {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                toast.error("Timer is not running", {
                    icon: '❌',
                });
            }
        }
    }

    return (
        <div className="flex gap-3">
            <Button className="px-8 btn-success text-white font-semibold" onClick={handlePlayButton} type="button">Play</Button>
            <Button className="px-8 btn-primary text-white font-semibold" onClick={handleStopButton} type="button">Stop</Button>
            <Button className="px-8 btn-error text-white font-semibold" onClick={handleReset} type="button">Reset</Button>
        </div>
    )
}
