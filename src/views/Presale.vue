<template>
  <div>
    <NewHeader />

    <!-- <div class="d-flex justify-content-center _header mb-3">
      <img src="/img/logo.png" alt="Logo" />
    </div> -->

    <div class="container text-center">
      <!-- <h2 class="fw-bolder fw-2 _presale my-4">
        THE OFFICIAL SALE OF THE
        <span class="text-primary">{{ tokenName }}</span>
      </h2> -->
      <h2 class="fw-bolder fw-2 _presale">Buy {{ tokenName }}</h2>
      <span class="text-uppercase fw-bolder small-text"
        >PRESALE STARTING
        {{ $date(startTime).tz("America/New_York").format("MMMM D, h:mm A") }}
        EST</span
      >
      <div class="row justify-content-center mb-60">
        <div class="col-md-12 col-lg-10">
          <div class="dark-bg pb-0 fw-bolder">
            <div
              v-if="!firstTimeLoaded"
              class="fs-3 align-self-center text-primary mb-4"
            >
              Loading...
            </div>
            <div v-else>
              <div class="mb-0 small-text">
                TOTAL SOLD: {{ totalTokensPurchased.toFixed() }} /
                {{ totalTokensForSale }} {{ tokenName }}
              </div>
              <!-- <div class="progress mb-4">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="`width: ${totalPercentageSold}%`"
                  :aria-valuenow="totalPercentageSold"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="row position-relative">
        <div class="col-lg-6 mb-3 infocolumn">
          <div class="d-flex flex-column salebox h-100">
            <div>
              <h3 class="fw-bold fs-1 mb-3">INFO</h3>
              <div class="_line"></div>
            </div>
            <div
              v-if="!firstTimeLoaded"
              class="fs-3 align-self-center text-primary"
            >
              Loading...
            </div>
            <div
              v-else
              class="d-flex flex-column justify-content-between h-100 mb-2"
            >
              <div class="d-flex flex-column justify-content-center h-100 mb-3">
                <div class="fs-5 fw-bold">Sale Date</div>
                <div class="mb-3">
                  {{
                    $date(startTime)
                      .tz("America/New_York")
                      .format("MMMM D, h:mm A")
                  }}
                  EST
                </div>

                <div class="fs-5 fw-bold">Individual Addresses</div>
                <div class="mb-2">1000</div>

                <div class="fs-5 fw-bold">Max per Wallet</div>
                <div>{{ maxPerWallet }} {{ tokenName }}</div>
              </div>
            </div>
            <div v-if="false">
              <a href class="text-info pb-0" @click.prevent="addTokenToWallet()"
                >Add {{ tokenName }} asset to wallet</a
              >
            </div>
          </div>
        </div>
        <span class="arrow-box">
          <font-awesome-icon icon="fas fa-long-arrow-alt-right" />
        </span>
        <div class="col-lg-6 mb-3 presalebox">
          <div class="salebox h-100">
            <div class="">
              <div>
                <h3 class="fw-bold fs-1 mb-3">PRESALE LIVE NOW</h3>
                <div class="_line"></div>
              </div>

              <div
                v-if="!firstTimeLoaded"
                class="fs-3 align-self-center text-primary"
              >
                Loading...
              </div>

              <div v-else class="d-flex flex-column justify-content-between">
                <div class="mb-3">
                  <h5 class="mb-4 fw-bold">
                    {{ 1 / displayPriceDivider }} ETH =
                    {{ tokensPerEth / displayPriceDivider }} {{ tokenName }}
                  </h5>

                  <div class="small fs-6 mb-3" v-if="userAccount">
                    Your balance:
                    {{ accountETHBalance | formatBalance(tokenDecimals, 2) }}
                    {{ ethName }}
                  </div>

                  <div class="input-group mb-3 _input_group mx-auto">
                    <!-- <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click="min()"
                  >
                    MIN
                  </button> -->
                    <input
                      class="form-control new-input"
                      type="number"
                      :min="minBuy"
                      :max="maxEth"
                      step="0.1"
                      :placeholder="`${ethName} amount `"
                      v-model="buyAmount"
                      :class="{ invalid: buyAmount && !buyAmountValid }"
                    />
                    <!-- <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click="max()"
                  >
                    MAX
                  </button> -->
                  </div>

                  <h5 class="mb-1 mt-2" v-if="buyAmount">
                    You will get {{ buyCalculated }} {{ tokenName }}
                  </h5>
                  <!--h5 class="mb-1 mt-2 text-danger" v-if="!buyAmount">Enter correct {{ethName}} amount</h5-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="!userAccount">
          <button class="btn-lg connect-wallet" @click="gConnect()">
            Connect wallet
          </button>
        </div>
        <div v-if="userAccount">
          <button
            class="btn btn-primary btn-lg mt-3 px-5"
            @click="buy()"
            :disabled="!buyAmountValid"
          >
            BUY
          </button>
        </div>
      </div>

      <button
        class="btn btn-link text-muted mt-3 px-5"
        @click="reset()"
        v-if="false"
      >
        RESET
      </button>
    </div>
    <Info />
    <NewFooter />
  </div>
