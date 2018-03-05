var web3;
var game1Contract;

function initWeb3() {
    var abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "getMyLuckDigit",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_luckDigit",
                    "type": "uint256"
                }
            ],
            "name": "setMyLuckDigit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    // Rinkeby合约地址
    var address = "0xb90b7ed3b0d7505afc9e0161cfe9460390125747";

    // 本地合约地址
    // var address = "0x8cdaf0cd259887258bc13a92c0a6da92698644c0";

    game1Contract = web3.eth.contract(abi).at(address);
    web3.eth.defaultAccount = web3.eth.coinbase;
}

function initVue() {
    var app = new Vue({
        el:"#game1",
        data:{
            nowLuckDigit:0,
            newLuckDigit:0,
        },
        methods:{
            btnGetClick:function(){
                // dice.begin.sendTransaction({from:user1});
                // this.balance += 10;
                //alert("btnGetClick");
                // game1Contract.getMyLuckDigit.sendTransaction(
                //     function(error, result){
                //         if(!error)
                //             app.nowLuckDigit = result;
                //         else
                //             console.error(error);
                //     });

                game1Contract.getMyLuckDigit(
                    function(error, result){
                        if(!error)
                            app.nowLuckDigit = result;
                        else
                            console.error(error);
                    });
            },

            btnSetClick:function () {
                // var amount = parseInt(this.amount);
                // var point = parseInt(this.point);
                // dice.betting.sendTransaction(amount,point,{from:user1});
                //alert("btnSetClick")
                game1Contract.setMyLuckDigit(
                    app.newLuckDigit,
                    function(error, result){
                        if(error)
                            console.error(error);
                    });
            },
        },

    })
}


function checkNewwork() {
    web3.version.getNetwork((err, netId) => {
        switch (netId) {
            case "1":
                console.log('This is mainnet')
                break
            case "2":
                console.log('This is the deprecated Morden test network.')
                break
            case "3":
                console.log('This is the ropsten test network.')
                break
            case "4":
                console.log('This is the Rinkeby test network.')
                break
            case "42":
                console.log('This is the Kovan test network.')
                break
            default:
                console.log('This is an unknown network.')
        }
    })
}