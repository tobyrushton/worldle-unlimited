import React from 'react'

interface props {
    value: string
    toggle: () => void
    delay?: number
}

const PopUp: React.FC<props> = ({ value, toggle, delay }: props) => {
    if (delay) setTimeout(toggle, delay)
    return (
        <div className="popUp wobble animated" role="dialog">
            <div
                role="button"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: '4%',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                }}
                onClick={toggle}
                onKeyDown={toggle}
                tabIndex={0}
            >
                &times;
            </div>
            {value}
        </div>
    )
}

export default PopUp
