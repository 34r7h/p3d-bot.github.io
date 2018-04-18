// CONSTANTS
// var contractAddress = '0xA146240bF2C04005A743032DC0D241ec0bB2BA2B'
// var donationAddress = '0x11e52c75998fe2E7928B191bfc5B25937Ca16741'

// CONSTANTS
var contractAddress = '0x9f70315a1cd0abbf479478f9f0f8a7b1fb8947bb'
// var donationAddress = '0x11e52c75998fe2E7928B191bfc5B25937Ca16741'

// GLOBALS
var web3Mode = null
var walletMode = 'metamask'
var currentAddress = null
var keystore = null
var dividendValue = 0
var tokenBalance = 0
var contract = null

var buyPrice = 0
var globalBuyPrice = 0
var sellPrice = 0
var ethPrice = 0
var currency = (typeof default_currency === 'undefined') ? 'USD' : default_currency
var ethPriceTimer = null
var dataTimer = null
var abi =
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_referredBy",
				"type": "address"
			},
			{
				"name": "_truthiness",
				"type": "bool"
			}
		],
		"name": "buyPill",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_truthiness",
				"type": "bool"
			}
		],
		"name": "reinvest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "settle",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_truth",
				"type": "bool"
			}
		],
		"name": "setTruth",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "incomingEthereum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "tokensMinted",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "referredBy",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "truthiness",
				"type": "bool"
			}
		],
		"name": "onTokenPurchase",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ethereumReinvested",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "tokensMinted",
				"type": "uint256"
			}
		],
		"name": "onReinvestment",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ethereumWithdrawn",
				"type": "uint256"
			}
		],
		"name": "onWithdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokensBurned",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ethereumEarned",
				"type": "uint256"
			}
		],
		"name": "onTokenSell",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "administrators",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_truthiness",
				"type": "bool"
			}
		],
		"name": "amICorrect",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bluePillAmount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "bluePillBalanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bluePillSellPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokensToSell",
				"type": "uint256"
			}
		],
		"name": "calculateEthereumReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ethereumToSpend",
				"type": "uint256"
			}
		],
		"name": "calculateTokensReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "dividendsOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "expired",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myBluePills",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_includeReferralBonus",
				"type": "bool"
			}
		],
		"name": "myDividends",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myRedPills",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "prizePool",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "redPillAmount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "redPillBalanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "redPillSellPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "stakingRequirement",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalEthereumBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "truth",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
// UTILITY FUNCTIONS
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match

    })
  }
}

