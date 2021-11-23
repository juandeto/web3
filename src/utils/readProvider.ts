import { JsonRpcBatchProvider } from '@ethersproject/providers'

const infuraId = process.env.REACT_APP_INFURA_ID
const rpcUrl = `https://rinkeby.infura.io/v3/${infuraId}`

export const readProvider = new JsonRpcBatchProvider(rpcUrl)