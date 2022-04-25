import useTheme from '../../hooks/useTheme'
import { useSettings }  from '../../hooks/useSettings'

export interface settings{
    randomRotate:boolean,
    hideImage:boolean,
}

interface props{
    toggle: ()=>void;
}


const SettingsPage = ({toggle}:props)=>{
    const {theme,changeTheme} = useTheme()
    const {settings,updateSettings:setSettings} = useSettings()

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

            <div style={{
                textAlign:'left',
                marginTop:'15%',
            }}>
                <h3 style={{marginLeft:'1%'}}>
                    Difficulty Modifiers
                </h3>
                <div className="setting">
                    <input type="checkbox" checked={settings.hideImage} onChange={()=>setSettings({randomRotate:settings.randomRotate,hideImage:!settings.hideImage})}/>
                    Hide country image
                </div>
                <div className="setting" style={{marginTop:'.5rem'}}>
                    <input type="checkbox" checked={settings.randomRotate} onChange={()=>setSettings({randomRotate:!settings.randomRotate,hideImage:settings.hideImage})}/>
                    Randomly rotate country image
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;