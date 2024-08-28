<script setup>
import useEthers from "@/hooks/useEthers"; // 导入useEthers 钩子
import { ref, onMounted } from "vue";

const { provider, voteContract, getAccount } = useEthers();//使用useEthers钩子

// 定义主持人信息
const host = ref("");

// 获取主持人信息
const getHost = async () => {
  host.value = await voteContract.host; // 直接访问合约的属性
};

// 选民地址
const voterAddress = ref("");

// 分发票权
const mandate = async () => {
  const arr = JSON.parse(voterAddress.value); // 使用 JSON.parse 替代 eval
  //例如：
  //[
  //"0x8e93aD3E8EDbEa8f9C7e9b17b79d4E8bFD645e54",
  //"0xB04f65e5a5A9D89b72c6A757E62672CA822F788c",
  //]
  const account = await getAccount();
  const tx = await voteContract.mandate(arr, { from: account}); // 使用 await 等待交易哈希返回
  await tx.wait(); // 等待交易被矿工打包并上链
  console.log("选票分发成功");
};

onMounted(async () => {
  await getHost();
});
</script>

<template>
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
        <!-- 这里的输入要求是js格式的数组，这样voterAddress就会是json格式的字符串，因为voterAddress是相应是字符串-->
        <!-- "["0x8e93aD3E8EDbEa8f9C7e9b17b79d4E8bFD645e54","0xB04f65e5a5A9D89b72c6A757E62672CA822F788c"]" 这个就是以太坊地址数组的JSON格式字符串-->
      </van-space>
    </div>
    <div class="btn">
      <van-button block @click="mandate">开始分发选票</van-button>
    </div>
  </div>
</template>

<style lang="scss"></style>