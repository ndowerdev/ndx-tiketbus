<template>
  <div>
    <main class="leaderboard__profiles" v-if="ticketList != null">
      <h4 v-if="totalTiket != 0">
        Tiket Bus dan Travel {{ ticketList.src_city.toUpperCase() }} ke
        {{ ticketList.dst_city.toUpperCase() }}
      </h4>
      <article
        class="leaderboard__profile"
        v-for="(item, key) in ticketList.ticket"
        :key="key"
      >
        <img
          :src="'https://s2.rdbuz.com/buslogos/country/' + item.operatorImg"
          :alt="'Harga tiketbus di ' + item.name"
          class="leaderboard__picture"
        />
        <div class="info">
          <span class="travel-name">{{ item.travelName }}</span>
          <span class="bus-type">{{ item.bustype }}</span>
        </div>

        <span class="leaderboard__value">{{ item.minfr }}</span>
      </article>

      <div class="no-ticket" v-if="totalTiket == 0">
        <h3>Belum ada tiket yang tersedia untuk rute ini</h3>
        <hr />
      </div>
      <div class="info-min" v-if="ticketList != null">
        <h4>
          Informasi Bus & Travel dari {{ ticketList.src_city }} ke
          {{ ticketList.dst_city }}
        </h4>
        <small>
          Bus dan atau Travel
          <strong>{{ ticketList.src_city.toUpperCase() }}</strong> ke
          <strong>{{ ticketList.dst_city.toUpperCase() }}</strong> pertama kali
          berangkat pada pukul {{ info.earlier_bus }} dan terakhir berangkat
          pada jam <strong>{{ info.latest_bus }}</strong
          >. Jarak dari
          <strong>{{ ticketList.src_city.toUpperCase() }}</strong> ke
          <strong>{{ ticketList.dst_city.toUpperCase() }}</strong> yaitu sekitar
          kurang lebih <strong>{{ info.distance.toUpperCase() }}</strong> dan
          dapat ditempuh dalam
          <strong>{{ info.avg_bus_duration }} </strong>
        </small>
      </div>
      <button class="back-button" @click="$router.go(-1)">KEMBALI</button>
      <button class="home-button" @click="$router.push('/')">HOME</button>
    </main>
  </div>
</template>

<script>
export default {
  name: "TiketbusLihatharga",

  data() {
    return {
      ruteName: this.$route.params.ruteName,
      ticketList: null,
    };
  },

  mounted() {
    this.getTiketByRute();
  },
  computed: {
    info: function () {
      return this.ticketList.info;
    },
    totalTiket: function () {
      return this.ticketList.ticket.length;
    },
  },
  methods: {
    getTiketByRute: function () {
      this.$http
        .get("https://tiketbus.api-warehouse.xyz/getTicketsByRoute/" + this.ruteName)
        .then((r) => {
          let x = r.data.data;
          if (this.$func.isBase64(x)) {
            this.ticketList = JSON.parse(
              this.$func.CryptoJSAesDecrypt("yourdaddybosku", x)
            );
          } else {
            this.ticketList = x;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  align-items: baseline;
}
.no-ticket {
  margin: auto;
  text-align: center;
  color: #e91e63;
}
.leaderboard__picture {
  box-shadow: none;
}
</style>