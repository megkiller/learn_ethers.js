使用Ethers.js发送交易时，如何使用不同的交易选项的示例代码

```js
const { ethers } = require("ethers");//cm6用法

// 假设 provider 是一个有效的 Ethers.js provider 实例
// 假设 contract 是已经实例化的智能合约对象
// 假设 account 是一个有效的账户对象，用于签署交易

// 设置交易选项
const txOptions = {
  from: account.address,  // 发送者的地址
  gasLimit: 200000,       // 设置最大gas限制
  gasPrice: ethers.utils.parseUnits('10', 'gwei'), // 设置gas价格，10 Gwei
  value: ethers.utils.parseEther('0.01'), // 发送的以太币数量，0.01 ETH
  nonce: await provider.getTransactionCount(account.address), // 设置nonce
  // 更多高级选项，如 EIP-1559 交易类型
  type: '0x02', // EIP-2930 访问列表交易
  accessList: [...], // 访问列表
  maxPriorityFeePerGas: ethers.utils.parseUnits('1', 'gwei'), // EIP-1559 优先费用
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // EIP-1559 最大费用
};

// 使用交易选项发送交易
const tx = await contract.someFunction(arg1, arg2, txOptions);
const receipt = await tx.wait();

console.log(`交易成功，收据：`, receipt);
```

