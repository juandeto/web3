import  { FC } from 'react'; 
import 'styles/components/shared/ul.scss';

type BtnType = 'primary' | 'secondary' | 'disabled'

interface PropsBtn {
    type?: BtnType,
    label: string,
    disabled?: boolean
    cta: (() => void) | undefined
}

const Logo: FC<PropsBtn> = ({ label, type = "primary", disabled = false, cta }: PropsBtn) => {



    return (
        <button 
        disabled={disabled}
        className={`${type}-button`}
        onClick={cta}
        >
            {label}
        </button>
    )
}

export default Logo;