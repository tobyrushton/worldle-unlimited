import React, { useEffect, useState, useRef } from 'react'
import CSS from 'csstype'
import Country, { getCountry, countryType } from '../domain/countries'
import MapDisplay from './mapDisplay'
import Header from './header'
import GuessBar from './guessBar'
import data from '../domain/countries.json'
import useTheme from '../hooks/useTheme'
import PopUp from './popUp'
import useStats from '../hooks/useStats'
import { useGame } from '../hooks/useGame'
import { Guess, currentGuess } from './providers/gameProvider'

interface popup {
    enabled: boolean
    value: string
    delay?: number
}

const Game: React.FC = () => {
    const { game, setGame } = useGame()
    const [country, setCountry] = useState<Country>(
        () => new Country(getCountry(game.country))
    )
    const [displaySuggestion, setDisplaySuggestions] = useState<boolean>(false)
    const [popup, setPopup] = useState<popup>({ enabled: false, value: '' })
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const countryList: countryType[] = data as countryType[]

    const { theme } = useTheme()
    const { stats, updateStats: setStats } = useStats()

    const colourPallete: CSS.Properties = {
        backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
        color: theme === 'dark' ? '#FFFFFF' : '#121212',
    }

    const handleClickOutside = (event: MouseEvent): void => {
        const { current: wrap } = containerRef
        if (
            wrap &&
            !wrap.contains(event.target instanceof Node ? event.target : null)
        ) {
            setDisplaySuggestions(false)
        }
    }

    useEffect(() => {
        setCountry(new Country(getCountry(game.country)))
    }, [game.country])

    useEffect(() => {
        // to check if the click is off the input box, allows for it to not display.
        document.addEventListener('mousedown', handleClickOutside)

        // places user into input box when they load the site.
        inputRef.current?.focus()

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleComplete = (win: boolean): void => {
        setGame({
            country: game.country,
            guessesUsed: game.guessesUsed,
            guesses: game.guesses,
            currentGuess: {
                value: '',
                code: -1,
            },
            complete: {
                complete: true,
                win,
            },
        })
        if (!win)
            setPopup({
                // on loss shows the country that it was.
                value: country.country,
                enabled: true,
            })

        setStats({
            wins: win ? stats.wins + 1 : stats.wins,
            losses: win ? stats.losses : stats.losses + 1,
            winstreak: win ? stats.winstreak + 1 : 0,
            bestStreak:
                win && stats.winstreak === stats.bestStreak
                    ? stats.bestStreak + 1
                    : stats.bestStreak,
            played: stats.played + 1,
            attempts: {
                1:
                    game.guessesUsed + 1 === 1
                        ? stats.attempts[1] + 1
                        : stats.attempts[1],
                2:
                    game.guessesUsed + 1 === 2
                        ? stats.attempts[2] + 1
                        : stats.attempts[2],
                3:
                    game.guessesUsed + 1 === 3
                        ? stats.attempts[3] + 1
                        : stats.attempts[3],
                4:
                    game.guessesUsed + 1 === 4
                        ? stats.attempts[4] + 1
                        : stats.attempts[4],
                5:
                    game.guessesUsed + 1 === 5
                        ? stats.attempts[5] + 1
                        : stats.attempts[5],
                6:
                    game.guessesUsed + 1 === 6 && win
                        ? stats.attempts[6] + 1
                        : stats.attempts[6],
            },
        })
    }

    const handleCountryGuess = (): void => {
        const current: currentGuess = {
            value:
                game.currentGuess.code !== -1
                    ? game.currentGuess.value
                    : countryList
                          .map((countryItem: countryType) =>
                              countryItem.country
                                  .normalize('NFD')
                                  .replace(/[\u0300-\u036f]/g, '')
                                  .toLowerCase()
                          )
                          .includes(
                              game.currentGuess.value.trim().toLocaleLowerCase()
                          )
                    ? countryList[
                          countryList
                              .map((countryItem: countryType) =>
                                  countryItem.country
                                      .normalize('NFD')
                                      .replace(/[\u0300-\u036f]/g, '')
                                      .toLowerCase()
                              )
                              .indexOf(
                                  game.currentGuess.value.trim().toLowerCase()
                              )
                      ].country
                    : '',
            code:
                game.currentGuess.code !== -1
                    ? game.currentGuess.code
                    : countryList
                          .map((countryItem: countryType) =>
                              countryItem.country
                                  .normalize('NFD')
                                  .replace(/[\u0300-\u036f]/g, '')
                                  .toLowerCase()
                          )
                          .indexOf(
                              game.currentGuess.value.trim().toLowerCase()
                          ),
        }
        if (current.code === -1) {
            setPopup({
                enabled: true,
                value: 'Invalid country',
                delay: 1000,
            })
            return // backs out of function if invalid.
        }

        const guess: countryType = getCountry(current.code)
        const guessList: Guess[] = [...game.guesses]
        const distance = country.getDistanceToCountry(guess)
        guessList[game.guessesUsed].taken = true
        guessList[game.guessesUsed].country = current.value
        guessList[game.guessesUsed].distance = distance
        guessList[game.guessesUsed].direction =
            country.getDirectionToCountry(guess)
        guessList[game.guessesUsed].percentage = country.getPercentage(guess)
        if (distance === 0) handleComplete(true) // win
        else {
            setGame({
                country: game.country,
                guesses: guessList,
                currentGuess: {
                    value: '',
                    code: -1,
                },
                guessesUsed: game.guessesUsed + 1,
                complete: {
                    complete: false,
                    win: false,
                },
            })
            setDisplaySuggestions(true)
        }
        if (game.guessesUsed + 1 === 6 && distance !== 0) handleComplete(false) // loss
    }

    const handleReset = (): void => {
        setGame('new')
    }

    return (
        <div className="wrapper" style={colourPallete}>
            <div className="Container" ref={containerRef}>
                <Header />
                <MapDisplay
                    number={() => {
                        const temp = countryList.find(
                            ({ country: ctr }: countryType) =>
                                ctr === country.country
                        )
                        return temp ? countryList.indexOf(temp) : 0
                    }}
                />
                <div className="GuessWrapper">
                    <div className="GuessGrid">
                        {game.guesses.map((guess: Guess, idx: number) => {
                            return (
                                <GuessBar
                                    style={{ gridColumn: '1/8' }}
                                    guess={guess}
                                    key={
                                        guess.country
                                            ? guess.country
                                                  .concat('guess')
                                                  .concat(idx.toString())
                                            : 'blank'.concat(idx.toString())
                                    }
                                />
                            )
                        })}
                    </div>
                    {displaySuggestion && game.currentGuess.value !== '' ? (
                        <ul role="listbox" className="GuessList">
                            {countryList?.map((countryItem: countryType) => {
                                return countryItem.country
                                    .normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, '')
                                    .toLowerCase()
                                    .includes(
                                        game.currentGuess.value.toLowerCase()
                                    ) ? (
                                    <button
                                        className="SuggestionBar"
                                        type="submit"
                                        onClick={() => {
                                            setGame({
                                                country: game.country,
                                                guessesUsed: game.guessesUsed,
                                                guesses: game.guesses,
                                                complete: game.complete,
                                                currentGuess: {
                                                    value: country.country,
                                                    code: -1,
                                                },
                                            })
                                            setDisplaySuggestions(false)
                                            // ensures that the user is not forced to
                                            // click off after clicking on a
                                            // country in the suggestion list.
                                            inputRef.current?.focus()
                                            setDisplaySuggestions(false)
                                        }}
                                        key={countryItem.country.concat(
                                            'suggestion'
                                        )}
                                        tabIndex={0}
                                        style={colourPallete}
                                    >
                                        {countryItem.country}
                                    </button>
                                ) : null
                            })}
                        </ul>
                    ) : null}
                </div>
                {game.complete.complete ? (
                    <>
                        <div
                            className="CompleteBar"
                            style={{
                                backgroundColor: game.complete.win
                                    ? '#22C55E'
                                    : '#FF3800',
                            }}
                        >
                            {game.complete.win ? 'CONGRATS!' : 'UNLUCKY'}
                        </div>
                        <div
                            className="CompleteBar"
                            role="button"
                            style={{
                                backgroundColor: '#24A0ED',
                                marginTop: '1%',
                                cursor: 'pointer',
                            }}
                            onClick={handleReset}
                            tabIndex={0}
                        >
                            GO AGAIN
                        </div>
                    </>
                ) : (
                    <form>
                        <input
                            ref={inputRef}
                            className="GuessInput"
                            placeholder="Country or Territory"
                            value={game.currentGuess.value}
                            onSubmit={(e: React.SyntheticEvent) => {
                                e.preventDefault()
                                handleCountryGuess()
                            }}
                            onFocus={() => {
                                setDisplaySuggestions(true)
                            }}
                            onChange={(e: React.BaseSyntheticEvent) => {
                                setGame({
                                    country: game.country,
                                    guessesUsed: game.guessesUsed,
                                    guesses: game.guesses,
                                    complete: game.complete,
                                    currentGuess: {
                                        value: e.target.value,
                                        code: -1,
                                    },
                                })
                            }}
                            style={colourPallete}
                        />
                        <button
                            className="GuessSubmit"
                            type="submit"
                            onClick={(e: React.SyntheticEvent) => {
                                e.preventDefault()
                                handleCountryGuess()
                            }}
                            style={colourPallete}
                        >
                            GUESS
                        </button>
                    </form>
                )}
                {popup.enabled ? (
                    <PopUp
                        value={popup.value}
                        delay={popup.delay}
                        toggle={() => {
                            setPopup({ enabled: false, value: '' })
                        }}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default Game
