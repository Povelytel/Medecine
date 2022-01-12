<template>
  <div id="home">
    <h1>Home</h1>
    <ul class="coint_name">
      <li>Name</li>
      <li>Price</li>
      <li>Volume(24h)</li>
      <li>Date added</li>
    </ul>
    <ul class="coint" v-for="(coin, idx) in coins" :key="idx">
      <li>
        <img
          class="crypto-icons"
          v-bind:src="getCoinImage(coin.symbol.toLowerCase())"
          v-bind:alt="coin.symbol"
        />
        {{ coin.name }}
      </li>
      <li>{{ coin.price_usd }} USD</li>
      <li>{{ coin['24h_volume_usd'] }} USD</li>
      <li>{{ formatDate(coin.last_updated) }}</li>
    </ul>
  </div>
</template>

<script>
// import { storage, db } from "@/main"
// import stor from "firebase/storage"
import axios from 'axios'

export default {
  data() {
    return {
      progressUpload: 0,
      coins: [],
      input: {
        amount: 1,
        cryptocurrency: 'bitcoin',
      },
      specific_coin_amount: 0,
    }
  },
  methods: {
    //Get png image of coin from it's ID
    getCoinImage: (id) => `https://www.barchart.com/img/crypto-icons/${id}.png`,
    formatDate(unix) {
      const date = new Date(unix * 1000) // convert to milliseconds
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      // Check if day or month is only 1 digit
      // this because Moment.js works with 0 leading values
      if (day.toString().length !== 2) day = `0${day}`
      if (month.toString().length !== 2) month = `0${month}`

      return `${year}-${month}-${day}`
    },
  },
  mounted() {
    axios({
      method: 'GET',
      url: 'https://api.coinmarketcap.com/v1/ticker/?limit=7',
    }).then(
      (result) => {
        this.coins = result.data
      },
      (error) => {
        console.error(error)
      },
    )
  },
}
</script>
