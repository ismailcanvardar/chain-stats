import { ethers } from "ethers";

export interface IChainStats {
  provider: ethers.providers.JsonRpcProvider;
  getCurrentGasPrice(): Promise<string>;
  getLatestBlock(): Promise<any>;
  getBlockWithTransactions(blockNumber: number): Promise<string>;
}

class ChainStats implements IChainStats {
  public provider: ethers.providers.JsonRpcProvider;

  constructor(provider: ethers.providers.JsonRpcProvider) {
    this.provider = provider;
  }

  // Gets current gas price and converts it to ether from gwei
  public async getCurrentGasPrice(): Promise<string> {
    const gasPrice = await this.provider.getGasPrice();
    return ethers.utils.formatUnits(gasPrice, "gwei");
  }

  // Gets latest block number
  public async getLatestBlock(): Promise<any> {
    const block = await this.provider.getBlock("latest");
    return block;
  }

  // Gets block with transactions by block number, this data includes difficulty, gasLimit, timestamp, etc.
  public async getBlockWithTransactions(blockNumber: number): Promise<any> {
    const res = await this.provider.getBlockWithTransactions(blockNumber);
    return res;
  }
}

export default ChainStats;
