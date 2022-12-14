const nearAPI = require('near-api-js')

const main = async () => {
	const config = {
		networkId: 'testnet',
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org',
		appName: 'Paras Testnet',
		contractName: `viernear.testnet`
	}

	try {
		// Initializing nearAPI
		// Login and init contract
		const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
        // const PRIVATE_KEY = "ed25519:9nYNwsP7mYqMLRsouSLaqKCBZTFcs8R34CVWgHNqoP351VVqsRmdPvKax8XCqWcKnGNsy45AYuofw6UsMPEJfdE";  //vier1near
        const PRIVATE_KEY = "ed25519:2F9g25e6eXCXtKLtHr7SQddBrqdqXDJBLqHuWKy7SNQ9hqCbWP9FGcNpqaryyxiUUfGKQUKz4Uch743WMKkDU1M2"; //viernear
        const keyPair = nearAPI.KeyPair.fromString(PRIVATE_KEY);
        await keyStore.setKey("testnet","viernear.testnet",keyPair);

		const connection = await nearAPI.connect({
			// deps: {
			// 	keyStore: keyStore,
			// },
            keyStore,
			...config,
		})

		const account_id = 'viernear.testnet'
		const account = await connection.account(account_id)
        // console.log("accountInfo: ", account);
		const contract = await new nearAPI.Contract(
			account,
			config.contractName,
			{
				changeMethods: [
					'nft_create_series',
                    'nft_mint',
                    'nft_set_series_price',
                    'nft_buy',
                    'nft_remove_series'
				],
                viewMethods: [
                    'nft_get_series'
                ]
			}
		)

		// const formattedParams = {
        //         token_metadata: {
        //             title: 'Dark',
        //             media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
        //             reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
        //             copies: 100 
        //         },
		// 		price: null,
		// 		royalty: {
		// 			[account_id]: 1000
		// 		},
        //         creator_id: "viernear.testnet"
		// }

		// const ret = await contract.nft_create_series(
		// 	formattedParams,
		// 	300000000000000, //	attached GAS
		// 	"8540000000000000000000"
		// )

        // const ret = await contract.nft_get_series();
        // const params = {
        //     token_series_id:'1',
        //     receiver_id: 'vier1near.testnet'
        // }
        // const ret = await contract.nft_mint(params, 300000000000000,"7000000000000000000000");

        // const ret = await contract.nft_set_series_price(
        //     {
        //         token_series_id:'1', 
        //         price:'1000000000000000000000000'
        //     },
        //     300000000000000,
        //     '1'
        //     )
        // const ret = await contract.nft_buy(
        //     {
        //         token_series_id: '1',
        //         receiver_id: 'vier1near.testnet',
        //         // amount:'1000000000000000000000000'
        //     },
        //     300000000000000,
        //     // "1000000000000000000000000",
        //     "1500000000000000000000000",
        //     )
        const ret = await contract.nft_get_series();
		console.log(ret)

	} catch (err) {
		throw err
	}
}

main()