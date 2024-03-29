import './App.css';
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { ABI, CONTRACT_ADDRESS } from "./config";

async function getBalances(currentAccount, setOpBalance, setBaseBalance) {
  let balanceOnOp, currentAccountBaseBalance;
  try {
    const contract = new (new Web3('https://sepolia.optimism.io')).eth.Contract(ABI, CONTRACT_ADDRESS);
    const balance = await contract.methods.balanceOf(
      currentAccount,
    ).call();
    let bigNumber = new BigNumber(Number(balance));
    let result = bigNumber.dividedBy('1e18');
    balanceOnOp = result.toString()
  } catch (error) {
    console.error('query Your balance on Optimism', error);
  }
  try {
    const contract = new (new Web3('https://sepolia.base.org')).eth.Contract(ABI, CONTRACT_ADDRESS);
    const balance = await contract.methods.balanceOf(
      currentAccount,
    ).call();
    let bigNumber = new BigNumber(Number(balance));
    let result = bigNumber.dividedBy('1e18');
    currentAccountBaseBalance = result.toString()
  } catch (error) {
    console.error('query Your balance on Base', error);
  }
  setOpBalance(balanceOnOp);
  setBaseBalance(currentAccountBaseBalance);
}

function App() {

  const [metamaskIsConnected, setMetamaskIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [opCount, setOpCount] = useState('');
  const [baseCount, setBaseCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opBalance, setOpBalance] = useState(0);
  const [baseBalance, setBaseBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window.ethereum !== 'undefined') {
        if (window.ethereum.isConnected()) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts && accounts.length > 0) {
            setCurrentAccount(accounts[0]);
            setMetamaskIsConnected(true);
            getBalances(accounts[0], setOpBalance, setBaseBalance);
          }

        }
      }
    };
    fetchData();
  }, [])
  return (
    <div className="app">
      <div className='head-container'>
        {metamaskIsConnected ? (<span>{currentAccount}</span>) : (<button className='button wallet-connect-button' onClick={
          async () => {
            try {
              await window.ethereum.enable();
              const accounts = await new Web3(window.ethereum).eth.getAccounts();
              setCurrentAccount(accounts[0])
              setMetamaskIsConnected(true);
              getBalances(accounts[0], setOpBalance, setBaseBalance);
            } catch (error) {
              console.error('connect wallet error', error);
            }
          }

        }>
          Connect Wallet
        </button>)}

      </div>
      <div className='body-container-all'>

        <div className='body-wrapper-top'>
          {isLoading && <div className='loading-spinner-container'>Loading......</div>}
          <div className='body-top'>
            <input
              className='input'
              type='text'
              placeholder='enter your cny amount'
              onChange={(event) => {
                setOpCount(event.target.value);
              }}
            />
            <button className='button' onClick={
              async () => {
                try {
                  try {
                    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                    if (chainId !== '0xaa37dc') {
                      await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0xaa37dc' }],
                      });
                    }
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    const accounts = await web3.eth.getAccounts();
                    const myAccount = accounts[0];
                    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
                    const channel = web3.utils.padRight(web3.utils.asciiToHex("channel-10"), 64);
                    setIsLoading(true);
                    await contract.methods.TransferCNY(
                      CONTRACT_ADDRESS,
                      channel,
                      new BigNumber(opCount).multipliedBy(new BigNumber(10).pow(18)).toNumber()
                    ).send({ from: myAccount });

                    setTimeout(() => {
                      setIsLoading(false);
                      getBalances(myAccount, setOpBalance, setBaseBalance)
                    }, 30000)

                  } catch (error) {
                    setIsLoading(false);
                    console.error('cross chain error', error);
                  }
                } catch (error) {
                  console.error('cross chain error', error);
                }
              }

            }>
              Transfer
            </button>

          </div>
          <div className='body-bottom'>
            <br />
            <span>Your balance on Optimism: </span>
            <span>{opBalance} CNY</span>
            <br />
            <span>Your balance on Base: </span>
            <span>{baseBalance} CNY</span>
          </div>

        </div>

        <div className='body-wrapper-top'>
          <div className='body-top'>
            <input
              className='input'
              type='text'
              placeholder='enter your cny amount'
              onChange={(event) => {
                setBaseCount(event.target.value);
              }}
            />
            <button className='button' onClick={
              async () => {
                try {
                  try {
                    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                    if (chainId !== '0x14a34') {
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
                    const channel = web3.utils.padRight(web3.utils.asciiToHex("channel-11"), 64);
                    setIsLoading(true);
                    await contract.methods.TransferCNY(
                      CONTRACT_ADDRESS,
                      channel,
                      new BigNumber(baseCount).multipliedBy(new BigNumber(10).pow(18)).toNumber()
                    ).send({ from: myAccount });

                    setTimeout(() => {
                      setIsLoading(false);
                      getBalances(myAccount, setOpBalance, setBaseBalance)
                    }, 30000)

                  } catch (error) {
                    setIsLoading(false);
                    console.error('cross chain error', error);
                  }
                } catch (error) {
                  console.error('cross chain error', error);
                }
              }

            }>
              Transfer
            </button>

          </div>
          <div className='body-bottom'>
            <br />
            <span>Your balance on Base: </span>
            <span>{baseBalance} CNY</span>
            <br />
            <span>Your balance on Optimism: </span>
            <span>{opBalance} CNY</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
