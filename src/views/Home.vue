<template>
  <div class="home">
    <main class="leaderboard__profiles">
      <input
        type="text"
        class="filter-directory"
        placeholder="Cari nama lokasi / kota"
        v-model="filterLocation"
      />
      <!-- <rise-loader :loading="isLoading" size="30px" /> -->
      <article
        class="leaderboard__profile"
        v-for="(item, key) in filteredLocation"
        :key="key"
        @click="lihatRute(item.link)"
      >
        <img
          src="https://lh3.googleusercontent.com/-A9IoCFcFLmk/YOlWBkaCaUI/AAAAAAAAJ6E/dp7DMaGg_1wJEkTShOidxAOBxkbjOXj6QCLcBGAsYHQ/city-nature-svgrepo-com.png"
          :alt="'Harga tiketbus di ' + item.name"
          class="leaderboard__picture"
        />
        <span class="leaderboard__name">{{ item.name }}</span>
        <span class="leaderboard__value">Lihat Rute</span>
      </article>
    </main>
  </div>
</template>




<script>
// import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import RiseLoader from "vue-spinner/src/RiseLoader.vue";

export default {
  name: "TiketbusHome",
  components: {
    // PulseLoader,
    // eslint-disable-next-line vue/no-unused-components
    RiseLoader,
  },

  data() {
    return {
      isLoading: true,

      fullPage: true,
      loader: "bars",
      directoryList: null,
      filterLocation: "",
    };
  },

  mounted() {
    this.fetchData();
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filteredLocation: function () {
      let filter = this.filterLocation;
      var list = this.directoryList;
      if (list != null && this.filterLocation != null) {
        return list.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        );
      }
    },
  },

  methods: {
    lihatRute: function (link) {
      this.$router.push({
        name: "DaftarRutePerKota",
        params: { cityname: link },
      });
    },
    decodeStr: function (str) {
      // var atob = require("atob");
      let decodedString = atob(str);
      return decodedString;
    },
    fetchData: function () {
      this.axios
        .get("https://tiketbus.api-warehouse.xyz/" + "getAllCityList")
        .then((r) => {
          let x = r.data.data;
          if (this.$func.isBase64(x)) {
            this.directoryList = JSON.parse(
              this.$func.CryptoJSAesDecrypt("yourdaddybosku", x)
            );
          } else {
            this.directoryList = x;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  text-align: center;
  list-style: none;
}
li {
  display: inline-block;
  margin: 10px;
  text-transform: uppercase;
}

.filter-directory {
  padding: 10px;
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;
}
</style>