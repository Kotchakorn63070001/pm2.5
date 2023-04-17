<template>
  <div id="app">
    <div class="container is-max-widescreen mt-5">
      <h1 class="title has-text-centered" style="font-family: 'Kanit', sans-serif">รายงานสภาพอากาศฝุ่น PM 2.5</h1>
      <div class="field is-grouped is-grouped-centered">
        <p class="control has-icons-left">
          <input class="input is-rounded" type="text" placeholder="ค้นหาพื้นที่" v-model="search"
            style="font-family: 'Kanit', sans-serif;">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </span>
        </p>
        <p class="control" style="font-family: 'Kanit', sans-serif">
          <a class="button is-link is-outlined is-rounded" @click="filterLocation"> ค้นหา </a>
        </p>
      </div>
      <p class="is-size-7 has-text-right" style="font-family: 'Kanit', sans-serif;">ข้อมูลจากกรมควบคุมมลพิษ</p>
      <!-- Table Show Search -->
      <table class="table is-hoverable" style="font-family: 'Kanit', sans-serif;" v-if="checkSearch == true">
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in result" :key="data.stationID">
            <td>{{ data.nameTH }}</td>
            <td>{{ data.nameEN }}</td>
            <td>{{ data.areaTH }}</td>
            <td>{{ data.areaEN }}</td>
            <td>{{ data.AQILast.date }}</td>
            <td>{{ data.AQILast.time }}</td>
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
            <td>{{ data.AQILast.PM25.aqi }}</td>
            <td>{{ data.AQILast.PM25.value }}</td>
            <td>
              <button class="button is-info is-light" @click="openModal(data)"
                style="font-family: 'Kanit', sans-serif">รับข้อมูล</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Table Show All Area -->
      <table class="table is-hoverable" style="font-family: 'Kanit', sans-serif;" v-else>
        <thead class="has-background-link-light">
          <tr>
            <th>ชื่อสถานที่</th>
            <th></th>
            <th>พื้นที่</th>
            <th></th>
            <th>วันที่</th>
            <th>เวลา</th>
            <th>คุณภาพอากาศ</th>
            <th>AQI</th>
            <th>PM 2.5 (ug/m³)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in info" :key="data.stationID">
            <td>{{ data.nameTH }}</td>
            <td>{{ data.nameEN }}</td>
            <td>{{ data.areaTH }}</td>
            <td>{{ data.areaEN }}</td>
            <td>{{ data.AQILast.date }}</td>
            <td>{{ data.AQILast.time }}</td>
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
            <td>{{ data.AQILast.PM25.aqi }}</td>
            <td>{{ data.AQILast.PM25.value }}</td>
            <td>
              <button class="button is-info is-light" @click="openModal(data)"
                style="font-family: 'Kanit', sans-serif">รับข้อมูล</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal Show Detail -->
      <div class="modal" v-bind:class="{ 'is-active': modalDetail }">
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
      <!-- Modal สำหรับกรอกอีเมล -->
      <div class="modal" :class="{ 'is-active': isModalActive }">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">กรอกอีเมลเพื่อรับข้อมูล PM 2.5</p>
            <button class="delete" aria-label="close" @click="closeModal"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="email" placeholder="อีเมล" v-model="email"
                  style="font-family: 'Kanit', sans-serif" />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="fa-solid fa-envelope" />
                </span>
              </p>
            </div>
            <div class="form-group">
              <label for="scheduledTime">เวลาที่ต้องการส่ง:</label>
              <input type="time" class="form-control" id="scheduledTime" v-model="scheduledTime" />
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-link is-outlined" @click="sendEmailAndSchedule"
              style="font-family: 'Kanit', sans-serif">
              ส่งข้อมูล PM 2.5 ไปที่อีเมล
            </button>
            <button class="button is-link is-light" @click="closeModal" style="font-family: 'Kanit', sans-serif">
              ยกเลิก
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import emailjs from "emailjs-com";
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
      isModalActive: false,
      selectedData: null,
      email: '',
      scheduledTime: '',
      qualityStatus: "",
      advice: "",
      iconCode:"",
      iconColor:"",
    }
  },
  created() {
    this.fetchData()
    this.scheduleEmail();
    setInterval(() => {
      this.fetchData()
    }, 60000)
  },

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
    filterLocation() {
      if (this.search !== '') {
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
        if (this.result.length == 0) {
          alert('ไม่พบพื้นที่')
        }
      }
      else {
        this.checkSearch = false
      }
    },
    showDetail(colorId) {
      this.modalDetail = true
      this.colorIdDetail = colorId

      if (colorId == 1) {
      this.qualityStatus = "คุณภาพอากาศดีมาก";
      this.advice = "สามารถทำกิจกรรมนอกบ้านได้ตามปกติ";
      this.iconCode = "&#xf599;";
      this.iconColor = "color: #3bccff;";
    } else if (colorId == 2) {
      this.qualityStatus = "คุณภาพอากาศดี";
      this.advice = "สามารถทำกิจกรรมนอกบ้านได้ตามปกติ สำหรับกลุ่มเสี่ยงควรหลีกเลี่ยงการทำกิจกรรมนอกบ้าน";
      this.iconCode = "&#xf5b2;";
      this.iconColor = "color: #92d050;";
    } else if (colorId == 3) {
      this.qualityStatus = "คุณภาพอากาศปานกลาง";
      this.advice = "ควรหลีกเลี่ยงการทำกิจกรรมนอกบ้าน กลุ่มเสี่ยงควรหลีกเลี่ยงการทำกิจกรรมนอกบ้าน";
      this.iconCode = "&#xf5b1;";
      this.iconColor = "color: #ffdb58;";
    } else if (colorId == 4) {
      this.qualityStatus = "คุณภาพอากาศเริ่มมีผลกระทบต่อสุขภาพ";
      this.advice = "ควรลดหรือจำกัดการทำกิจกรรมนอกบ้าน กลุ่มเสี่ยงควรลดเวลาการทำกิจกรรมนอกบ้าน";
      this.iconCode = "&#xf567;";
      this.iconColor = "color: #ffa200;";
    }else if (colorId == 5) {
      this.qualityStatus = "คุณภาพอากาศมีผลกระทบต่อสุขภาพ";
      this.advice = "ควรลดหรืองดการทำกิจกรรมนอกบ้าน เปลี่ยนมาออกกำลังกายในบ้าน";
      this.iconCode = "&#xf567;";
      this.iconColor = "#f04646";
    }
  },
    openModal(data) {
      this.selectedData = data;
      console.log(this.selectedData)
      this.isModalActive = true;
    },
    closeModal() {
      this.isModalActive = false;
    },
    async sendEmail() {
      try {
        const templateParams = {
          to_email: this.email,
          pm25_value: this.selectedData.AQILast.PM25.value,
          location_name: this.selectedData.nameTH,
          locationDetail_name: this.selectedData.areaTH,
          date_value: this.selectedData.AQILast.date,
          time_value: this.selectedData.AQILast.time,
          qualityStatus: this.qualityStatus,
          advice: this.advice,
          iconCode: this.iconCode,
          iconStyle: this.iconColor
        };
        const serviceID = "service_vnott1o";
        const templateID = "template_m1zg4pi";
        const userID = "oBk37LeZyIX4h_8ne";
        const result = await emailjs.send(
          serviceID,
          templateID,
          templateParams,
          userID
        );
        if (result.status === 200) {
          alert("อีเมลถูกส่งเรียบร้อยแล้ว");
        } else {
          alert("เกิดข้อผิดพลาดในการส่งอีเมล");
        }
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    },
    async scheduleEmail() {
      const now = new Date();
      const scheduledDate = new Date();
      const [scheduledHour, scheduledMinute] = this.scheduledTime.split(':');
      scheduledDate.setHours(scheduledHour, scheduledMinute, 0);

      if (scheduledDate <= now) {
        scheduledDate.setDate(scheduledDate.getDate() + 1); // Schedule for the next day if the time has passed today
      }
      const timeUntilScheduledTime = scheduledDate - now;
      setTimeout(this.updateSelectedDataAndSendEmail, timeUntilScheduledTime);
      // setTimeout(this.sendEmail, timeUntilScheduledTime);
    },
    sendEmailAndSchedule() {
      this.scheduleEmail();
      alert('อีเมลถูกกำหนดเวลาส่งเรียบร้อย')
      this.closeModal();
    },
    updateSelectedDataAndSendEmail() {
      const selectedStationId = this.selectedData.stationID;
      console.log(selectedStationId)
      this.fetchData(); // อัปเดตข้อมูลก่อนส่งอีเมล
      // this.selectedData = this.info.find(station => station.id === selectedStationId);
      this.selectedData = this.info.find((station) => station.stationID == selectedStationId);
      console.log(this.selectedData)
      this.sendEmail();
    }

  }
}
</script>
<style>
@import 'bulma/css/bulma.css';
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

html,
body {
  font-family: 'Kanit', sans-serif;
}

#app {
  font-family: 'Kanit', sans-serif;
}

/* สไตล์ของ Modal */
/* .modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
} */
</style>
