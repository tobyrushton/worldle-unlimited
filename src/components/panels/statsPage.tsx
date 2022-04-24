import useStats from "../../hooks/useStats"

interface attemptsInterface{
    1:number,
    2:number,
    3:number,
    4:number,
    5:number,
    6:number
}

export interface statsInterface{
    wins:number,
    losses:number,
    winstreak:number,
    bestStreak:number,
    played:number,
    attempts:attemptsInterface
}

interface props{
    toggle:()=>void
}

const StatsPage = ({toggle}:props) =>{
    const {stats} = useStats()

    return(
        <div className="Container Page">
            <div className="Header">
                <div className="HeaderText" style={{fontSize:'1.5rem',textAlign:'right',marginRight:'2%'}}>
                    Stats
                </div>
                <div className='ClosePage' onClick={()=>toggle()}>
                    &times;
                </div>
            </div>
            <div className="statsRow" style={{marginTop:'1rem'}}>
                <div className='stat'>
                    <div style={{fontWeight:'bold',fontSize:'1.5rem'}}>
                        {stats.played}
                    </div>
                    <div>
                        &nbsp;Played
                    </div>
                </div>
                <div className='stat'>                    
                    <div style={{fontWeight:'bold',fontSize:'1.5rem'}}>
                        {Math.floor((stats.wins/stats.played)*100)}
                    </div>
                    <div>
                        &nbsp;Win %
                    </div>
                </div>
                <div className='stat'>                    
                    <div style={{fontWeight:'bold',fontSize:'1.5rem'}}>
                        {stats.winstreak}
                    </div>
                    <div>
                        &nbsp;Winstreak
                    </div>
                </div>
                <div className='stat'>                    
                    <div style={{fontWeight:'bold',fontSize:'1.5rem'}}>
                        {stats.bestStreak}
                    </div>
                    <div>
                        &nbsp;Max Streak
                    </div>
                </div>
            </div>
            <div style={{
                textAlign:'left',
                marginTop:'15%'
            }}>
                <h3>Guess Distribution</h3>
                <ul style={{listStyle:'none'}}>
                    <li>
                        1 &nbsp;
                        <div style={{
                            height:'1rem',
                            backgroundColor:'lightgray',
                            display:'inline-block',
                            padding:'.2rem',
                            minWidth:'.6rem',
                            width:'calc(80%*'+stats.attempts[1]/stats.played+')',
                            marginBottom:'.5rem'
                        }}>{stats.attempts[1]}</div>
                    </li>
                    <li>
                        2 &nbsp;
                        <div style={{
                            height:'1rem',
                            backgroundColor:'lightgray',
                            display:'inline-block',
                            padding:'.2rem',
                            minWidth:'.6rem',
                            width:'calc(80%*'+stats.attempts[2]/stats.played+')',
                            marginBottom:'.5rem'
                        }}>{stats.attempts[2]}</div>
                    </li>
                    <li>
                        3 &nbsp;
                        <div style={{
                            height:'1rem',
                            backgroundColor:'lightgray',
                            display:'inline-block',
                            padding:'.2rem',
                            minWidth:'.6rem',
                            width:'calc(80%*'+stats.attempts[3]/stats.played+')',
                            marginBottom:'.5rem'
                        }}>{stats.attempts[3]}</div>
                    </li>
                    <li>
                        4 &nbsp;
                        <div style={{
                            height:'1rem',
                            backgroundColor:'lightgray',
                            display:'inline-block',
                            padding:'.2rem',
                            minWidth:'.6rem',
                            width:'calc(80%*'+stats.attempts[4]/stats.played+')',
                            marginBottom:'.5rem'
                        }}>{stats.attempts[4]}</div>
                    </li>
                    <li>
                        5 &nbsp;
                        <div style={{
                            height:'1rem',
                            backgroundColor:'lightgray',
                            display:'inline-block',
                            padding:'.2rem',
                            minWidth:'.6rem',
                            width:'calc(80%*'+stats.attempts[5]/stats.played+')',
                            marginBottom:'.5rem'
                        }}>{stats.attempts[5]}</div>
                    </li>
                    <li>
                        6 &nbsp;
                        <div style={{
                            height:'1rem',
                            backgroundColor:'lightgray',
                            display:'inline-block',
                            padding:'.2rem',
                            minWidth:'.6rem',
                            width:'calc(80%*'+stats.attempts[6]/stats.played+')',
                            marginBottom:'.5rem'
                        }}>{stats.attempts[6]}</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default StatsPage;