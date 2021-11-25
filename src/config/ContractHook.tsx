import { useContext } from 'react';
import { Contract } from '@ethersproject/contracts'
import { NetworkContext } from './networkContext'
import erc20abi from 'assets/erc20.json'

export const useContract = (address: string) => {
  const { signingProvider } = useContext(NetworkContext)

  return  new Contract(address, erc20abi, signingProvider)
}
