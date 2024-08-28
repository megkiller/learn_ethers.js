<script setup>
import { ref, onMounted } from "vue";
import useEthers from "@/hooks/useEthers"; // 引入useEthers钩子

const { voteContract, getAccount } = useEthers(); // 调用useEthers钩子获取到voteContract合约实例和getAccount函数

const account = ref("");//账户
const voterInfo = ref({});//选民信息
const delegatorAddress = ref("");//委托人地址

const getVoteInfo = async () => {
  account.value = await getAccount();
  voterInfo.value = await voteContract.voters(account.value); // Ethers.js 会调用公共变量voters的getter函数，并传入 account.value 作为参数。
};

//只要调用的合约里面的函数涉及到了交易都用这样的框架(熟记)
const delegate = async () => {
  try {
    const tx = await voteContract.delegate(delegatorAddress.value, { from: account.value }); //{ from: account.value }：这是一个交易选项对象，指定了发送交易的账户地址
    //tx是一个交易对象，包含了交易的详细信息，比如交易哈希（tx.hash）、交易nonce（tx.nonce）、交易的gas限制（tx.gasLimit）等。这个对象也可以用来检查交易是否被成功矿工打包并执行。
    const receipt = await tx.wait(); // 等待交易被确认
    console.log("委托成功！");
  } catch (error) {
    console.error("委托失败：", error);
  }
};

onMounted(async () => {
  await getVoteInfo();
});
</script>

<template>
  <div class="box2">
    <van-divider>账户信息</van-divider>
    <van-space>
      <p class="label">当前账户</p>
      <p class="address">{{ account }}</p>
    </van-space>
    <br />
    <van-space>
      <p class="label">账户票数</p>
      <p class="address">{{ voterInfo.amount }}</p>
    </van-space>
    <br />
    <van-space>
      <p class="label">委托账户</p>
      <p class="address">{{ voterInfo.delegator }}</p>
    </van-space>
    <br />
    <van-space>
      <p class="label">是否已投票</p>
      <p class="address">{{ voterInfo.isVoted }}</p>
    </van-space>
    <br />
    <van-space>
      <p class="label">投票ID</p>
      <p class="address">{{ voterInfo.targetId }}</p>
    </van-space>
    <br />
    <div class="btn">
      <van-field v-model="delegatorAddress"  label="受托人地址"  placeholder="请输入受托人地址" />
      <van-button block @click="delegate">委托他人代投</van-button>
    </div>
  </div>
</template>

<style lang="less"></style>