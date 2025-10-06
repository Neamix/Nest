"use client";

import { on } from "events";
import { useEffect, useState } from "react";

export default function Counter({ initialCount, onComplete }: { initialCount: number, onComplete: () => void }) {
    const [count, setCount] = useState<number>(initialCount);
    const displayedCount = formatTime(count);

    function formatTime(count: number) {
        const minutes = Math.floor(count / 60);
        const seconds = count % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function resendOtp() {
        onComplete();
        setCount(initialCount);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount <= 0) {
                    clearInterval(timer);
                    return 0;
                }

                return prevCount - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [count]);

    return (
        <div>
            {
                (count > 0) ? 
                (
                    <p className="text-[13.5px] text-primary">Resend Verification in: {displayedCount}</p>
                ) : (
                    <p className="text-[13.5px] text-green-600 cursor-pointer" onClick={() => resendOtp()}>Didnt receive the OTP? Resend it</p>
                )
            }            
        </div>
    );
}   