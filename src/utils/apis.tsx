import { ITransaction } from 'store/transfers/types'
import * as ethers from 'ethers'

export async function approveToken(payload: ITransaction) {
    const {
      contract,
      amount,
      token,
      userAddress,
      signingProvider,
      delegateWallet
    } = payload
  try {
    const decimals = token.decimals.toString()
      const numberOfTokens = ethers.utils.parseUnits(amount, decimals)
      const signer:any = signingProvider?.getSigner(userAddress)
      const connected = contract.connect(signer)

      const approval = await connected.approve(delegateWallet, numberOfTokens)
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
      return {
        data: "",
        error: error
      }
  }
}
