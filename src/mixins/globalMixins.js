import Vue from "vue";
import { ethers, BigNumber } from "ethers";
import { mapState } from "vuex";
import { CHAIN, getLibrary } from '../store/web3modal.store';    

export default {
  data() {
    return {
      $loader: null,
      isLoading: false, 
      confirmButtonColor: 'rgb(242 116 116)'
    };
  },

  computed: {     
    
    ...mapState(['web3modal']), 
     
    web3Active() {
      return this.web3modal.active
    },

    chainId() {
      return this.web3modal.chainId
    },

    chainIdValid() {
      return this.chainId == CHAIN
    },

    userAccount() {
      return this.web3modal.account
    },
       
    gBreakPoint() {
      return function (bp, condition) {
        return this.$store.getters.breakPoint(bp, condition)
      }
    },
    gBreakPointIndex() { return this.$store.getters.breakPointIndex },
        
  },

  methods: {    
    async gConnect() { 
      const self = this
      if (this.userAccount) {
        this.$swal({
          title: 'Wallet manage',
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: 'Connect another',            
          denyButtonText: `Disconnect`,         
        }).then(async (result) => {
          console.log(self.web3modal)
          try {
            if (result.isConfirmed) {              
              await self.web3modal.web3Modal.clearCachedProvider();     
              localStorage.clear(); 
              self.$store.commit('setAccount', null)              
              self.$store.commit('setLibrary', getLibrary())
              await self.$store.dispatch('connect')
            }
            if (result.isDenied) {
              await self.web3modal.web3Modal.clearCachedProvider();   
              localStorage.clear();
              self.$store.commit('setAccount', null)
              self.$store.commit('setLibrary', getLibrary())
            }  
          } catch (error) {
            console.log('111', error)
          }          
        })
      } else {
        try {
          await this.$store.dispatch('connect')
        } catch (error) {
          console.log('222', error)
        }        
      }
    },
    async switchToNetwork(swal){
      console.log('switchToNetwork')
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }], 
        });
        //console.log(swal)
        //if (swal) swal.close()         
      } catch (error) {
        console.log(error)
      }
    },
    
    cleanObject: obj => cleanObject(obj),

    // Loader
    $loaderShow({ ...options }) {
      if (this.$loader) {
        this.$loader.hide()
        this.$loader = null;
      }
      this.isLoading = true;
      options.container = options.container ? options.container : document.querySelector("[loading-container]")
      this.$loader = this.$loading.show(options)
    },

    $loaderHide(delay = 500) {
      return new Promise(resolve => setTimeout(() => {
        if (this.$loader) this.$loader.hide()        
        this.$loader = null;
        this.isLoading = false;
        resolve()
      }, delay));
    },

    $wait(delay = 500) {
      return new Promise(resolve => setTimeout(() => {        
        resolve()
      }, delay));
    },
    
    $openLink(url) {
      console.log(url)
      const { hostname } = new URL(url);
      console.log(hostname, window.location.host)
      if (hostname === window.location.host) return;

      window.open(url, '_blank')
    }

  },
  filters: {
    addressShort(tokenAddress) {
      if (tokenAddress) return tokenAddress.replace(tokenAddress.substring(6, 38), "...")
      return '...'      
    },

    txHashShort(txHash) {
      if (txHash) return txHash.replace(txHash.substring(8, 60), ".....")
      return '.....'
    },

    formatWalletBalance(val) {
      if (!val) return '--'
      return BigNumber.from(val).toString();      
    },

    toUpperCase(val) {
      return val.toUpperCase();      
    },
    
    formatBalance(val, decimals = 18, fixed = 4) {
      if (val === null || val === undefined) return '--'
      if (typeof val === 'string') return val

      if (!BigNumber.isBigNumber(val)) return '--'
      if (BigNumber.isBigNumber(val)) {
        let n = parseFloat(ethers.utils.formatUnits(val, decimals)).toFixed(fixed)
        if (n.match(/\./)) n = n.replace(/\.?0+$/, '');        
        return n //.replace(/\.0+$/,'');
      }
      return '0.00000'
    },

    anyBNValue(val) {
      if (val === null || val === undefined) return '--'
      if (typeof val === 'string') return val
      if (!BigNumber.isBigNumber(val)) return '--'
      return val.toString();
    },

    numberWithCommas(x) {
      if (x === undefined || x === null || x === '--') return '--'
      if (x === '--' || x === 'ERROR') return x
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },

    abbrNum(number, decPlaces = 0) {
      if (number === undefined || number === null) return '--'
      if (number === '--' || number === 'ERROR') return number
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = Math.pow(10,decPlaces);
      // Enumerate number abbreviations
      var abbrev = [ "k", "m", "b", "t" ];
      // Go through the array backwards, so we do the largest first
      for (var i=abbrev.length-1; i>=0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
         // Here, we multiply by decPlaces, round, and then divide by decPlaces.
         // This gives us nice rounding to a particular decimal place.
         number = Math.round(number*decPlaces/size)/decPlaces;
         // Handle special case where we round up to the next abbreviation
         if((number == 1000) && (i < abbrev.length - 1)) {
          number = 1;
          i++;
         }
         // Add the letter for the abbreviation
         number += abbrev[i];
         // We are done... stop
         break;
        }
      }
      return number;
    },
  },  
}

function cleanObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export {
  cleanObject
}