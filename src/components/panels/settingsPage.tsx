import useTheme from '../../hooks/useTheme'

interface props{
    toggle: ()=>void;
}


const SettingsPage = ({toggle}:props)=>{
    const {theme,changeTheme} = useTheme()
    return(
        <div className="Container Page">
            <div className="Header">
                <div className="HeaderText" style={{fontSize:'1.5rem',textAlign:'right',marginRight:'5%'}}>
                    Settings
                </div>
                <div className='ClosePage' onClick={()=>toggle()}>
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