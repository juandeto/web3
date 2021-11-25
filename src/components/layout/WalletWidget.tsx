import FormattedAddress from 'components/shared/FormattedAddress'
import 'styles/components/layout/layout.scss'

export default function Wallet({ userAddress }: { userAddress: string | undefined }) {

  return (
    <span
      className="walletWidget"
    >
      <FormattedAddress address={userAddress} />
    </span>
  )
}
