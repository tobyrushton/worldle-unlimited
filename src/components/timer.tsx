import React, { useState, useEffect, useRef, useCallback } from 'react'

interface time {
    minutes: number
    seconds: number
}

export interface timerProps {
    enabled: boolean
    reset: boolean
}

const Timer: React.FC<timerProps> = ({ enabled, reset }) => {
    const [timer, setTimer] = useState<time>({
        minutes: 0,
        seconds: 0,
    })
    const interval = useRef<number | null>(null)

    const updateTimer = useCallback((): void => {
        setTimer({
            minutes: timer.seconds === 60 ? timer.minutes + 1 : timer.minutes,
            seconds: timer.seconds === 60 ? 0 : timer.seconds + 1,
        })
    }, [timer.seconds, timer.minutes])

    useEffect(() => {
        if (enabled) interval.current = window.setInterval(updateTimer, 1000)
        else window.clearInterval(interval.current || 0)

        return () => window.clearInterval(interval.current || 0)
    }, [enabled, updateTimer])

    useEffect(() => {
        if (reset) {
            setTimer({
                minutes: 0,
                seconds: 0,
            })
        }
    }, [reset])

    return (
        <div className="HeaderText">
            {timer.minutes < 10
                ? '0'.concat(timer.minutes.toString())
                : timer.minutes}
            :
            {timer.seconds < 10
                ? '0'.concat(timer.seconds.toString())
                : timer.seconds}
        </div>
    )
}

export default Timer
