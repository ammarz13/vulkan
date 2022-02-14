<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9 mx-auto">
        <div class="info-text">
          <h4 class="text-center">Info</h4>
          <p class="text-center">
            VULKAN Safe is a smart contract wallet running on Ethereum that
            requires a minimum number of people to approve a transaction before
            it can occur (M-of-N). If for example you have 3 main stakeholders
            in your business, you are able to set up the wallet to require
            approval from all 3 people before the transaction is sent. This
            assures that no single person could compromise the funds.On top of
            that, VULKAN Safe gives you complete self custody over your funds.
            There is no risk of a bank giving you a hassle for running a crypto
            business and the smart contract that is deployed is completely
            trustless and in your control.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  return() {},
};
</script>

<style lang="scss" scoped>
.info-text {
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-top: 40px;
  margin-bottom: 60px;
  h4 {
    font-size: 32px;
  }
  p {
    font-size: 16px;
    margin-top: 16px;
    font-weight: bold;
  }
}
</style>
