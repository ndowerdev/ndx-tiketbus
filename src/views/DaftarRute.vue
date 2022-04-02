<template>
  <div class="daftar-rute">
    <main class="leaderboard__profiles" v-if="routeLists != null">
      <!-- <rise-loader :loading="isLoading" size="30px" /> -->
      <h3>Operator Bus / Travel</h3>
      <article class="leaderboard__profile" v-for="item in routeLists.operators" :key="item.id">
        <img
          src="https://lh3.googleusercontent.com/-A9IoCFcFLmk/YOlWBkaCaUI/AAAAAAAAJ6E/dp7DMaGg_1wJEkTShOidxAOBxkbjOXj6QCLcBGAsYHQ/city-nature-svgrepo-com.png"
          class="leaderboard__picture"
        />
        <span class="leaderboard__name">{{ item.operator_name }}</span>
        <span class="leaderboard__value"></span>
      </article>
      <h3 v-if="routeLists.from.length">
        Dari
        <span>{{ realLocBySlug }}</span>
      </h3>
      <article
        class="leaderboard__profile"
        v-for="item in routeLists.from"
        :key="item.id"
        @click="lihatHarga(item.id)"
      >
        <img
          src="https://lh3.googleusercontent.com/-A9IoCFcFLmk/YOlWBkaCaUI/AAAAAAAAJ6E/dp7DMaGg_1wJEkTShOidxAOBxkbjOXj6QCLcBGAsYHQ/city-nature-svgrepo-com.png"
          :alt="'Harga tiket bus dan travel dari ' + item.name"
          class="leaderboard__picture"
        />
        <span class="leaderboard__name">{{ item.name }}</span>
        <span class="leaderboard__value">LIhat Harga</span>
      </article>
      <h3 v-if="routeLists.to.length">
        Ke
        <span>{{ realLocBySlug }}</span>
      </h3>
      <article
        class="leaderboard__profile"
        v-for="item in routeLists.to"
        :key="item.id"
        @click="lihatHarga(item.id)"
      >
        <img
          src="https://lh3.googleusercontent.com/-A9IoCFcFLmk/YOlWBkaCaUI/AAAAAAAAJ6E/dp7DMaGg_1wJEkTShOidxAOBxkbjOXj6QCLcBGAsYHQ/city-nature-svgrepo-com.png"
          :alt="'Harga tiket dan travel ke ' + item.name"
          class="leaderboard__picture"
        />
        <span class="leaderboard__name">{{ item.name }}</span>
        <span class="leaderboard__value">LIhat Harga</span>
      </article>
      <button class="back-button" @click="$router.go(-1)">KEMBALI</button>
      <button class="home-button" @click="$router.push('/')">HOME</button>
    </main>
  </div>
</template>

<script>
export default {
  name: "TiketbusDaftarrute",

  data() {
    return {
      cityName: this.$route.params.cityname,
      routeLists: null,
    };
  },
  computed: {
    totalTiket: function () {
      return this.realLocBySlug.length;
    },
    realLocBySlug: function () {
      return this.$route.params.cityname.replace(/-/g, " ").toUpperCase();
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    lihatHarga: function (rute) {
      console.log(rute);
      this.$router.push({
        name: "HargaTiketPerRute",
        params: { ruteName: rute },
      });
    },
    getData: function () {
      this.$http
        .get(
          "https://tiketbus.api-warehouse.xyz/getRouteByCity/" + this.cityName
        )
        .then((r) => {
          let x = r.data.data;
          if (this.$func.isBase64(x)) {
            this.routeLists = JSON.parse(
              this.$func.CryptoJSAesDecrypt("yourdaddybosku", x)
            );
          } else {
            this.routeLists = x;
          }
        });
    },
  },
};
</script>

<style  scoped>
.leaderboard__name {
  font-size: 15px !important;
}
h3 {
  font-size: 13px;
  color: #9c27b0;
}
</style>