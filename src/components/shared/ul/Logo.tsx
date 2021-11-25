import React, { FC } from 'react'; 
import { BsWallet } from 'react-icons/bs'
import 'styles/components/shared/ul.scss';

interface Props {
    [size:string]: string
}


const Logo: FC<Props> = ({ size = 'medium'}: Props) => {

    const sizes : { [key: string] : string} = {
        big: "3rem",
        medium: "2rem",
        small: "1.5rem"
    }

    return (
        <div 
        style={{fontSize: `${sizes[size]}`}}
        className={`logo`} >
            <BsWallet />
        </div>
    )
}

export default Logo;