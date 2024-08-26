import { ethers } from "ethers"; // 导入 ethers 库
import VoteArtifact from "../contract/Vote.json"; // 导入合约的ABI和字节码

const useEthers = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum); // 创建一个provider实例，连接到用户的 Ethereum(matemask) 钱包,但是provider 本身并不直接与任何特定的以太坊账户绑定，
  const signer = provider.getSigner(); // 获取当前和matemask钱包链接的signer实例，用于发送交易

  const contractAddress = "0x9c6Ed4289406E10dE36d3c02EC8224d1BAA6E416"; // 合约地址
  const voteContract = new ethers.Contract(contractAddress, VoteArtifact.abi, signer); // 使用合约ABI和地址实例化合约对象

  // 合约地址：告诉 ethers.js 要与区块链上的哪个合约交互。
  // ABI：提供合约的接口信息，使得 ethers.js 知道如何构造调用合约的方法。
  // signer：允许合约对象发送需要授权的交易。如果只需要读取数据，可以不提供 signer，使用只读的 provider 即可。
  //在 ethers.js 中，当你使用 signer 发送交易或调用函数时，这个 signer 的地址就相当于 Solidity 合约中的 msg.sender。
  const getAccount = async () => {
    const accounts = await provider.listAccounts(); // 获取账户列表
    return accounts[0]; // 返回账户列表中的第一个账户
  };

  return {
    provider,
    signer,
    voteContract,
    contractAddress,
    getAccount,
  };
};

export default useEthers;