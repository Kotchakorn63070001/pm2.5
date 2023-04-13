<template>
  <div id="app" >
    <div class="container is-max-widescreen mt-5 is-family-monospace" >
      <h1 class="title has-text-centered" style="font-family: 'Kanit', sans-serif;">รายงานสภาพอากาศฝุ่น PM 2.5</h1>
      <div class="field is-grouped is-grouped-centered">
        <p class="control has-icons-left">
          <input class="input is-rounded" type="text" placeholder="ค้นหาพื้นที่" v-model="search" style="font-family: 'Kanit', sans-serif;">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </span>
        </p>
        <p class="control" style="font-family: 'Kanit', sans-serif">
          <a class="button is-link is-outlined is-rounded" @click="filterLocation">
            ค้นหา
          </a>
        </p>
      </div>
      <table class="table" style="font-family: 'Kanit', sans-serif;" v-if="checkSearch == true">
        <thead>
          <tr>
            <!-- <th>stationID</th> -->
            <th>ชื่อสถานที่</th>
            <th></th>
            <th>พื้นที่</th>
            <th></th>
            <th>วันที่</th>
            <th>เวลา</th>
            <th>คุณภาพอากาศ</th>
            <th>AQI</th>
            <th>PM 2.5 (ug/m³)</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="data in result" :key="data.stationID">
            <!-- <td>{{  data.stationID }}</td> -->
            <td>{{  data.nameTH }}</td>
            <td>{{  data.nameEN }}</td>
            <td>{{  data.areaTH }}</td>
            <td>{{  data.areaEN }}</td>
            <td>{{  data.AQILast.date }}</td>
            <td>{{  data.AQILast.time }}</td>
            <td v-if="data.AQILast.PM25.color_id == 1">
              <button class="button is-rounded is-large" >
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-face-laugh-beam" style="color: #3bccff;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 2">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-smile" style="color: #92d050;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 3">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-meh" style="color: #ffff00;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 4">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-frown" style="color: #ffa200;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 5">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-angry" style="color: #f04646;" />
                </span>
              </button>
            </td>
            <td>{{  data.AQILast.PM25.aqi }}</td>
            <td>{{  data.AQILast.PM25.value }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table" style="font-family: 'Kanit', sans-serif;" v-else>
        <thead>
          <tr>
            <!-- <th>stationID</th> -->
            <th>ชื่อสถานที่</th>
            <th></th>
            <th>พื้นที่</th>
            <th></th>
            <th>วันที่</th>
            <th>เวลา</th>
            <th>คุณภาพอากาศ</th>
            <th>AQI</th>
            <th>PM 2.5 (ug/m³)</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="data in info" :key="data.stationID">
            <!-- <td>{{  data.stationID }}</td> -->
            <td>{{  data.nameTH }}</td>
            <td>{{  data.nameEN }}</td>
            <td>{{  data.areaTH }}</td>
            <td>{{  data.areaEN }}</td>
            <td>{{  data.AQILast.date }}</td>
            <td>{{  data.AQILast.time }}</td>
            <td v-if="data.AQILast.PM25.color_id == 1">
              <button class="button is-rounded is-large" >
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-face-laugh-beam" style="color: #3bccff;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 2">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-smile" style="color: #92d050;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 3">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-meh" style="color: #ffff00;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 4">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-frown" style="color: #ffa200;" />
                </span>
              </button>
            </td>
            <td v-if="data.AQILast.PM25.color_id == 5">
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-angry" style="color: #f04646;" />
                </span>
              </button>
            </td>
            <td>{{  data.AQILast.PM25.aqi }}</td>
            <td>{{  data.AQILast.PM25.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      info: null,
      search: '',
      result: null,
      checkSearch: false,
      size: 0,
      
      // selectInfo: {
      //   stationID: '',
      //   nameTH: '',
      //   nameEN: '',
      //   areaTH: '',
      //   areaEN: '',
      //   date: '',
      //   time: '',
      //   color_id: '',
      //   aqi: '',
      //   value: ''
      // }
    }
  },
  created() {
    this.fetchData()
    setInterval(() => {
      this.fetchData()
    }, 60000)
  },
  // computed: {
  //   filterLocation: function(){
  //     return this.info.filter((val) =>
  //       val.nameTH.toLowerCase().includes(this.search.toLowerCase())
  //     );
  //   }
  // },
  methods: {
    fetchData() {
      axios.get('http://air4thai.pcd.go.th/services/getNewAQI_JSON.php')
        .then(res => {
          this.info = res.data.stations
          console.log(res.data)
          console.log(res.data.stations)
          this.size = this.info.length
        })
        .catch(error => {
          console.error(error)
        })
    },
    filterLocation(){
      if (this.search !== ''){
        this.checkSearch = true
        this.result = this.info.filter((val) =>
          val.nameTH.toLowerCase().includes(this.search.toLowerCase())
        );
        if (this.result.length == 0){
          alert('ไม่พบพื้นที่')
        }
      }
      else {
        this.checkSearch = false
      }
    }
}}
</script>
<style>
  @import 'bulma/css/bulma.css';
  @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

  html, body {
    font-family: 'Kanit', sans-serif;
  }

  #app {
    font-family: 'Kanit', sans-serif;
  }
</style>