</template>

<style lang="scss">
@import "@/scss/variables.scss";
._lock {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding: 1rem;
  filter: grayscale(100%);
  &._unlocked {
    filter: none;
  }
  ._name {
    font-weight: bold;
  }
  ._at {
    font-size: 0.7rem;
  }
  ._lvl {
    position: absolute;
    font-weight: bold;
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
      2px 2px 0 #000;
    top: 15%;
    left: 25%;
  }
  img {
    height: 100px;
    width: 100px;
  }
}

._presale {
  color: #ffffff;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  margin: 40px 0px 16px;
}
._input_group {
  max-width: 350px;

  input {
    color: black;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
  }
}
._line {
  width: 100%;
  height: 1px;
  //background-color: rgba($_primary, 0.5);
  background-color: #e6e8ec;
  margin-bottom: 1rem;
}
._header {
  background: rgba(0, 0, 0, 0.74);
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.35) !important;
  img {
    max-width: 90%;
  }
}
.custom-col {
  padding: 1.4rem;
  border: 1px solid rgba($_primary, 0.5);
  border-radius: 1rem;
  transition: 350ms ease-in-out;
  height: 100%;
  background: rgba(0, 0, 0, 0.74);
}
.progress {
  margin-top: 1rem;
  display: flex;
  height: 0.3rem;
  overflow: hidden;
  line-height: 0;
  font-size: 0.75rem;
  background-color: #212136;
  border-radius: 0.4rem;
  .progress-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    background-color: $_primary;
    transition: width 0.6s ease;
    &._liquidity {
      background-color: rgb(218, 55, 55);
    }
  }
}
.small-text {
  font-size: 13px;
}
.new-input {
  height: 48px;
  padding: 0 48px 0 16px;
  border-radius: 12px;
  text-align: left !important;
  border: none;
  background-color: transparent;
  &:focus {
    background-color: transparent;
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: inner-spin-button !important;
  width: 25px;
  position: absolute;
  top: 0;
  right: 48px;
  height: 100%;
}

.mb-60 {
  margin-bottom: 60px;
}

.connect-wallet {
  max-width: 400px;
  width: 100%;
  margin: auto;
  margin-top: 50px;

  background-color: rgba(0, 0, 0, 0);
  height: 48px;
  padding: 16px 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  background-color: #3772ff;
  color: #fcfcfd;
  border-radius: 90px;
  border: none;
  margin-bottom: 20px;
}
.infocolumn {
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 991px) {
    justify-content: center;
  }
}
.presalebox {
  @media screen and (max-width: 991px) {
    display: flex;
    justify-content: center;
  }
}
.arrow-box {
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10.2px;
  height: 51px;
  width: 51px;
  background: #fff;
  margin: -0.8em;
  border: 2px solid #e6e8ec;
  box-sizing: border-box;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: -8px 0 0;
  svg {
    width: 16px;
    height: 16px;
    color: #000;
  }
  @media screen and (max-width: 991px) {
    margin: 16px 0 0;
  }
  @media screen and (max-width: 575px) {
    display: none;
  }
}
</style>

