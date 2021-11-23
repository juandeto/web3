import FormattedAddress from 'components/shared/FormattedAddress'

export default function Wallet({ userAddress }: { userAddress: string }) {

  return (
    <span
      className="wallet__container"
    >
      <FormattedAddress address={userAddress} />
    </span>
  )
}
