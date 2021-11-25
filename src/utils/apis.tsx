import { Contract } from 'ethers'
import erc20abi from 'assets/erc20.json'
import { PayloadBalance } from '../store/userWallet/types'
import * as ethers from 'ethers'


export async function getBalance( payload: PayloadBalance) {
  const {
    contractAddress,
    signingProvider,
    userAddress,
    decimals
  } = payload

    const abi = JSON.stringify(erc20abi)
    const contract = new Contract(contractAddress, abi, signingProvider);
    
    try {
      const balance = await contract.balanceOf(userAddress);
      const formatBalance = await ethers.utils.formatUnits(balance, decimals)

      return {
        data: formatBalance,
        error: ""
      }

    } catch (error) {
      console.log(error)

      return {
        data: "",
        error: error
      }
    }
  }



  // function send_token(
  //   contract_address,
  //   send_token_amount,
  //   to_address,
  //   send_account,
  //   private_key
  // ) {
  //   let wallet = new ethers.Wallet(private_key)
  //   let walletSigner = wallet.connect(window.ethersProvider)
  
  //   window.ethersProvider.getGasPrice().then((currentGasPrice) => {
  //     let gas_price = ethers.utils.hexlify(parseInt(cur rentGasPrice))
  //     console.log(`gas_price: ${gas_price}`)
  
  //     if (contract_address) {
  //       // general token send
  //       let contract = new ethers.Contract(
  //         contract_address,
  //         send_abi,
  //         walletSigner
  //       )
  
  //       // How many tokens?
  //       let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
  //       console.log(`numberOfTokens: ${numberOfTokens}`)
  
  //       // Send tokens
  //       contract.transfer(to_address, numberOfTokens).then((transferResult) => {
  //         console.dir(transferResult)
  //         alert("sent token")
  //       })
  //     } // ether send
  //     else {
  //       const tx = {
  //         from: send_account,
  //         to: to_address,
  //         value: ethers.utils.parseEther(send_token_amount),
  //         nonce: window.ethersProvider.getTransactionCount(
  //           send_account,
  //           "latest"
  //         ),
  //         gasLimit: ethers.utils.hexlify(gas_limit), // 100000
  //         gasPrice: gas_price,
  //       }
  //       console.dir(tx)
  //       try {
  //         walletSigner.sendTransaction(tx).then((transaction) => {
  //           console.dir(transaction)
  //           alert("Send finished!")
  //         })
  //       } catch (error) {
  //         alert("failed to send!!")
  //       }
  //     }
  //   })
  // }
  