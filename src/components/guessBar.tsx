import CSS from 'csstype'
import React, { useEffect, useState } from 'react'
import { Guess } from './providers/gameProvider'
import { useSettings } from '../hooks/useSettings'

interface GuessBarProps {
    style?: CSS.Properties
    guess: Guess
}

const GuessBar: React.FC<GuessBarProps> = ({ style, guess }) => {
    const [finished, setFinished] = useState<boolean>(false)
    const [percentage, setPercentage] = useState<number>(0)
    const [max, setMax] = useState<number>(0)
    const { settings } = useSettings()

    const getMiles = (kilometers: number): number =>
        Math.floor(kilometers * 0.6214)

    useEffect(() => {
        if (guess.taken) {
            setTimeout(() => {
                setFinished(true)
            }, 1250)
            const maxPercent: number = guess.percentage ? guess.percentage : 0
            const wait: number = 1000 / maxPercent
            for (let i = 0; i < maxPercent; i++) {
                setTimeout(() => {
                    setPercentage((lastPercent: number) => lastPercent + 1)
                }, wait * i)
            }
        } else {
            setFinished(false)
            setPercentage(0)
        }

        setMax(guess.percentage ? guess.percentage / 100 : 0)
    }, [guess.taken, guess.percentage])

    return (
        <>
            {guess.taken ? (
                <>
                    {!finished ? (
                        <>
                            <div
                                className="GuessBox"
                                style={{ gridColumn: '1/7' }}
                            >
                                <div
                                    style={{
                                        backgroundColor: 'lightgray',
                                        height: '1vh',
                                        width: '75%',
                                        position: 'absolute',
                                        left: '5%',
                                    }}
                                />
                                <div
                                    style={{
                                        backgroundColor: 'green',
                                        animation: 'linedown 1.5s forwards',
                                        height: '1vh',
                                        width: '0',
                                        position: 'absolute',
                                        left: '5%',
                                        maxWidth: `calc(75%*${max})`,
                                    }}
                                />
                            </div>
                            <div
                                className="GuessBox"
                                style={{
                                    gridColumn: '7/8',
                                }}
                            >
                                {percentage}%
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="GuessBox"
                                style={{ gridColumn: '1/4' }}
                            >
                                {guess.country
                                    ? guess.country.length < 15
                                        ? guess.country
                                        : guess.country
                                              .slice(0, 15)
                                              .concat('...')
                                    : ''}
                            </div>
                            <div
                                className="GuessBox"
                                style={{ gridColumn: '4/6' }}
                            >
                                {settings.measurement === 'mi' && guess.distance
                                    ? getMiles(guess.distance)
                                          .toString()
                                          .concat(' Miles')
                                    : guess.distance?.toString().concat(' KM')}
                            </div>
                            <div
                                className="GuessBox"
                                style={{ gridColumn: '6/7' }}
                            >
                                {guess.direction}
                            </div>
                            <div
                                className="GuessBox"
                                style={{ gridColumn: '7/8' }}
                            >
                                {guess.percentage}%
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="GuessBar" style={style} />
            )}
        </>
    )
}

export default GuessBar
