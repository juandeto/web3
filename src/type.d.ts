export interface ITransferDAI{
    approve: boolean,
    transfer: boolean,
    amount: number,
  }
export interface ITransferUSDC {
    approve: boolean,
    transfer: boolean,
    amount: number,
  }

export interface IUserWallet {
    address: string,
    balanceDai: number,
    balanceUsdc: number
}

type AppAction = {
    type: ActionTypes;
    transfer: ITransfer;
  };
  
type DispatchType = (args: AppAction) => AppAction;
  
export interface AppState {
    readonly targetWallet: string,
    readonly userWallet: IUserWallet;
    readonly transferDAI: ITransferDAI,
    readonly transferUSDC: ITransferUSDC,
    readonly loading: bool,
    readonly error: string,
    readonly theme: string
  }