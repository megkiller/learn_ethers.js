import { ethers } from "ethers"; // 导入 ethers 库
import VoteArtifact from "../contract/Vote.json"; // 导入合约的ABI和字节码
//VoteArtifact 位置的命名是可以是任意的

const useEthers = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum); // 创建一个provider实例，连接到用户的 Ethereum(matemask) 钱包,但是provider 本身并不直接与任何特定的以太坊账户绑定，
  const signer = provider.getSigner(); // 获取当前和matemask钱包链接的账户signer实例，用于发送交易

  const contractAddress = "0x9c6Ed4289406E10dE36d3c02EC8224d1BAA6E416"; // 合约地址
  const voteContract = new ethers.Contract(contractAddress, VoteArtifact.abi, signer); // 使用合约ABI和地址实例化合约对象
  //如果用provider实例化一个合约而不是使用signer实例化意味着这个当前实例化所得的合约不能发送交易.只能做一些查询的工作等不需要消耗gas的

  // 合约地址：告诉 ethers.js 要与区块链上的哪个合约交互。
  // ABI：提供合约的接口信息，对于智能合约中定义的每个公共函数，Ethers.js会根据ABI生成一个对应的JavaScript函数。
  // signer：允许合约对象发送需要授权的交易。如果只需要读取数据，可以不提供 signer，使用只读的 provider 即可。
  //在 ethers.js 中，当你使用 signer 发送交易或调用函数时，这个 signer 的地址就相当于 Solidity 合约中的 msg.sender。
  const getAccount = async () => {
    const accounts = await provider.listAccounts(); // 获取账户列表
    return accounts[0]; // 返回账户列表中的第一个账户。accounts[0] 表示账户列表中的第一个元素，这通常是用户当前选中的账户，也就是用户通过小狐狸钱包连接到dApp或网页时使用的那个账户地址。
  };

  return {
    provider,
    signer,//和当前matemask钱包连接的账户的signer实例
    voteContract,//合约的实例
    contractAddress,//合约的地址
    getAccount,//可以得到当前账户的第一个地址
  };
};

export default useEthers;



// 当我将合约实例化的时候
// const voteContract = new ethers.Contract(contractAddress, VoteArtifact.abi, signer);
// ethers.js都会做什么处理？
// 将我合约里面定义的函数提供接口？
// 还有我所写的变量自动生成相应的函数对吗？


// 实例化合约后，Ethers.js会做以下事情：
// 
// 生成接口函数：对于智能合约中定义的每个公共函数，Ethers.js会根据ABI生成一个对应的JavaScript函数。这个函数可以被用来调用合约的方法。
// 
// 处理交易：如果函数修改了区块链上的状态（即它不是view或pure函数），Ethers.js会使用签名者的账户来发送交易，并处理交易的签名和发送。
// 
// 事件监听：Ethers.js可以订阅合约事件，允许你监听和响应合约发出的事件。
// 
// 状态变量：对于合约中的公共状态变量，Ethers.js不会自动生成相应的函数。但是，你可以手动调用这些变量的getter函数，如果它们被定义为公共变量的话。
// 
// 编码和解码：Ethers.js会处理函数参数和返回值的编码与解码，确保它们与以太坊区块链的预期格式一致。
// 
// 错误处理：Ethers.js会处理来自区块链的错误，并将其转换为更易于理解的JavaScript错误。
// 
// 异步操作：所有与区块链交互的操作都是异步的，Ethers.js会返回Promise对象，你可以使用.then()和.catch()方法来处理这些异步操作的结果。