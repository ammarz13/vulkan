<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9 mx-auto">
        <div class="info-text">
          <h4 class="text-center">Info</h4>
          <p class="text-center">
            Each Tier 3 VRLAND ticket can be used to claim Tier 3 land which
            represents a 4x4x5 plot you can access on the game. Your plot can
            enable you to showcase your hero, build a house, start a farm, or
            even create your own PVP arena!
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
