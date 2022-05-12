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
    const [paused, setPaused] = useState<boolean>(false)
    const [timer, setTimer] = useState<time>({
        minutes: 0,
        seconds: 0,
    })
    const interval = useRef<number | null>(null)

    const updateTimer = useCallback((): void => {
        setTimer({
            minutes: timer.seconds === 59 ? timer.minutes + 1 : timer.minutes,
            seconds: timer.seconds === 59 ? 0 : timer.seconds + 1,
        })
    }, [timer.seconds, timer.minutes])

    useEffect(() => {
        if (enabled && !paused)
            interval.current = window.setInterval(updateTimer, 1000)
        else if (!enabled || paused) window.clearInterval(interval.current || 0)

        return () => window.clearInterval(interval.current || 0)
    }, [enabled, updateTimer, paused])

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
            <div
                role="button"
                style={{
                    cursor: 'pointer',
                    display: 'inline-block',
                    marginLeft: '1rem',
                }}
                onClick={() => setPaused((prevPaused: boolean) => !prevPaused)}
                tabIndex={0}
            >
                {paused ? (
                    <img
                        src="https://twemoji.maxcdn.com/v/latest/svg/25b6.svg"
                        alt="▶️"
                        className="Icon"
                    />
                ) : (
                    <img
                        src="https://twemoji.maxcdn.com/v/latest/svg/23f8.svg"
                        alt="⏸"
                        className="Icon"
                    />
                )}
            </div>
        </div>
    )
}

export default Timer
