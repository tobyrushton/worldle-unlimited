import React, { Fragment, useEffect, useState, useRef } from 'react';
import './css/App.css';
import Country, {directionEmojis, getCountry, countryType} from './domain/countries';
import MapDisplay from './components/mapDisplay';
import Header from './components/header';
import GuessBar from './components/guessBar';
import data from './domain/countries.json'
import useTheme from './hooks/useTheme';
import PopUp from './components/popUp';
import useStats from './hooks/useStats';
import { getRandomInt } from './domain/random';

//235 countries in list
export interface Guess {
  taken:boolean,
  country:string | null,
  distance:number| null,
  direction: directionEmojis | null,
  percentage: number| null,
}

interface currentGuess{
  value:string,
  code:number
}

interface complete{
  complete:boolean,
  win:boolean,
}

interface popup{
  enabled:boolean,
  value:string,
  delay:number
}

const App = () => {
  const [country,setCountry] = useState<Country>(new Country(getCountry(getRandomInt(234))))
  const [guessesUsed,setGuessesUsed] = useState<number>(0)
  const [guesses,setGuesses] = useState<Array<Guess>>(new Array<Guess>(
    {taken:false,country:null,distance:null,direction:null,percentage:null},
    {taken:false,country:null,distance:null,direction:null,percentage:null},
    {taken:false,country:null,distance:null,direction:null,percentage:null},
    {taken:false,country:null,distance:null,direction:null,percentage:null},
    {taken:false,country:null,distance:null,direction:null,percentage:null},
    {taken:false,country:null,distance:null,direction:null,percentage:null},
    ))
  const [currentGuess,setCurrentGuess] = useState<currentGuess>({value:"",code:-1})
  const [displaySuggestion,setDisplaySuggestions] =useState<boolean>(false)
  const [complete,setComplete] = useState<complete>({complete:false,win:false})
  const [popup,setPopup] = useState<popup>({enabled:false,value:'',delay:0})
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const countryList:countryType[] = data as countryType[]

  const {theme} = useTheme()
  const {stats,updateStats:setStats} = useStats()

  const colourPallete ={
    backgroundColor:theme === 'dark'?'#121212':'#FFFFFF',
    color:theme === 'dark'? '#FFFFFF':'#121212'
  }

  //on initial render generates new country, 23 is place holder currently - add random number generator. 
  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutside)

    //places user into input box when they load the site. 
    inputRef.current?.focus()

    return () =>{
      document.removeEventListener("mousedown",handleClickOutside)
    }
  },[])

  const handleClickOutside = (event:MouseEvent) => {
    const { current: wrap } = containerRef;
    if (wrap && !wrap.contains(event.target instanceof Node?event.target:null)) {
      setDisplaySuggestions(false);
    }
  };


  const handleComplete =(win:boolean) =>{
    setComplete({
      complete:true,
      win:win,
    });
    if(!win)setPopup({
      value:country.country,
      enabled: true,
      delay:2000
    })

    setStats({
      wins:win?stats.wins+1:stats.wins,
      losses:win?stats.losses:stats.losses+1,
      winstreak:win?stats.winstreak+1:0,
      bestStreak:win&&stats.winstreak===stats.bestStreak?stats.bestStreak+1:stats.bestStreak,
      played:stats.played+1,
      attempts:{
        1:guessesUsed+1===1?stats.attempts[1]+1:stats.attempts[1],
        2:guessesUsed+1===2?stats.attempts[2]+1:stats.attempts[2],
        3:guessesUsed+1===3?stats.attempts[3]+1:stats.attempts[3],
        4:guessesUsed+1===4?stats.attempts[4]+1:stats.attempts[4],
        5:guessesUsed+1===5?stats.attempts[5]+1:stats.attempts[5],
        6:guessesUsed+1===6 && win?stats.attempts[6]+1:stats.attempts[6]
      }
    })
  };


  const handleCountryGuess = ():void =>{
    const current:currentGuess={
      value:currentGuess.code !== -1? currentGuess.value:countryList.map((country:countryType)=>country.country.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()).includes(currentGuess.value.trim().toLocaleLowerCase())?countryList[countryList.map((country:countryType)=>country.country.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()).indexOf(currentGuess.value.trim().toLowerCase())].country:'',
      code: currentGuess.code !== -1? currentGuess.code:countryList.map((country:countryType)=>country.country.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()).indexOf(currentGuess.value.trim().toLowerCase())
    }
    if(current.code===-1){
        setPopup({
          enabled:true,
          value:'Invalid country',
          delay:1000
        })
        return
    }

    const guess:countryType = getCountry(current.code)
    let guessList:Guess[] = [...guesses]
    const distance = country.getDistanceToCountry(guess)
    guessList[guessesUsed].taken = true 
    guessList[guessesUsed].country = current.value;
    guessList[guessesUsed].distance = distance
    guessList[guessesUsed].direction = country.getDirectionToCountry(guess)
    guessList[guessesUsed].percentage = country.getPercentage(distance)
    if(distance === 0) handleComplete(true) //win
    setGuesses(guessList)
    setCurrentGuess({value:"",code:-1})
    setDisplaySuggestions(true)
    setGuessesUsed(guessesUsed+1)
    if(guessesUsed+1 === 6 && distance !==0) handleComplete(false) //loss
  }

  const handleReset = ():void =>{
    setCountry(new Country(getCountry(getRandomInt(234))))
    setGuessesUsed(0)
    setGuesses([
      {taken:false,country:null,distance:null,direction:null,percentage:null},
      {taken:false,country:null,distance:null,direction:null,percentage:null},
      {taken:false,country:null,distance:null,direction:null,percentage:null},
      {taken:false,country:null,distance:null,direction:null,percentage:null},
      {taken:false,country:null,distance:null,direction:null,percentage:null},
      {taken:false,country:null,distance:null,direction:null,percentage:null},
    ])
    setComplete({complete:false,win:false})
  }

  return (
    <div className='wrapper' style={colourPallete}>
      <div className='Container' ref={containerRef}>
        <Header />
        <MapDisplay number={()=>{
          const temp = countryList.find(({country:ctr}:countryType)=> ctr === country.country)
          return temp? countryList.indexOf(temp):0
        }}/>
        <div className='GuessWrapper'>
            <div className="GuessGrid">
            {guesses.map((guess:Guess,idx:number)=>{
                  return <GuessBar style={{gridColumn:'1/8'}} guess={guess} key={idx}/>
                })}
            </div>
          <Fragment>
            {displaySuggestion && currentGuess.value!==""?(
              <ul role='listbox' className='GuessList'>
              {
                countryList?.map((country:countryType,idx:number)=>{
                  return country.country.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(currentGuess.value.toLowerCase()) ? <li className='SuggestionBar' onClick={()=>{
                    setCurrentGuess({value:country.country,code:idx})
                    setDisplaySuggestions(false)
                    //ensures that the user is not forced to click off.
                    inputRef.current?.focus()
                    setDisplaySuggestions(false)
                  }} key={idx} style={colourPallete}>{country.country}</li>:null
                })
              }
            </ul>
            ):null
            }
            </Fragment>
          </div>
          {
            complete.complete?(
              <Fragment>
                <div className='CompleteBar'style={{
                  backgroundColor:complete.win?'#22C55E':'#FF3800',
                }}>{complete.win?'CONGRATS!':'UNLUCKY'}</div>
                <div className="CompleteBar"style={{
                  backgroundColor:'#24A0ED',
                  marginTop:'1%',
                  cursor:'pointer'
                }}
                onClick={handleReset}>GO AGAIN</div>
              </Fragment>
            ):(   
            <form>
              <input ref={inputRef} className='GuessInput' placeholder='Country or Territory' value={currentGuess.value} onSubmit={(e:React.SyntheticEvent)=>{
                e.preventDefault()
                handleCountryGuess()
              }} onFocus={()=>{
                setDisplaySuggestions(true)
              }}
              onChange={(e:React.BaseSyntheticEvent)=>{
                setCurrentGuess({value:e.target.value,code:-1})
              }} style={colourPallete}/>
              <button className='GuessSubmit' onClick={(e:React.SyntheticEvent)=>{
                  e.preventDefault()
                  handleCountryGuess()
              }} style={colourPallete}>GUESS</button>
            </form>
            )
          }
          {
            popup.enabled?(
              <PopUp value={popup.value} delay={popup.delay} toggle={()=>{setPopup({enabled:false,value:'',delay:0})}}/>
            ):null
          }
      </div>
    </div>
  );
}

export default App;