import {  TokenBalance } from 'store/userWallet/types'
import 'styles/components/shared/shared.scss'

type IProps = {
  token: TokenBalance
}

const FormattedBalance:React.FC<IProps> = ({token})=> {

  const parseBalance = (str:string | undefined) => parseInt(str || "").toFixed(2)

  return (
    <div className="balances_wrapper">
        <h3>{parseBalance(token.balance) || 0.00}</h3>
        <p>{token.name}</p>
    </div>
  )
}


export default FormattedBalance;