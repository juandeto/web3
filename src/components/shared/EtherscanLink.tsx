import { FaLink } from 'react-icons/fa'

export default function EtherscanLink({
  value,
  type,
}: {
  value: string | undefined
  type: 'tx' | 'address'
}) {
  if (!value) return null

  return (
    <a
      className="quiet"
      href={`https://rinkeby.etherscan.io/${type}/${value}`}
      target="_blank"
      rel="noopener noreferrer"
    >
       Check on scan! {'  '}<FaLink />
    </a>
  )
}
