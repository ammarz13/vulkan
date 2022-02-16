<template>
  <div id="app">
    <!-- Info -->
    <div loading-container class="content w-100">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

    <!-- web3modal -->
    <web3-modal-vue
      ref="web3modal"
      :theme="theme"
      :provider-options="providerOptions"
      cache-provider
    />
  </div>
</template>

<style lang="scss" scoped>
.info-btn {
  display: inline-block;
  background: #33334f;
  padding: 0.8rem 2rem 0.8rem 2rem;
  text-align: center;
  position: relative;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.3);
  border-radius: 2rem;
}
</style>

<script>
import Web3ModalVue from "web3modal-vue";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAIN, RPC_URL } from "./store/web3modal.store";

export default {
  name: "App",
  components: {
    Web3ModalVue,
  },

  data() {
    return {
      theme: "light",
      providerOptions: {
        //walletconnect: {
        //  package: WalletConnectProvider,
        //  options: {
        //    rpc: {
        //      [CHAIN]: RPC_URL,
        //    },
        //    chainId: CHAIN,
        //    network: 'binance',
        //  }
        //}
      },
      swalWrongNetwork: null,
    };
  },

  mounted() {
    this.$eventBus.$on("tx::result::toast", this.txResultToast);

    let self = this;

    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal;

      this.$store.commit("setWeb3Modal", web3modal);

      await this.$store.dispatch("connect");
      //if (web3modal.cachedProvider) {
      //  await this.$store.dispatch('connect')
      //} else {
      //  this.$store.dispatch('connectRPC')
      //}

      setTimeout(function tick() {
        self.$eventBus.$emit("update::data");
        setTimeout(tick, self.web3modal.dataUpdateInterval);
      }, self.web3modal.dataUpdateInterval);
    });
  },

  watch: {
    userAccount(newVal, oldVal) {
      if (oldVal && newVal && newVal !== oldVal) {
        this.$eventBus.$emit("clear::user::data");
      }
      if (!newVal) {
        this.$eventBus.$emit("clear::user::data");
      }
    },

    web3Active(newVal, oldVal) {
      this.$log.debug(`Layout: web3Active`, newVal, oldVal);
      if (newVal) {
        this.$eventBus.$emit("update::data");
        if (!this.chainIdValid) {
          this.swalWrongNetwork = this.$swal({
            icon: "error",
            title: "NETWORK NOT SUPPORTED",
            text: "Please switch to Ethereum mainnet to participate",
            confirmButtonText: "Switch",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.switchToNetwork(this.swalWrongNetwork);
            }
          });
        }
      }
    },
  },

  methods: {
    async txResultToast({ tx, msg, emit }) {
      try {
        const result = await tx.wait();
        if (emit) this.$eventBus.$emit(emit);
        if (result.status) {
          this.$swal({
            icon: "success",
            title: msg.title,
            text: msg.success
              ? msg.success
              : "Blockchain confirmation successful!",
            //footer: `<a href="${this.web3modal.explorerURL + 'tx/' + result.transactionHash}" target="_blank" class="text-highlight">${this.$options.filters.txHashShort(result.transactionHash)}</a>`
          });
        } else {
          this.$swal({
            icon: "error",
            title: msg.title,
            text: msg.nosuccess
              ? msg.nosuccess
              : "Blockchain confirmation error!",
            //footer: `<a href="${this.web3modal.explorerURL + 'tx/' + result.transactionHash}" target="_blank" class="text-highlight">${this.$options.filters.txHashShort(result.transactionHash)}</a>`,
            confirmButtonColor: this.confirmButtonColor,
          });
        }
      } catch (error) {
        this.$swal({
          icon: "error",
          title: msg.title,
          text:
            "Blockchain confirmation error: " +
            (error.data?.message
              ? error.message + " ... " + error.data?.message
              : error.message),
          confirmButtonColor: this.confirmButtonColor,
        });
        this.$log.error("txResultToastQueue", error);
      }
    },
  },
};
</script>
