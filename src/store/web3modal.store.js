import Vue from "vue";
import { ethers } from "ethers";

export const CHAIN = '1' // 0 - test 0xfa2, 1 - main 0xfa
export const MAIN_CHAIN = '1'
export const RPC_URL = CHAIN === MAIN_CHAIN ? 'https://mainnet.infura.io/v3/df00353bb1e94a539d0a6629367f3ba3' : 'https://rpc.testnet.fantom.network/'

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL, "any")
export const getLibrary = () => {
  const web3NoAccount = new ethers.providers.JsonRpcProvider(RPC_URL, "any")
  web3NoAccount.pollingInterval = 12000;
  return web3NoAccount
}

const web3modal = {
  state: {
		dataUpdateInterval: 60 * 1000, // 30 seconds
    web3Modal: null,

    library: getLibrary(),
		simpleRpc: simpleRpcProvider,
    active: false,
    account: null,
		provider: null,
    chainId: CHAIN,		
		explorerURL: CHAIN === MAIN_CHAIN ? 'https://etherscan.io' : 'https://testnet.ftmscan.com/',		
    
  },

  mutations: {
    setWeb3Modal(state, web3Modal) {
      state.web3Modal = web3Modal
    },
    setLibrary(state, library) {
      state.library = library
    },
    setActive(state, active) {
      state.active = active
		},
    setAccount(state, account) {
			state.account = account ? account.toLowerCase() : null			      
    },
    setChainId(state, chainId) {
      state.chainId = chainId
    },
		setProvider(state, provider) {
      state.provider = provider
    },
    
    setIIVaultQueueNumber(state, number) {
      state.iiVaultQueueNumber = number
    },
  },
  actions: {
		async connectRPC({state, commit, dispatch}) {
			Vue.$log.debug(`connectRPC`)
			commit('setActive', false)
			const network = await state.library.getNetwork()
      			
			commit('setChainId', network.chainId)
      commit('setActive', true)	
		},

    async connect({state, commit, dispatch}) {
      Vue.$log.debug(`connect`)			
			commit('setActive', false)
			
			const provider = await state.web3Modal.connect();
			commit('setProvider', provider)			
			
      const library = new ethers.providers.Web3Provider(provider, "any")
			library.pollingInterval = 12000
      commit('setLibrary', library)

			
			const network = await library.getNetwork()
      commit('setChainId', network.chainId)
      
      const accounts = await library.listAccounts()
      if (accounts.length > 0) {				
        commit('setAccount', accounts[0])
      } 

			commit('setActive', true)
			
      provider.on("connect", async (info) => {
        commit('setActive', false)
				await wait(500)
				commit('setChainId', parseInt(info.chainId))
				commit('setActive', true)        
      });

      provider.on("accountsChanged", async (accounts) => {
        
				commit('setActive', false)
				await wait(500)
				if (accounts.length > 0) {
          commit('setAccount', accounts[0])
					commit('setActive', true)
				} else {
          await dispatch('resetApp')
        }        
      });
      
			provider.on("chainChanged", async (chainId) => {
        commit('setActive', false)
				await wait(500)
				chainId = parseInt(chainId)	
        commit('setChainId', chainId)
				
				commit('setActive', true)
      });

      provider.on("network", (newNetwork, oldNetwork) => {
        // https://github.com/ethers-io/ethers.js/issues/866
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
            window.location.reload();
        }
      });

    },
    async resetApp({state, commit}) {
      try {
        await state.web3Modal.clearCachedProvider();
      } catch (error) {
        console.error(error)
      }
      commit('setAccount', null)
      commit('setActive', false)
      commit('setLibrary', getLibrary())
      commit('setIIVaultQueueNumber', null)
    },

  }
}

const wait = function(delay = 500){
	return new Promise(resolve => setTimeout(() => {        
		resolve()
	}, delay));
}

export default web3modal;