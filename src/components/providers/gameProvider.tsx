import React from "react";
import { countries, getCountry, countryType, directionEmojis } from "../../domain/countries";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useQueue } from '../../hooks/useQueue'
import { getRandomInt } from '../../domain/random'

export interface Guess {
    taken:boolean,
    country:string | null,
    distance:number| null,
    direction: directionEmojis | null,
    percentage: number| null,
}
  
export interface currentGuess{
    value:string,
    code:number
}
  
interface complete{
    complete:boolean,
    win:boolean,
}

interface gameStorage{
    country: countries,
    guesses: Guess[],
    complete: complete
    currentGuess: currentGuess,
    guessesUsed: number
}

export interface gameContextInterface{
    game:gameStorage,
    setGame:(game:gameStorage | 'new')=>void
}

export const GameContext = React.createContext<gameContextInterface| null>(null)

const GameProvider: React.FC = ({children}) =>{
    const [recentGuesses, updateRecentGuesses] = useQueue()

    const generateNewCountry = ():countryType =>{
        let temp:number;
        do{
          temp = getRandomInt(234)
        }while(recentGuesses.includes(temp))
    
        updateRecentGuesses(temp)
        return getCountry(temp)
    }

    const [game,setGame] = useLocalStorage<gameStorage>('game',():gameStorage=>{ 
        return{
            country: generateNewCountry().country,
            guesses:[
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
            ],
            complete:{
                complete:false,
                win:false
            },
            currentGuess:{
                value:"",
                code:-1
            },
            guessesUsed:0
    }})

    const updateGame = (game:gameStorage | 'new'):void =>{
        if(game === 'new') setGame({
            country: generateNewCountry().country,
            guesses:[
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
                {taken:false,country:null,distance:null,direction:null,percentage:null},
            ],
            complete:{
                complete:false,
                win:false
            },
            currentGuess:{
                value:"",
                code:-1
            },
            guessesUsed:0
        })
        else setGame(game)
    }

    return(
        <GameContext.Provider value={{game:game,setGame:updateGame}}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;