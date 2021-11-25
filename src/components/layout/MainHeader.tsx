import React, { FC } from 'react';
import Logo from 'components/shared/ul/Logo'
import Button from 'components/shared/ul/Button'
import TooltipIcon from 'components/shared/ul/TooltipIcon'
import { NetworkContext } from 'config/networkContext'
import { FaTwitter, FaInstagramSquare, FaGithub} from 'react-icons/fa'
import 'styles/components/layout/layout.scss'


const MainHeader: FC = () => {
    const { onLogOut, userAddress } = React.useContext(NetworkContext)
    return (
        <nav className="mainHeader__container">
            <Logo size="medium" />
           
            <div className="mainHeader__socialMedia">
                <TooltipIcon
                label="Twitter"
                icon={<FaTwitter />}

                />
                <TooltipIcon
                label="Instagram"
                icon={<FaInstagramSquare />}
                
                />
                <TooltipIcon
                label="Github"
                icon={<FaGithub />}
                
                />
                 {userAddress && <Button cta={onLogOut} label={"Log out"}/>}
            </div>
        </nav>
    )
}

export default MainHeader;