import { PayloadBalance } from '../store/userWallet/types'
import { ITransaction } from 'store/transfers/types'
import * as ethers from 'ethers'


// export async function getBalance( payload: PayloadBalance) {
//   const {
//     contract,
//     userAddress,
//     token
//   } = payload
  
//     try {
//       console.log("payload: ", payload)

//       return  contract?.balanceOf()

//     } catch (error) {
//       console.log(error)

//       return {
//         data: "",
//         error: error
//       }
//     }
//   }



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
     const allowance = await connected.allowance(userAddress, targetWallet)
      
      return {
        data: allowance,
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
    signingProvider
  } = payload

  try {
    const decimals = token.decimals.toString()
      const numberOfTokens = ethers.utils.parseUnits(amount, decimals)
      const signer:any = signingProvider?.getSigner(userAddress)
      const connected = contract.connect(signer)
      console.log('connected: ', connected, numberOfTokens, targetWallet)
      const approval = await connected.transferFrom(userAddress, targetWallet, numberOfTokens)
      await approval.wait()
      console.log('approvall: ', approval)
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
