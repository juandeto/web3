import React, { FC } from 'react';
import Logo from 'components/shared/ul/Logo'
import 'styles/components/general.scss'


const MainHeader: FC = () => {
    return (
        <nav className="mainHeader__container">
            <Logo size="medium" />
            <div className="mainHeader__socialMedia">
                <span className="mainHeader__icon">
                <a>Twitter</a>
                </span>     
                <span className="mainHeader__icon">
                    <a>Instagram</a>
                </span>      
                <span className="mainHeader__icon">
                    <a>Github</a>
                </span>   
            </div>
        </nav>
    )
}

export default MainHeader;