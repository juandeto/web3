
export enum TransferActionTypes {
    SET_TARGET_WALLET_TRANSFER= '@@userTransfers/SET_TARGET_WALLET_TRANSFER',
    SET_DAI_AMOUNT_TRANSFER = '@@userTransfers/SET_DAI_AMOUNT_TRANSFER',
    SET_APPROVAL_DAI_TRANSFER = '@@userTransfers/SET_APPROVAL_DAI_TRANSFER',
    SET_TRANSFER_DAI = '@@userTransfers/SET_TRANSFER_DAI',
    SET_LOADING_DAI_TRANSFER = '@@userTransfers/SET_LOADING_DAI_TRANSFER',
    SET_USDCD_AMOUNT_TRANSFER = '@@userTransfers/SET_USDCD_AMOUNT_TRANSFER',
    SET_APPROVAL_USDCD_TRANSFER = '@@userTransfers/SET_APPROVAL_USDCD_TRANSFER',
    SET_TRANSFER_USDCD = '@@userTransfers/SET_TRANSFER_USDCD',
    SET_LOADING_USDCD_TRANSFER = '@@userTransfers/SET_LOADING_USDCD_TRANSFER',
  }


export interface Transfer {
    readonly targetWallet: string
    readonly daiAmountToSend: string
    readonly approveDaiTransfer?: boolean
    readonly transferDai: boolean
}
  