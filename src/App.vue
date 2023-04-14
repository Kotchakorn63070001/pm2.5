<template>
  <div id="app" >
    <div class="container is-max-widescreen mt-5" >
      <h1 class="title has-text-centered" style="font-family: 'Kanit', sans-serif">รายงานสภาพอากาศฝุ่น PM 2.5</h1>
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
      <p class="is-size-7 has-text-right" style="font-family: 'Kanit', sans-serif;">ข้อมูลจากกรมควบคุมมลพิษ</p>
      <!-- Table Show Search -->
      <table class="table is-hoverable is-fullwidth" style="font-family: 'Kanit', sans-serif;" v-if="checkSearch == true">
        <thead class="has-background-link-light">
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
              <button class="button is-rounded is-large" @click="modalDetail = true">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-face-laugh-beam" size="lg" style="color: #3bccff;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 2">
              <button class="button is-rounded is-large" @click="modalDetail = true">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-smile" size="lg" style="color: #92d050;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 3">
              <button class="button is-rounded is-large" @click="modalDetail = true">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-meh" size="lg" style="color: #ffdb58;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 4">
              <button class="button is-rounded is-large" @click="modalDetail = true">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-frown" size="lg" style="color: #ffa200;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 5">
              <button class="button is-rounded is-large" @click="modalDetail = true">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-angry" size="lg" style="color: #f04646;" />
                </span>
              </button>
            </td>
            <td v-else>
              <button class="button is-rounded is-large" >
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-circle-exclamation" size="lg" />
                </span>
              </button>
            </td>
            <td>{{  data.AQILast.PM25.aqi }}</td>
            <td>{{  data.AQILast.PM25.value }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Table Show All Area -->
      <table class="table is-hoverable is-fullwidth" style="font-family: 'Kanit', sans-serif;" v-else>
        <thead class="has-background-link-light">
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
              <button class="button is-rounded is-large" @click="showDetail(data.AQILast.PM25.color_id)">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-face-laugh-beam" size="lg" style="color: #3bccff;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 2">
              <button class="button is-rounded is-large" @click="showDetail(data.AQILast.PM25.color_id)">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-smile" size="lg" style="color: #92d050;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 3">
              <button class="button is-rounded is-large" @click="showDetail(data.AQILast.PM25.color_id)">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-meh" size="lg" style="color: #ffdb58;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 4">
              <button class="button is-rounded is-large" @click="showDetail(data.AQILast.PM25.color_id)">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-frown" size="lg" style="color: #ffa200;" />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 5">
              <button class="button is-rounded is-large" @click="showDetail(data.AQILast.PM25.color_id)">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-face-angry" size="lg" style="color: #f04646;" />
                </span>
              </button>
            </td>
            <td v-else>
              <button class="button is-rounded is-large" @click="showDetail(data.AQILast.PM25.color_id)">
                <span class="icon ">
                  <font-awesome-icon icon="fa-solid fa-circle-exclamation" size="lg" />
                </span>
              </button>
            </td>
            <td>{{  data.AQILast.PM25.aqi }}</td>
            <td>{{  data.AQILast.PM25.value }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Modal Show Detail -->
      <div class="modal" v-bind:class="{'is-active' : modalDetail}">
        <div class="modal-background" @click="modalDetail = !modalDetail"></div>
        <div class="modal-content">
          <div class="card" v-if="colorIdDetail == 1" style="font-family: 'Kanit', sans-serif;">
            <div class="card-content">
              <div class="content">
                <!-- ฟ้า -->
                <h3>คุณภาพอากาศดีมาก</h3>
                <div class="columns has-text-centered">
                  <div class="column is-2">
                    <span class="icon is-large">
                      <span class="fa-stack fa-lg">
                        <font-awesome-icon icon="fa-solid fa-face-laugh-beam" size="2xl" style="color: #3bccff;" />
                      </span>
                    </span>
                  </div>
                  <div class="column is-4">
                    0 – 25<br>ไมโครกรัมต่อลูกบาศก์เมตร
                  </div>
                  <div class="column is-6">
                    สามารถทำกิจกรรมนอกบ้านได้ตามปกติ
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card" v-else-if="colorIdDetail == 2" style="font-family: 'Kanit', sans-serif;">
            <div class="card-content">
              <div class="content">
                <!-- เขียว -->
                <h3>คุณภาพอากาศดี</h3>
                <div class="columns has-text-centered">
                  <div class="column is-2">
                    <span class="icon is-large">
                      <span class="fa-stack fa-lg">
                        <font-awesome-icon icon="fa-solid fa-face-smile" size="2xl" style="color: #92d050;" />
                      </span>
                    </span>
                  </div>
                  <div class="column is-4">
                    26 – 37<br>ไมโครกรัมต่อลูกบาศก์เมตร
                  </div>
                  <div class="column is-6">
                    สามารถทำกิจกรรมนอกบ้านได้ตามปกติ สำหรับกลุ่มเสี่ยงควรหลีกเลี่ยงการทำกิจกรรมนอกบ้าน
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card" v-else-if="colorIdDetail == 3" style="font-family: 'Kanit', sans-serif;">
            <div class="card-content">
              <div class="content">
                <!-- เหลือง -->
                <h3>ปานกลาง</h3>
                <div class="columns has-text-centered">
                  <div class="column is-2">
                    <span class="icon is-large">
                      <span class="fa-stack fa-lg">
                        <font-awesome-icon icon="fa-solid fa-face-meh" size="2xl" style="color: #ffdb58;" />
                      </span>
                    </span>
                  </div>
                  <div class="column is-4">
                    38 – 50<br>ไมโครกรัมต่อลูกบาศก์เมตร
                  </div>
                  <div class="column is-6">
                    หลีกเลี่ยงการทำกิจกรรมนอกบ้าน กลุ่มเสี่ยงควรหลีกเลี่ยงการทำกิจกรรมนอกบ้าน
                  </div>
                </div>
              </div>
            </div>
            <!-- <footer class="card-footer">
              <div class="card-footer-item">
                <dl>
                  <dt>หากหลีกเลี่ยงไม่ได้จำเป็นต้องสวมหน้ากากป้องกันฝุ่น โดยมีวิธีการเลือก ดังนี้</dt>
                    <ol>
                      <li>หน้ากาก N95 ต้องเลือกที่มีขนาดเหมาะ แนบกระชับกับใบหน้า ครอบจมูกและใต้คางได้อย่างมิดชิด</li>
                      <li>หน้ากากอนามัย ต้องผลิตจากวัสดุสังเคราะห์ อย่างน้อย 3 ชั้น โดยมีแผ่นกรองอยู่ชั้นกลาง</li>
                      <li>หน้ากากผ้า ต้องตัดเย็บจากผ้าที่ซ้อนกันอย่างน้อย 2 ชั้น หรือมีความหนาไม่น้อยกว่า 0.5 มิลลิเมตร และมีขนาดเหมาะกับใบหน้า</li>
                    </ol>
                </dl>
              </div>
            </footer> -->
          </div>
          <div class="card" v-else-if="colorIdDetail == 4" style="font-family: 'Kanit', sans-serif;">
            <div class="card-content">
              <div class="content">
                <!-- ส้ม -->
                <h3>เริ่มมีผลกระทบต่อสุขภาพ</h3>
                <div class="columns has-text-centered">
                  <div class="column is-2">
                    <span class="icon is-large">
                      <span class="fa-stack fa-lg">
                        <font-awesome-icon icon="fa-solid fa-face-frown" size="2xl" style="color: #ffa200;" />
                      </span>
                    </span>
                  </div>
                  <div class="column is-4">
                    51 – 90<br>ไมโครกรัมต่อลูกบาศก์เมตร
                  </div>
                  <div class="column is-6">
                    ลดหรือจำกัดการทำกิจกรรมนอกบ้าน กลุ่มเสี่ยงควรลดเวลาการทำกิจกรรมนอกบ้าน
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card" v-else-if="colorIdDetail == 5" style="font-family: 'Kanit', sans-serif;">
            <div class="card-content">
              <div class="content">
                <!-- แดง -->
                <h3>มีผลกระทบต่อสุขภาพ</h3>
                <div class="columns has-text-centered">
                  <div class="column is-2">
                    <span class="icon is-large">
                      <span class="fa-stack fa-lg">
                        <font-awesome-icon icon="fa-solid fa-face-angry" size="2xl" style="color: #f04646;" />
                      </span>
                    </span>
                  </div>
                  <div class="column is-4">
                    91 ขึ้นไป<br>ไมโครกรัมต่อลูกบาศก์เมตร
                  </div>
                  <div class="column is-6">
                    ลดหรืองดการทำกิจกรรมนอกบ้าน เปลี่ยนมาออกกำลังกายในบ้าน
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card" v-else style="font-family: 'Kanit', sans-serif;">
            <div class="card-content">
              <div class="content">
                <!-- ไม่พบข้อมูล -->
                <h3>ไม่พบข้อมูล</h3>
                <div class="columns has-text-centered">
                  <div class="column is-2">
                    <span class="icon is-large">
                      <span class="fa-stack fa-lg">
                        <font-awesome-icon icon="fa-solid fa-circle-exclamation" size="2xl" style="color: #f04646;" />
                      </span>
                    </span>
                  </div>
                  <div class="column is-4">
                    -
                  </div>
                  <div class="column is-6">
                    -
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="modalDetail = !modalDetail"></button>
      </div>


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
      modalDetail: false,
      colorIdDetail: '',
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
          ||
          val.nameEN.toLowerCase().includes(this.search.toLowerCase())
          ||
          val.areaTH.toLowerCase().includes(this.search.toLowerCase())
          ||
          val.areaEN.toLowerCase().includes(this.search.toLowerCase())
        );
        if (this.result.length == 0){
          alert('ไม่พบพื้นที่')
        }
      }
      else {
        this.checkSearch = false
      }
    },
    showDetail(colorId){
      this.modalDetail = true
      this.colorIdDetail = colorId
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