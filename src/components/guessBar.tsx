import { Guess } from "../App";
import CSS from 'csstype'
import { Fragment, useEffect, useState } from "react";

interface GuessBarProps{
    style?:CSS.Properties
    guess:Guess
}

const GuessBar = (props:GuessBarProps) =>{
    const [finished,setFinished] = useState<boolean>(false)
    const [percentage,setPercentage] = useState<number>(0)
    const [max,setMax] = useState<number>(0)
    useEffect(()=>{
        if(props.guess.taken){
            setTimeout(()=>{
                setFinished(true)
            },1250);
            const max:number = props.guess.percentage?props.guess.percentage:0;
            const wait:number = 1000/max;
            for(let i =0;i<max;i++){
                setTimeout(()=>{
                    setPercentage((lastPercent:number)=>lastPercent+1)
                },wait*i)
            }
        }
        else {
            setFinished(false)
            setPercentage(0)
        }

        setMax(props.guess.percentage?props.guess.percentage/100:0)
    },[props.guess.taken,props.guess.percentage])

    return (
        <Fragment>
            {props.guess.taken?(
                <Fragment>
                    {
                        !finished?(
                            <Fragment>
                                <div className="GuessBox" style={{gridColumn:'1/7'}}>
                                    <div style={{
                                        backgroundColor:'lightgray',
                                        height:'1vh',
                                        width:'75%',
                                        position:'absolute',
                                        left:'5%'
                                    }}/>
                                    <div style={{
                                        backgroundColor:'green',
                                        animation:'linedown 1.5s forwards',
                                        height:'1vh',
                                        width:'0',
                                        position:'absolute',
                                        left:'5%',
                                        maxWidth:'calc(75%*'+max+')',
                                    }}/>
                                </div>
                                <div className='GuessBox' style={{
                                    gridColumn:'7/8'
                                }}>
                                    {percentage}%
                                </div>
                            </Fragment>
                        ):(
                            <Fragment>
                                <div className="GuessBox" style={{gridColumn:'1/4'}}>
                                    {props.guess.country? props.guess.country.length<15? props.guess.country:props.guess.country.slice(0,15).concat('...'):''}
                                </div>
                                <div className="GuessBox" style={{gridColumn:'4/6'}}>
                                    {props.guess.distance}km
                                </div>
                                <div className="GuessBox" style={{gridColumn:'6/7'}}>
                                    {props.guess.direction}
                                </div>
                                <div className="GuessBox" style={{gridColumn:'7/8'}}>
                                    {props.guess.percentage}%
                                </div>
                            </Fragment>
                        )
                    }
                </Fragment> 
            ):
                <div className="GuessBar" style={props.style} />
            }
        </Fragment>
    )
}

export default GuessBar;