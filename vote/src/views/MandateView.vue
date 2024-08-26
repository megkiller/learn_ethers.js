<script setup>
import useEthers from "@/hooks/useEthers"; // 导入转换后的 useEthers 钩子
import { ref, onMounted } from "vue";

const { provider, voteContract, getAccount } = useEthers();

// 定义主持人信息
const host = ref("");

// 获取主持人信息
const getHost = async () => {
  host.value = await voteContract.host; // 直接访问合约的属性，而不是调用方法
};

// 选民地址
const voterAddress = ref("");

// 分发票权
const mandate = async () => {
  const arr = JSON.parse(voterAddress.value); // 使用 JSON.parse 替代 eval
  const account = await getAccount();
  const tx = await voteContract.mandate(arr, {
    from: account
  }); // 使用 await 等待交易哈希返回
  await tx.wait(); // 等待交易被矿工打包并上链
  console.log("选票分发成功");
};

onMounted(async () => {
  await getHost();
});
</script>

<template>
  <!-- 模板部分不需要修改，因为模板与 JavaScript 逻辑无关 -->
  <div class="box1">
    <van-divider>分发票权</van-divider>
    <div class="host">
      <van-space>
        <p class="label"><van-icon name="manager" />主持人地址</p>
        <p class="address">{{ host }}</p>
      </van-space>
    </div>
    <div>
      <van-space>
        <p class="label"><van-icon name="friends-o" />投票人地址</p>
        <textarea class="votors" v-model="voterAddress"></textarea>
      </van-space>
    </div>
    <div class="btn">
      <van-button block @click="mandate">开始分发选票</van-button>
    </div>
  </div>
</template>

<style lang="scss"></style>