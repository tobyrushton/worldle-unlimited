import React, { useMemo, useCallback, useState } from 'react'
import {
    countries,
    getCountry,
    countryType,
    directionEmojis,
} from '../../domain/countries'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useQueue } from '../../hooks/useQueue'
import { getRandomInt } from '../../domain/random'
import { useSettings } from '../../hooks/useSettings'

export interface Guess {
    taken: boolean
    country: string | null
    distance: number | null
    direction: directionEmojis | null
    percentage: number | null
}

export interface currentGuess {
    value: string
    code: number
}

interface complete {
    complete: boolean
    win: boolean
}

interface gameStorage {
    country: countries
    guesses: Guess[]
    complete: complete
    currentGuess: currentGuess
    guessesUsed: number
}

export interface gameContextInterface {
    game: gameStorage
    setGame: (game: gameStorage | 'new') => void
}

export const GameContext = React.createContext<gameContextInterface | null>(
    null
)

const GameProvider: React.FC = ({ children }) => {
    const [recentGuesses, updateRecentGuesses] = useQueue()
    const { settings } = useSettings()

    const generateNewCountry = useCallback((): countryType => {
        let temp: number
        do {
            temp = getRandomInt(234)
        } while (
            recentGuesses.includes(temp) ||
            (settings.smallCountriesDisabled
                ? getCountry(temp).area <= 5000
                : false)
        )

        updateRecentGuesses(temp)
        return getCountry(temp)
    }, [recentGuesses, settings.smallCountriesDisabled, updateRecentGuesses])

    const [country, setCountry] = useState<countries>(
        () => generateNewCountry().country
    )

    const defaultGameStorage: gameStorage = useMemo(
        () => ({
            country,
            guesses: [
                {
                    taken: false,
                    country: null,
                    distance: null,
                    direction: null,
                    percentage: null,
                },
                {
                    taken: false,
                    country: null,
                    distance: null,
                    direction: null,
                    percentage: null,
                },
                {
                    taken: false,
                    country: null,
                    distance: null,
                    direction: null,
                    percentage: null,
                },
                {
                    taken: false,
                    country: null,
                    distance: null,
                    direction: null,
                    percentage: null,
                },
                {
                    taken: false,
                    country: null,
                    distance: null,
                    direction: null,
                    percentage: null,
                },
                {
                    taken: false,
                    country: null,
                    distance: null,
                    direction: null,
                    percentage: null,
                },
            ],
            complete: {
                complete: false,
                win: false,
            },
            currentGuess: {
                value: '',
                code: -1,
            },
            guessesUsed: 0,
        }),
        [country]
    )

    const [game, setGame] = useLocalStorage<gameStorage>(
        'game',
        (): gameStorage => defaultGameStorage
    )

    const updateGame = useCallback(
        (gameItem: gameStorage | 'new'): void => {
            if (gameItem === 'new') {
                setCountry(generateNewCountry().country)
                setGame(defaultGameStorage)
            } else setGame(gameItem)
        },
        [defaultGameStorage, setGame, generateNewCountry]
    )

    const providerValue: gameContextInterface = useMemo(
        () => ({ game, setGame: updateGame }),
        [game, updateGame]
    )

    return (
        <GameContext.Provider value={providerValue}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider
