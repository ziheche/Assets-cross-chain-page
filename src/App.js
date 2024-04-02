import './App.css';
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { ABI, CONTRACT_ADDRESS } from "./config";

function App() {

  const [metamaskIsConnected, setMetamaskIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opBalance, setOpBalance] = useState(0);
  const [baseBalance, setBaseBalance] = useState(0);
  const [isFromOpToBase, setIsFromOpToBase] = useState(true);
  const [chainId, setChainId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window.ethereum !== 'undefined') {
        if (window.ethereum.isConnected()) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setMetamaskIsConnected(true);
            getBalances(accounts[0]);
          }

        }
      }
    };
    fetchData();
  }, [])

  const getChainId = async () => {
    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.isConnected()) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        window.ethereum.on('chainChanged', (chainId) => {
          console.log('chainChanged', chainId);
          setChainId(chainId);
        });
      }
    }
  };

  const connectWallet = async () => {
    try {
      if(isLoading) return;
      await window.ethereum.enable();
      const accounts = await new Web3(window.ethereum).eth.getAccounts();
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(chainId);
      window.ethereum.on('chainChanged', (chainId) => {
        console.log('chainChanged', chainId);
        setChainId(chainId);
      });
      setAddress(accounts[0])
      setMetamaskIsConnected(true);
      getBalances(accounts[0]);
    } catch (error) {
      console.error('connect wallet error', error);
    }
  }

  async function getBalances(address) {
    let opBalance, baseBalance;
    try {
      const contract = new (new Web3('https://sepolia.optimism.io')).eth.Contract(ABI, CONTRACT_ADDRESS);
      const balance = await contract.methods.balanceOf(
        address,
      ).call();
      let bigNumber = new BigNumber(Number(balance));
      let result = bigNumber.dividedBy('1e18');
      opBalance = result.toString()
    } catch (error) {
      console.error(error);
    }
    try {
      const contract = new (new Web3('https://sepolia.base.org')).eth.Contract(ABI, CONTRACT_ADDRESS);
      const balance = await contract.methods.balanceOf(
        address,
      ).call();
      let bigNumber = new BigNumber(Number(balance));
      let result = bigNumber.dividedBy('1e18');
      baseBalance = result.toString()
    } catch (error) {
      console.error(error);
    }
    setOpBalance(opBalance);
    setBaseBalance(baseBalance);
  }

  const sendTx = async () => {
    try {
      if(isLoading) return;
      if (isFromOpToBase && chainId !== '0xaa37dc') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa37dc' }],
        });
      } else if (!isFromOpToBase && chainId !== '0x14a34') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x14a34' }],
        });
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const myAccount = accounts[0];
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      const channel = web3.utils.padRight(web3.utils.asciiToHex(isFromOpToBase ? "channel-10" : "channel-11"), 64);
      setIsLoading(true);
      await contract.methods.TransferCNY(
        CONTRACT_ADDRESS,
        channel,
        new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18)).toNumber()
      ).send({ from: myAccount });

      setTimeout(() => {
        setIsLoading(false);
        getBalances(myAccount)
      }, 36000)

    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(getChainId, 100);
  }, [])

  return (
    <div className="body">
      <div className='header'>
        {metamaskIsConnected ?
          (<span className='header-title'>
            <img src='https://owlto.finance/assets/Metamask-f899f9fb.png' alt='ethereum' className='header-title-image' />
            {address && (`${address.substring(0, 6)}...${address.substring(address.length - 4)}`)}</span>) :
          (<button className='button header-connect-button' onClick={connectWallet}>
            Connect Wallet
          </button>)}

      </div>
      <div className='content'>
        <div className='content-body'>
          <div className='content-body-token-wrap'>
            <span className='content-body-token'>Token</span>
            <div className='content-body-select-container'>
              <img src='https://owlto.finance/icon/token/USDC.png' alt='ethereum' style={{ height: '18px', width: '18px' }} />
              <span className='content-body-select'>CNY</span>
              <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEUAAACampqbm5uXl5eampqampqbm5uampqampp78bxhAAAACXRSTlMA/0Agv99/n2Ae7gPiAAAAVUlEQVR4nGMYeMCsBAMKYL6iIAwIg/lscH4BRH0hlCsCNcAEyneAGRgI5orCbTAE84XgfCYwH2IbGDSiSEOsTEB2YyLcMpiVMMugVoaiecqAsL/pAgAsnQnbSqP2EgAAAABJRU5ErkJggg==' alt='ethereum' className='content-body-select-icon' />
            </div>
          </div>
          <div className='content-body-item'>
            <div className='content-body-item-title'>
              <span className='content-body-item-title-from'>From</span>
              <span className='content-body-item-title-from'>Balance: {isFromOpToBase ? opBalance : baseBalance}</span>
            </div>
            <div className='content-body-item-select-container'>
              <div className='content-body-item-select-container-wrapper'>
                {isFromOpToBase ? <img src='https://owlto.finance/icon/chain/Optimism.png' alt='ethereum' className='content-body-item-select-image' /> : <img src='https://owlto.finance/icon/chain/Base.png' alt='ethereum' className='content-body-item-select-image' />}

                <span className='content-body-item-select'>{isFromOpToBase ? 'Optimism' : 'Base'}</span>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEUAAACampqbm5uXl5eampqampqbm5uampqampp78bxhAAAACXRSTlMA/0Agv99/n2Ae7gPiAAAAVUlEQVR4nGMYeMCsBAMKYL6iIAwIg/lscH4BRH0hlCsCNcAEyneAGRgI5orCbTAE84XgfCYwH2IbGDSiSEOsTEB2YyLcMpiVMMugVoaiecqAsL/pAgAsnQnbSqP2EgAAAABJRU5ErkJggg==' alt='ethereum' className='content-body-item-select-image' />
              </div>
              <input className='content-body-item-input'
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                }} type='text' placeholder='0.0' />
            </div>
          </div>
          <div className='content-body-toggle'>
            <img onClick={() => {
              setIsFromOpToBase(!isFromOpToBase);
            }} src='https://owlto.finance/assets/BridgeChange-6a77c62a.svg' alt='' className='content-body-toggle-image' />
          </div>
          <div className='content-body-item'>
            <div className='content-body-item-title'>
              <span className='content-body-item-title-from'>To</span>
              <span className='content-body-item-title-from'>Balance: {isFromOpToBase ? baseBalance : opBalance}</span>
            </div>
            <div className='content-body-item-select-container'>
              <div className='content-body-item-select-container-wrapper'>
                {isFromOpToBase ? <img src='https://owlto.finance/icon/chain/Base.png' alt='ethereum' className='content-body-item-select-image' /> : <img src='https://owlto.finance/icon/chain/Optimism.png' alt='ethereum' className='content-body-item-select-image' />}
                <span className='content-body-item-select'>{isFromOpToBase ? 'Base' : 'Optimism'}</span>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEUAAACampqbm5uXl5eampqampqbm5uampqampp78bxhAAAACXRSTlMA/0Agv99/n2Ae7gPiAAAAVUlEQVR4nGMYeMCsBAMKYL6iIAwIg/lscH4BRH0hlCsCNcAEyneAGRgI5orCbTAE84XgfCYwH2IbGDSiSEOsTEB2YyLcMpiVMMugVoaiecqAsL/pAgAsnQnbSqP2EgAAAABJRU5ErkJggg==' alt='ethereum' className='content-body-item-select-image' />
              </div>
              <div className='content-body-item-select-received'>
                <span className='content-body-item-select-received-amount'>
                  0.00
                </span>
              </div>
            </div>
          </div>
          <span className='button content-body-button' onClick={metamaskIsConnected ? sendTx : connectWallet}>
            {isLoading && <i></i>} {metamaskIsConnected ? 'Send' : 'Connect Wallet'}
          </span>
          <div className='content-body-alert'>
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAG1BMVEUAAAD8ygD7ywD8ygD7ywD/xwD8ygD8ygD8ygDSyghpAAAACXRSTlMA/3+/QCDfn2Bh7O7SAAAAgklEQVR4nKXSuQ2AMBBEUYvF5OaKMQExdEAJ0AE1UAGl4+XwsZMgMZH1pC8nq35Pz0CEZIG0ASIkC6QNUIFkgXIDtCJNQNwJ4s7svdsRd/eWRzIvZdJdG6FrXwld7Ym/GpLuGsVdIN8F6oBExyQ6JtE5kp2jBkl2iiopirYvh5OF5wn+0BA7zVsEbQAAAABJRU5ErkJggg==' alt='ethereum' className='content-body-alert-image' />
            <span className='content-body-alert-text'>IBC bridge to another chain takes about 36s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
