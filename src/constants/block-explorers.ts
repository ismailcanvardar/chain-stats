interface IBlockExplorers {
  [key: number]: string;
  1: string;
  56: string;
  137: string;
  250: string;
  43114: string;
}

const BLOCK_EXPLORERS = {
  1: "https://etherscan.io/",
  56: "https://www.bscscan.com/",
  137: "https://polygonscan.com/",
  250: "https://ftmscan.com/",
  43114: "https://snowtrace.io/",
} as IBlockExplorers;

export default BLOCK_EXPLORERS;
