// Gets first four and last four characters
const shortenRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

// Shortens given address to first four and last four characters
const shortenAddress = (address: string) => {
  if (address) {
    const match = address.match(shortenRegex);

    if (!match) return address;

    return `${match[1]}…${match[2]}`;
  }
};

export default shortenAddress;
