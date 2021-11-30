import { ITransaction } from 'store/transfers/types'
import * as ethers from 'ethers'
import DelegateWallet from 'components/layout/DelegateWallet'


export async function approveToken(payload: ITransaction) {
    const {
      contract,
      amount,
      token,
      userAddress,
      signingProvider,
      targetWallet
    } = payload
  try {
    const decimals = token.decimals.toString()
      const numberOfTokens = ethers.utils.parseUnits(amount, decimals)
      const signer:any = signingProvider?.getSigner(userAddress)
      const connected = contract.connect(signer)

      const approval = await connected.approve(targetWallet, numberOfTokens)
      await approval.wait()

      return {
        data: approval,
        error: null
      }
  } catch (error) {
      alert("failed to send!!")
      return {
        data: "",
        error: error
      }
  }

}
  


export async function transferFrom(payload: ITransaction) {
  const {
    contract,
    targetWallet,
    amount,
    userAddress,
    token,
    signingProvider,
    delegateWallet
  } = payload

  try {
    const decimals = token.decimals.toString()
      const numberOfTokens = ethers.utils.parseUnits(amount, decimals)
      const signer:any = signingProvider?.getSigner(userAddress)
      const connected = contract.connect(signer)
      const approval = await connected.transferFrom(delegateWallet, targetWallet, numberOfTokens)
      await approval.wait()
      return {
        data: approval,
        error: null
      }
  } catch (error) {
      alert("failed transfer!!")
      return {
        data: "",
        error: error
      }
  }
}
