import  { FC, ReactElement } from 'react'; 
import 'styles/components/shared/ul.scss';



interface PropsTooltip {
    label?: string,
    icon:  ReactElement,
    cta?: (() => void) | undefined
}

const TooltipIcon: FC<PropsTooltip> = ({ label, icon, cta}: PropsTooltip) => {



    return (
        <span 
        className="tooltipIcon"
        onClick={cta}>
            {icon}
            <label className="tooltipIcon__label">{label}</label>
        </span>
    )
}

export default TooltipIcon;