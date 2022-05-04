import useTheme from '../../hooks/useTheme'
import { useSettings }  from '../../hooks/useSettings'
import React from 'react';
import CSS from 'csstype'


interface props{
    toggle: ()=>void;
}


const SettingsPage = ({toggle}:props)=>{
    const {theme,changeTheme} = useTheme()
    const {settings,updateSettings:setSettings} = useSettings()

    const optionStyles:CSS.Properties={
        backgroundColor: theme === 'light' ? 'white': 'black',
        color: theme === 'light' ? 'black': 'white'
    }

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
                <select id="settings-measurement" className="selection" defaultValue={theme} onChange={(event:React.BaseSyntheticEvent)=>changeTheme(event.target.value)}>
                    <option value="light" style={optionStyles}>Light</option>
                    <option value="dark" style={optionStyles}>Dark</option>
                </select>
                Colour mode
            </p>
            <p className="setting">
                <select id="settings-measurement" className="selection" defaultValue ={settings.measurement === 'mi'? 'mi':'km'} onChange={(event:React.BaseSyntheticEvent)=>setSettings({randomRotate:settings.randomRotate,hideImage:settings.hideImage,measurement:event.target.value})}>
                    <option value="km" style={optionStyles}>KM</option>
                    <option value="mi" style={optionStyles}>Miles</option>
                </select>
                Unit of measurement
            </p>

            <div style={{
                textAlign:'left',
                marginTop:'15%',
            }}>
                <h3 style={{marginLeft:'1%'}}>
                    Difficulty Modifiers
                </h3>
                <div className="setting">
                    <input type="checkbox" checked={settings.hideImage} onChange={()=>setSettings({randomRotate:settings.randomRotate,hideImage:!settings.hideImage, measurement: settings.measurement})}/>
                    Hide country image
                </div>
                <div className="setting" style={{marginTop:'.5rem'}}>
                    <input type="checkbox" checked={settings.randomRotate} onChange={()=>setSettings({randomRotate:!settings.randomRotate,hideImage:settings.hideImage, measurement: settings.measurement})}/>
                    Randomly rotate country image
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;