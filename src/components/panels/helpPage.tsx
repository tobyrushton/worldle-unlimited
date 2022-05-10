import React from 'react'
import GuessBar from '../guessBar'
import { Guess } from '../providers/gameProvider'
import Country, { getCountry } from '../../domain/countries'

interface props {
    toggle: () => void
}

const HelpPage: React.FC<props> = ({ toggle }) => {
    const country = new Country(getCountry(45)) // Colombia

    const firstCountry = getCountry('United Kingdom')
    const firstGuess: Guess = {
        taken: true,
        country: firstCountry.country,
        distance: country.getDistanceToCountry(firstCountry),
        direction: country.getDirectionToCountry(firstCountry),
        percentage: country.getPercentage(firstCountry),
    }

    const secondCountry = getCountry('Brazil')
    const secondGuess: Guess = {
        taken: true,
        country: secondCountry.country,
        distance: country.getDistanceToCountry(secondCountry),
        direction: country.getDirectionToCountry(secondCountry),
        percentage: country.getPercentage(secondCountry),
    }

    const thirdGuess: Guess = {
        taken: true,
        country: country.country,
        distance: 0,
        direction: '🎉',
        percentage: 100,
    }

    return (
        <div className="Container Page" style={{ backgroundColor: 'inherit' }}>
            <div className="Header">
                <div
                    className="HeaderText"
                    style={{
                        fontSize: '1.5rem',
                        textAlign: 'right',
                        marginLeft: '5%',
                    }}
                >
                    How To Play
                </div>
                <div
                    className="ClosePage"
                    role="button"
                    onClick={toggle}
                    onKeyDown={toggle}
                    tabIndex={0}
                >
                    &times;
                </div>
            </div>
            <div className="HelpText">
                <p>Guess the WORDLE in 6 tries</p>
                <p>Each guess must be a valid country or territory</p>
                <p>
                    After each guess is made, the distance, direction and
                    proximity of your guess from the target country will be
                    given.
                </p>
            </div>
            <div className="HelpText">
                <p style={{ fontWeight: 'bold' }}>Examples</p>
                {/* 
                    code, distance and direction are temporary, must be updated - make sure to update.
                    GuessBar element is not yet complteted, must come back to this once completed to finish the help page
                */}
                <div className="GuessGrid" style={{ padding: 0 }}>
                    <GuessBar guess={firstGuess} />
                </div>
                <p>
                    The United Kingdom is 8351km away from the target country
                    and it&apos;s in the south-west direction
                </p>
                <div className="GuessGrid" style={{ padding: 0 }}>
                    <GuessBar guess={secondGuess} />
                </div>
                <p>
                    Brazil is much closer! Only 2443km away and in the
                    north-west direction!
                </p>
                <div className="GuessGrid" style={{ padding: 0 }}>
                    <GuessBar guess={thirdGuess} />
                </div>
                <p>Colombia is the target country! Well done!🎉</p>
            </div>
            <div className="HelpText">
                <p>
                    WORDLE UNLIMITED is based of &nbsp;
                    <a
                        href="https://worldle.teuteuf.fr/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        WORLDLE
                    </a>
                    &nbsp;created by &nbsp;
                    <a
                        href="https://twitter.com/teuteuf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        @teuteuf
                    </a>
                </p>
            </div>
            <p style={{ backgroundColor: 'inherit' }}>
                (
                <a
                    href="https://github.com/tobyrushton/worldle-unlimited"
                    target="_blank"
                    rel="noreferrer"
                >
                    source code
                </a>
                )
            </p>
        </div>
    )
}

export default HelpPage
