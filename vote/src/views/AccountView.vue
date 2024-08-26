<script setup>
import { ref, onMounted } from "vue";
import useEthers from "@/hooks/useEthers"; // 确保已经转换了 useEthers 钩子

const { voteContract, getAccount } = useEthers(); // 移除了 web3，因为我们不再需要它

const account = ref("");
const voterInfo = ref({});
const delegatorAddress = ref("");

const getVoteInfo = async () => {
  account.value = await getAccount();
  voterInfo.value = await voteContract.voters(account.value); // 直接调用合约方法，不需要 .call()
};

const delegate = async () => {
  try {
    const tx = await voteContract.delegate(delegatorAddress.value, { from: account.value }); // 发送交易
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
  <!-- 模板部分不需要修改，因为模板与 JavaScript 逻辑无关 -->
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
      <van-field
        v-model="delegatorAddress"
        label="受托人地址"
        placeholder="请输入受托人地址"
      />
      <van-button block @click="delegate">委托他人代投</van-button>
    </div>
  </div>
</template>

<style lang="less"></style>