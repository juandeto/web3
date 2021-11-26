import { PayloadBalance } from '../store/userWallet/types'
import { ITransaction } from 'store/transfers/types'
import * as ethers from 'ethers'


export async function getBalance( payload: PayloadBalance) {
  const {
    contract,
    userAddress,
    token
  } = payload
  
    try {
      const balance = await contract?.balanceOf(userAddress);
      const formatBalance = await ethers.utils.formatUnits(balance, token.decimals)

      return {
        data: formatBalance,
        error: null
      }

    } catch (error) {
      console.log(error)

      return {
        data: "",
        error: error
      }
    }
  }



export async function approveToken(payload: ITransaction) {
    const {
      contract,
      targetWallet,
      amount,
      token
    } = payload

  try {
      const numberOfTokens = ethers.utils.parseUnits(amount, token.decimals)
      const approval = await contract.approve(targetWallet, numberOfTokens)
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
    token
  } = payload
    
  try {
      const numberOfTokens = ethers.utils.parseUnits(amount, token.decimals)
      const approval = await contract.transferFrom(targetWallet, numberOfTokens)
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