function copyToClipboard (text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData('Text', text)

  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea')
    textarea.textContent = text
    textarea.style.position = 'fixed'  // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea)
    textarea.select()
    try {
      return document.execCommand('copy')  // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex)
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

function updateEthPrice () {
  clearTimeout(ethPriceTimer)
  if( currency === 'EPY' ){
    ethPrice = 1 / (sellPrice + ((buyPrice - sellPrice) / 2))
    ethPriceTimer = setTimeout(updateEthPrice, 10000)
  } else {
    $.getJSON('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=' + currency, function (result) {
      var eth = result[0]
      ethPrice = parseFloat(eth['price_' + currency.toLowerCase()])
      ethPriceTimer = setTimeout(updateEthPrice, 10000)
    })
  }
}

function convertEthToWei (e) {
  return 1e18 * e
}

function convertWeiToEth (e) {
  return e / 1e18
}

function detectWeb3 () {
  if ($('#metamask-detecting').hasClass('visible')) {
    $('#metamask-detecting').dimmer('hide')
  }

  web3js = new Web3(web3.currentProvider)
  web3Mode = 'metamask'
  currentAddress = web3js.eth.accounts[0]
  if (typeof currentAddress === 'undefined'){
    alert('Please install Metamask and set to Mainnet')
  }

  var contractClass = web3js.eth.contract(abi)
  contract = contractClass.at(contractAddress)

  updateData()
}

window.addEventListener('load', function () {

  setTimeout(detectWeb3, 500)

  function call (address, method, params, amount) {
    web3js.eth.getTransactionCount(currentAddress, function (err, nonce) {
      if (err) throw err

      web3js.eth.getGasPrice(function (err, gasPrice) {
        if (err) throw err

        // Median network gas price is too high most the time, divide by 10 or minimum 1 gwei
        gasPrice = Math.max(gasPrice / 10, 1000000000)

        var tx = {
          'from': currentAddress,
          'to': address,
          'value': '0x' + amount.toString(16),
          'gasPrice': '0x' + (gasPrice).toString(16),
          'gasLimit': '0x' + (100000).toString(16),
          'nonce': nonce,
        }

        var rawTx = lightwallet.txutils.functionTx(abi, method, params, tx)

      })
    })
  }

  function getCookie(name) {
    		var dc = document.cookie;
    		var prefix = name + "=";
    		var begin = dc.indexOf("; " + prefix);

		if (begin == -1) {
        		begin = dc.indexOf(prefix);
        		if (begin != 0) return null;
    		}
    		else
    		{
        		begin += 2;
        		var end = document.cookie.indexOf(";", begin);
        		if (end == -1) {
        		end = dc.length;
        	}
    		}

    return decodeURI(dc.substring(begin + prefix.length, end));
  }

  function fund (address, truthiness, amount) {
    if (walletMode === 'metamask') {
      contract.buyPill(getCookie('maker').split(';')[0], truthiness, {
        value: convertEthToWei(amount)
      }, function (e, r) {
        console.log(e, r)
      })
    }
  }

  function sell (amount) {
    if (walletMode === 'metamask') {
      contract.sell(convertEthToWei(amount), function (e, r) {
        console.log(e, r)
      })
    }
  }

  function settle () {
    if (walletMode === 'metamask') {
      contract.settle(function (e, r) {
        console.log(e, r)
      })
    }
  }

  function withdraw () {
    if (walletMode === 'metamask') {
      contract.withdraw(function (e, r) {
        console.log(e, r)
      })
    }
  }

  // Buy redpill
  $('#buy-btn-agree').click(function () {
    let amount = $('#agree-purchase-amount').val().trim()
    if (amount <= 0 || !isFinite(amount) || amount === '') {
      $('#agree-purchase-amount').addClass('error').popup({
        title: lang.invalidInput,
        content: lang.invalidInputResponse
      }).popup('show')
    } else {
      $('#agree-purchase-amount').removeClass('error').popup('destroy')
      fund(contractAddress, true, amount)
    }
  })

  // Buy redpill
  $('#buy-btn-disagree').click(function () {
    let amount = $('#disagree-purchase-amount').val().trim()
    if (amount <= 0 || !isFinite(amount) || amount === '') {
      $('#disagree-purchase-amount').addClass('error').popup({
        title: lang.invalidInput,
        content: lang.invalidInputResponse
      }).popup('show')
    } else {
      $('#disagree-purchase-amount').removeClass('error').popup('destroy')
      fund(contractAddress, false, amount)
    }
  })

  // Sell token click handler
  $('#sell-tokens-btn').click(function () {
    sell($("#sell-tokens-amount").val())
  })

  // Settle token click handler
  $('#settle-btn').click(function () {
    settle()
  })

  // Reinvest click handler
  $('#reinvest-btn-agree').click(function () {
    contract.reinvest(true, function (e, r) {
      console.log(e, r)
    })
  })

  // Reinvest click handler
  $('#reinvest-btn-disagree').click(function () {
    contract.reinvest(false, function (e, r) {
      console.log(e, r)
    })
  })

  // Withdraw click handler
  $('#withdraw-btn').click(function () {
    withdraw()
  })

  $('#sell-tokens-btn-m').click(function () {
    contract.sell(function (e, r) {
      console.log(e, r)
    })
  })

  $('#withdraw-btn-m').click(function () {
    contract.withdraw(function (e, r) {
      console.log(e, r)
    })
  })

  $('#currency').val(currency)

  $('#currency').change(function () {
    currency = $(this).val()
    updateEthPrice()
  })

  updateEthPrice()

  $('#purchase-amount').bind("keypress keyup click", function (e) {
    var number = $('#purchase-amount').val() * 100000;

    contract.calculateTokensReceived(number, function (e, r) {

      var numTokens = r / 100000;

      $('.number-of-tokens').text("With " + (number==0 ? 0 : number/100000) + " ETH you can buy " + numTokens.toFixed(3) + " Tokens");
      })
  })
})

function updateData () {
  clearTimeout(dataTimer)

  var loggedIn = false

  if (walletMode === 'metamask') {
    loggedIn = typeof web3js.eth.defaultAccount !== 'undefined' && web3js.eth.defaultAccount !== null
    currentAddress = web3js.eth.defaultAccount
    $('#meta-mask-ui').removeClass('wallet-web').addClass('wallet-mm')
  }

  if (currentAddress !== null) {
    $('#eth-address').html(currentAddress)
    $('#eth-public-address a.etherscan-link').attr('href', 'https://etherscan.io/address/' + currentAddress).html(currentAddress)
  } else {
    $('#eth-address').html('Not Set')
  }

  if (loggedIn) {

    $('#meta-mask-ui').removeClass('logged-out').addClass('logged-in')

    contract.balanceOf(currentAddress, function (e, r) {
      const tokenAmount = (r / 1e18 * 0.9999)
      $('.poh-balance').text(Number(tokenAmount.toFixed(2)).toLocaleString() + ' Tokens')
      contract.calculateEthereumReceived(r, function (e, r) {
        let bal = convertWeiToEth(r)
        $('.poh-value').text(bal.toFixed(4) + ' ETH')
        $('.poh-value-usd').text('(' + Number((convertWeiToEth(r * 1) * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')
        if (tokenBalance !== 0) {
          if (bal > tokenBalance) {
            $('.poh-value').addClass('up').removeClass('down')
            setTimeout(function () {
              $('.poh-value').removeClass('up')
            }, 3000)
          }
          else if (bal < tokenBalance) {
            $('.poh-value').addClass('down').removeClass('up')
            setTimeout(function () {
              $('.poh-value').removeClass('down')
            }, 3000)
          }
        }
        tokenBalance = bal
      })
    })

    contract.myDividends(true, function (e, r) {
      let refdiv = convertWeiToEth(r).toFixed(6)
       $('.poh-nonrefdiv').text(refdiv + ' ETH')
       $('.poh-nonrefdiv-usd').text('(' + Number((refdiv * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')

       contract.myDividends(false, function (e, r) {
         let nonrefdiv = convertWeiToEth(r).toFixed(6)
         // dividends of without ref.
         let diff = (refdiv - nonrefdiv).toFixed(6);
          $('.poh-refdiv').text(diff + ' ETH')
          $('.poh-refdiv-usd').text(('(' + Number(diff * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')
       })
    })

    web3js.eth.getBalance(currentAddress, function (e, r) {
      // We only want to show six DP in a wallet, consistent with MetaMask
      $('.address-balance').text(convertWeiToEth(r).toFixed(6) + ' ETH')
    })
  } else {
    $('#meta-mask-ui').addClass('logged-out').removeClass('logged-in')
  }

  contract.buyPrice(function (e, r) {
    let buyPrice = convertWeiToEth(r)
    globalBuyPrice = convertWeiToEth(r)
    $('.poh-buy').text(buyPrice.toFixed(6) + ' ETH')
    $('.poh-buy-usd').text('(' + Number((buyPrice * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')
  })

  contract.totalSupply(function (e, r) {
    let actualSupply = r / 1e18;
    $('.contract-tokens').text(Number(actualSupply.toFixed(2)).toLocaleString());
  })

  contract.redPillAmount(function (e, r) {
    let redPillAmount = r / 1e18;
    $('.red-pill-amount').text(Number(redPillAmount.toFixed(2)).toLocaleString());
  })

  contract.bluePillAmount(function (e, r) {
    let bluePillAmount = r / 1e18;
    $('.blue-pill-amount').text(Number(bluePillAmount.toFixed(2)).toLocaleString());
  })

  contract.redPillSellPrice(function (e, r) {
    let redPillSellPrice = 100 / (convertWeiToEth(r) * 10 ** 18)
    $('.poh-sell-red').text(redPillSellPrice.toFixed(6) + ' ETH')
    $('.poh-sell-red-usd').text('(' + Number((redPillSellPrice * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')
  })

  contract.bluePillSellPrice(function (e, r) {
    let bluePillSellPrice = 100 / (convertWeiToEth(r) * 10 ** 18)
    $('.poh-sell-blue').text(bluePillSellPrice.toFixed(6) + ' ETH')
    $('.poh-sell-blue-usd').text('(' + Number((bluePillSellPrice * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')
  })

  contract.myRedPills(function (e, r) {
    let myRedPills = convertWeiToEth(r)
    $('.red-pill-balance').text(myRedPills.toFixed(2) + ' Shares')
  })

  contract.myBluePills(function (e, r) {
    let myBluePills = convertWeiToEth(r)
    $('.blue-pill-balance').text(myBluePills.toFixed(2) + ' Shares')
  })

  contract.stakingRequirement(function (e, r) {
    let stakingRequirement = convertWeiToEth(r)
    $('.stakingRequirement').text(stakingRequirement.toFixed(0) + ' Shares')
  })

	contract.prizePool(function (e, r) {
		let prizePool = convertWeiToEth(r)
		console.log(prizePool);
		$('.prize-pool').text(prizePool.toFixed(4) + ' ETH')
    $('.prize-pool-usd').text('(' + Number((prizePool * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')
	})

  // web3js.eth.getBalance(contract.address, function (e, r) {
  //   $('.contract-balance').text(convertWeiToEth(r).toFixed(4) + ' ETH')
  //   $('.contract-balance-usd').text('(' + Number((convertWeiToEth(r) * ethPrice).toFixed(2)).toLocaleString() + ' ' + currency + ')')
  // })

  contract.expired(function (e, r) {
    var expired = r;
    if ((expired)=== true){
      $('#settle-btn').show();
      $('#reinvest-area').hide();
      $('#withdraw-btn').hide();
      contract.truth(function (e, r) {
        let truth = r;
        if (truth) {
          $('#winner').show()
          $('#disagree-area').hide();
          $('#agree-wager').hide();
        } else {
          $('#loser').show()
          $('#agree-area').hide();
          $('#disagree-wager').hide();
        }
      })
    }
  })


  dataTimer = setTimeout(function () {
    updateData()
  }, web3Mode === 'metamask' ? 1000 : 5000)
}
