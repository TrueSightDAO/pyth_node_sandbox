import { Buffer } from 'buffer'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { parseMappingData, parsePriceData, parseProductData } from '@pythnetwork/client'


const SOLANA_CLUSTER_URL = clusterApiUrl('devnet')
const connection = new Connection("https://api.devnet.solana.com")

// Product
const ORACLE_MAPPING_PUBLIC_KEY_PROD = 'Fwosgw2ikRvdzgKcQJwMacyczk3nXgoW3AtVtyVvXSAb'

// Price
const ORACLE_MAPPING_PUBLIC_KEY_PRICE = 'Hz23MhJM1Fnw2n7SZFBrucvJHFeiLXq36GCWD7UfeNDt'

connection.getAccountInfo( new PublicKey(ORACLE_MAPPING_PUBLIC_KEY_PROD) ).then((accountInfo) => {
  console.log(accountInfo)
  const { product, priceAccountKey } = parseProductData(accountInfo.data)

  console.log(`${product.symbol}`)
})

connection.getAccountInfo( new PublicKey(ORACLE_MAPPING_PUBLIC_KEY_PRICE) ).then((accountInfo) => {
  console.log(accountInfo)

  const { price, confidence } = parsePriceData(accountInfo.data)
  console.log(`$${price} \xB1$${confidence}`)  

  // const productAccountKey = new PublicKey(accountInfo.data.slice(112, 144));
  // console.log("Decrypted Product Account Key String: " + productAccountKey)
})