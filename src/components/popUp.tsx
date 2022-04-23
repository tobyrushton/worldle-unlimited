interface props{
    value:string
    toggle:()=>void,
    delay:number
}

const PopUp = ({value,toggle,delay}:props) =>{
    setTimeout(toggle,delay)
    return(
        <div className="popUp wobble animated">
            <div style={{
                position:'absolute',
                top:0,
                right:'4%',
                fontSize:'1.5rem'
                
            }} onClick={toggle}>&times;</div>
            {value}
        </div>  
    )
}

export default PopUp;