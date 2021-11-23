

export enum ActionTypes {
    CONNECT_WALLET = '@@action/CONNECT_WALLET',
    FETCH_REQUEST = '@@action/FETCH_REQUEST',
    FETCH_SUCCESS = '@@action/FETCH_SUCCESS',
    FETCH_ERROR = '@@action/FETCH_ERROR',
    SET_DAI_BALANCE = '@@action/SET_DAI_BALANCE',
    SET_USDCD_BALANCE = '@@action/SET_USDCD_BALANCE',
    APPROVE = '@@action/APPROVE',
    TRANSFER = '@@action/TRANSFER',
    SET_AMOUNT_DAI = '@@action/SET_AMOUNT_DAI',
    SET_AMOUNT_USDC = '@@action/SET_AMOUNT_USDC',
    SET_INVALID_INPUT_DAI = '@@action/SET_INVALID_INPUT_DAI',
    SET_INVALID_INPUT_USDC = '@@action/SET_INVALID_INPUT_USDC',
  }