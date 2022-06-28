import React from 'react'
import useTheme from '../hooks/useTheme'

const Footer: React.FC = () => {
    const { theme } = useTheme()
    return (
        <div
            className="footer"
            style={{
                color: theme === 'dark' ? 'white' : 'black',
            }}
        >
            Enjoy Unlimited?&nbsp;
            <a
                href="https://ko-fi.com/tobyrushton"
                target="_blank"
                rel="noreferrer"
            >
                Buy me a&nbsp;
                <img
                    src="https://twemoji.maxcdn.com/v/latest/svg/2615.svg"
                    alt="coffee"
                    style={{
                        height: '1rem',
                        width: '1rem',
                    }}
                />
                !
            </a>
        </div>
    )
}

export default Footer