<script>
import { CHAIN, MAIN_CHAIN } from "@/store/web3modal.store";
import { ethers, utils } from "ethers";
import crowdSaleAbi from "@/assets/contracts/crowdSaleAbi";
import NewHeader from "../components/NewHeader.vue";
import NewFooter from "../components/NewFooter.vue";
import Info from "../components/Info.vue";
export default {
  name: "Home",
  components: { NewFooter, Info, NewHeader },
  data() {
    return {
      firstTimeLoaded: false,

      tokenAddress:
        CHAIN === MAIN_CHAIN
          ? "0x006De966CaB09404D0b6983963536AE8e378FAC9"
          : "0x647539A94EC1BDd358173D629F0741077Cb54838", // ETH : FTM
      tokenContract: null,
      tokenDecimals: 18,
      // TOEDIT
      tokenName: "VULKAN TOKENS",
      ethName: "ETH",
      rounds: [
        { name: "1", tokens: 1000, price: 0.1 },
        //{ name: '2', tokens: 500, price: 0.013 },
        //{ name: '3', tokens: 500, price: 0.018 },
        //{ name: '4', tokens: 500, price: 0.025 },
        //{ name: '5', tokens: 500, price: 0.035 }
      ],
      locks: [
        { name: "Tier 1", unlock: 10, lvl: 5, img: "/img/lock_01.png" },
        { name: "Tier 2", unlock: 20, lvl: 10, img: "/img/lock_02.png" },
        { name: "Tier 3", unlock: 30, lvl: 15, img: "/img/lock_03.png" },
        { name: "Tier 4", unlock: 40, lvl: 20, img: "/img/lock_04.png" },
        { name: "Tier 5", unlock: 50, lvl: 30, img: "/img/lock_05.png" },
      ],
      totalTokensPurchased: 0,
      totalEthReceived: 0,
      liquidityEthMax: 30,
      minBuy: 0.1,
      buyAmount: 0.1,
      buyAmountDefault: 0.1,
      maxPerWallet: 20,
      maxEth: 2,
      startTime: null,
      accountETHBalance: null,
      displayPriceDivider: 10,
    };
  },
  mounted() {
    this.$eventBus.$on("update::data", this.update);
    this.$eventBus.$on("clear::user::data", this.clear);

    if (this.web3Active) this.update();

    let self = this;
    setTimeout(function tick() {
      if (!self.firstTimeLoaded) {
        self.load();
      }

      let tokensPurchased = 0;
      const percentageSold = self.totalPercentageSold;

      if (percentageSold < 97) {
        tokensPurchased =
          getRandomInt(1, getRandomInt(1, 10) * ((100 - percentageSold) / 5)) /
          10;
        self.totalTokensPurchased += tokensPurchased;
        if (self.totalTokensPurchased > self.totalTokensForSale) {
          self.totalTokensPurchased = self.totalTokensForSale;
        }
        self.totalEthReceived =
          self.totalTokensPurchased *
          self.rounds[self.currentRound.index].price;
      }

      let delay = getRandomInt(100, 200);

      if (percentageSold > 20) {
        delay = getRandomInt(100, 600);
      }

      if (percentageSold > 30) {
        delay = getRandomInt(300, 1000);
      }
      if (percentageSold > 50) {
        delay = getRandomInt(500, 2000);
      }
      if (percentageSold > 70) {
        delay = getRandomInt(800, 2000);
      }
      if (percentageSold > 75) {
        delay = getRandomInt(900, 3000);
      }
      if (percentageSold > 83) {
        delay = getRandomInt(1000, 3500);
      }
      if (percentageSold > 87) {
        delay = getRandomInt(1500, 4000);
      }
      if (percentageSold > 91) {
        delay = getRandomInt(2000, 4500);
      }
      if (percentageSold > 95) {
        delay = getRandomInt(3000, 5000);
      }

      if (percentageSold < 97) {
        setTimeout(tick, delay);
      }

      self.firstTimeLoaded = true;
      self.save();
    }, 200);
  },

  beforeDestroy() {
    this.$eventBus.$off("update::data");
    this.$eventBus.$off("clear::user::data");
  },

  computed: {
    totalTokensForSale() {
      return this.rounds.reduce(function (acc, obj) {
        acc += obj.tokens;
        return acc;
      }, 0);
    },

    totalPercentageSold() {
      return (
        this.totalTokensPurchased /
        (this.totalTokensForSale / 100)
      ).toFixed();
    },

    currentRound() {
      let tokens = 0;
      let index = 0;
      let price = 0;
      for (let i = 0; i < this.rounds.length; i++) {
        tokens += this.rounds[i].tokens;
        if (this.totalTokensPurchased < tokens) {
          index = i;
          price = this.rounds[i].price;
          break;
        }
      }
      return { index, tokens, price };
    },

    liquidityRaisePercentage() {
      return (this.totalEthReceived / (this.liquidityEthMax / 100)).toFixed();
    },

    roundPercentage() {
      let left = this.currentRound.tokens - this.totalTokensPurchased;
      left = this.rounds[this.currentRound.index].tokens - left;
      if (left < 0) left = 0;
      return (
        left /
        (this.rounds[this.currentRound.index].tokens / 100)
      ).toFixed(2);
    },

    tokensPerEth() {
      return (1 / this.rounds[this.currentRound.index].price).toFixed();
    },

    buyAmountValid() {
      if (!this.buyAmount) return false;
      if (this.buyAmount > this.maxEth) return false;
      if (this.buyAmount < this.minBuy) return false;

      let amount = utils.parseUnits(
        parseFloat(this.buyAmount).toFixed(this.tokenDecimals),
        this.tokenDecimals
      );
      if (amount.eq(0)) return false;
      if (this.accountETHBalance && amount.gt(this.accountETHBalance))
        return false;
      if (
        amount.lt(utils.parseUnits(this.minBuy.toString(), this.tokenDecimals))
      )
        return false;
      return true;
    },

    buyCalculated() {
      if (!this.buyAmount) return false;
      return (this.buyAmount * this.tokensPerEth).toFixed();
    },
  },

  methods: {
    reset() {
      localStorage.removeItem("identifier");
      window.location.reload();
    },
    save() {
      let data = Buffer.from(
        JSON.stringify({
          startTime: this.startTime,
          totalTokensPurchased: this.totalTokensPurchased,
        })
      ).toString("base64");
      localStorage.setItem("identifier", data);
    },

    load() {
      let store = localStorage.getItem("identifier");
      if (!store) {
        this.startTime = this.$date(
          Math.floor(this.$date() / 3600000) * 3600000
        );
        let diff = Math.floor(
          this.$date().subtract(this.startTime).valueOf() / 1000 / 60
        );
        let randPercent = getRandomInt(4, 18);
        if (diff > 10) randPercent = getRandomInt(16, 29);
        if (diff > 20) randPercent = getRandomInt(27, 39);
        if (diff > 30) randPercent = getRandomInt(38, 55);
        if (diff > 40) randPercent = getRandomInt(54, 63);
        if (diff > 50) randPercent = getRandomInt(62, 71);
        this.totalTokensPurchased =
          (this.totalTokensForSale / 100) * randPercent;
        this.save();
      } else {
        let data = JSON.parse(Buffer.from(store, "base64"));
        this.startTime = data.startTime;
        this.totalTokensPurchased = data.totalTokensPurchased;
      }
    },

    async buy() {
      this.$loaderShow();
      try {
        let amount = utils.parseUnits(
          parseFloat(this.buyAmount).toFixed(this.tokenDecimals),
          this.tokenDecimals
        );
        let buyTokensAmount = this.buyCalculated;
        let tokens = utils.parseUnits(
          parseFloat(this.buyCalculated).toFixed(this.tokenDecimals),
          this.tokenDecimals
        );

        const tokenContract = new ethers.Contract(
          this.tokenAddress,
          crowdSaleAbi,
          this.web3modal.library.getSigner()
        );
        const tx = await tokenContract.buyTokens(tokens, {
          from: this.userAccount,
          value: amount,
        });

        this.$log.debug(`tx`, tx);
        this.buyAmount = this.buyAmountDefault;
        this.$eventBus.$emit("tx::result::toast", {
          emit: "update::data",
          tx,
          msg: { title: "Contribute" },
        });

        this.$loaderHide();
        await this.$wait(500);
        this.$swal({
          icon: "success",
          title: "Contribute",
          text: "Please wait for blockchain confirmation!",
          //footer: `<a href="${this.web3modal.explorerURL + 'tx/'  + tx.hash}" target="_blank" class="text-highlight">${this.$options.filters.txHashShort(tx.hash)}</a>`
        });

        await tx.wait();
        this.totalTokensPurchased += parseFloat(buyTokensAmount);
      } catch (error) {
        this.$log.error("approve error", error);
        this.$loaderHide();
        await this.$wait(500);
        this.$swal({
          icon: "error",
          title: "Contribute",
          text: error.data?.message
            ? error.message + " ... " + error.data?.message
            : error.message,
          confirmButtonColor: this.confirmButtonColor,
        });
      }
    },

    min() {
      this.buyAmount = this.minBuy;
    },

    max() {
      this.buyAmount = parseFloat(
        utils.formatUnits(this.accountETHBalance, this.tokenDecimals)
      ).toFixed(this.tokenDecimals);
      if (this.buyAmount > this.maxEth) {
        this.buyAmount = this.maxEth;
      }
    },

    update() {
      if (this.userAccount) {
        this.getUserData();
      }
    },

    clear() {
      this.accountETHBalance = null;
    },

    async getUserData() {
      try {
        this.$log.debug(`getUserData`);
        this.web3modal.library
          .getBalance(this.userAccount)
          .then((v) => (this.accountETHBalance = v));
      } catch (error) {
        this.clear();
      }
    },

    async addTokenToWallet() {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await this.web3modal.provider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: this.tokenAddress, // The address that the token is at.
              symbol: this.tokenName, // A ticker symbol or shorthand, up to 5 chars.
              decimals: this.tokenDecimals, // The number of decimals in the token
              image: window.location.origin + "/img/favicon.png", // A string url of the token logo
            },
          },
        });
        if (wasAdded) {
          console.log("Thanks for your interest!");
        } else {
          console.log("Your loss!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>
