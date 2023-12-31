require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "HTTP://127.0.0.1:7545",
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
