<script setup>
import useEthers from "@/hooks/useEthers"; // 导入转换后的 useEthers 钩子
import { ref, onMounted } from "vue";

const { voteContract, getAccount } = useEthers(); //使用useEthers钩子

// 看板信息
const board = ref([]);

// 账户信息
const account = ref("");

const getBoardInfo = async () => {
  const result = await voteContract.getBoardInfo(); // 直接调用合约方法
  board.value = result;
};

const vote = async (index) => {
  const signerAccount = await getAccount(); // 使用签名者账户发送交易
  try {
    const tx = await voteContract.vote(index, { from: signerAccount }); // 发送交易
    const receipt = await tx.wait(); // 等待交易被确认
    console.log(`投票成功，交易哈希：${receipt.transactionHash}`);
  } catch (error) {
    console.error("投票失败：", error);
  }
};

const initEventListen = () => {
  // 使用 ethers.js 的事件监听
  voteContract.on("VoteSuccess", () => {
    console.log("智能合约触发的事件：");
  });
};

onMounted(() => {
  initEventListen();
  getBoardInfo();
});
</script>

<template>
  <div class="box3">
    <van-divider>投票看板</van-divider>
    <van-cell :title="item.name" icon="shop-o" v-for="(item, index) in board" :key="index">
      <template #right-icon>
        <van-button @click="vote(index)">{{ item.totalAmount }}</van-button>
      </template>
    </van-cell>
  </div>
</template>

<style lang="less"></style>