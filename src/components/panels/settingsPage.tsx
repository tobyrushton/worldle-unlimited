import useTheme from '../../hooks/useTheme'

interface props{
    toggle: ()=>void;
}


const SettingsPage = ({toggle}:props)=>{
    const {theme,changeTheme} = useTheme()
    return(
        <div className="Container Settings">
            <div className="Header">
                <div className="HeaderText" style={{fontSize:'1.5rem',textAlign:'right'}}>
                    Settings
                </div>
                <div className='HelpClose' onClick={()=>toggle()}>
                    &times;
                </div>
            </div>
            <p className='setting'>
                <input type="checkbox" checked={theme==='dark'} onChange={()=>{changeTheme(theme==='light'?'dark':'light')}}/>
                Enable dark mode
            </p>
        </div>
    )
}

export default SettingsPage;