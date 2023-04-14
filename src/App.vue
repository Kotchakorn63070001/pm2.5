<template>
  <div id="app">
    <div class="container is-max-widescreen mt-5 is-family-monospace">
      <h1
        class="title has-text-centered"
        style="font-family: 'Kanit', sans-serif"
      >
        รายงานสภาพอากาศฝุ่น PM 2.5
      </h1>
      <div class="field is-grouped is-grouped-centered">
        <p class="control has-icons-left">
          <input
            class="input is-rounded"
            type="text"
            placeholder="ค้นหาพื้นที่"
            v-model="search"
            style="font-family: 'Kanit', sans-serif"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </span>
        </p>
        <p class="control" style="font-family: 'Kanit', sans-serif">
          <a
            class="button is-link is-outlined is-rounded"
            @click="filterLocation"
          >
            ค้นหา
          </a>
        </p>
      </div>
      <table
        class="table"
        style="font-family: 'Kanit', sans-serif"
        v-if="checkSearch == true"
      >
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
          <tr v-for="data in result" :key="data.stationID">
            <!-- <td>{{  data.stationID }}</td> -->
            <td>{{ data.nameTH }}</td>
            <td>{{ data.nameEN }}</td>
            <td>{{ data.areaTH }}</td>
            <td>{{ data.areaEN }}</td>
            <td>{{ data.AQILast.date }}</td>
            <td>{{ data.AQILast.time }}</td>
            <td v-if="data.AQILast.PM25.color_id == 1">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-laugh-beam"
                    style="color: #3bccff"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 2">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-smile"
                    style="color: #92d050"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 3">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-meh"
                    style="color: #ffdb58"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 4">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-frown"
                    style="color: #ffa200"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 5">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-angry"
                    style="color: #f04646"
                  />
                </span>
              </button>
            </td>
            <td v-else>
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                </span>
              </button>
            </td>
            <td>{{ data.AQILast.PM25.aqi }}</td>
            <td>{{ data.AQILast.PM25.value }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table" style="font-family: 'Kanit', sans-serif" v-else>
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
          <tr
            v-for="data in info"
            :key="data.stationID"
           
          >
            <!-- <td>{{  data.stationID }}</td> -->
            <td>{{ data.nameTH }}</td>
            <td>{{ data.nameEN }}</td>
            <td>{{ data.areaTH }}</td>
            <td>{{ data.areaEN }}</td>
            <td>{{ data.AQILast.date }}</td>
            <td>{{ data.AQILast.time }}</td>
            <td v-if="data.AQILast.PM25.color_id == 1">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-laugh-beam"
                    style="color: #3bccff"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 2">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-smile"
                    style="color: #92d050"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 3">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-meh"
                    style="color: #ffdb58"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 4">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-frown"
                    style="color: #ffa200"
                  />
                </span>
              </button>
            </td>
            <td v-else-if="data.AQILast.PM25.color_id == 5">
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-face-angry"
                    style="color: #f04646"
                  />
                </span>
              </button>
            </td>
            <td v-else>
              <button class="button is-rounded is-large">
                <span class="icon">
                  <font-awesome-icon
                    icon="fa-sharp fa-solid fa-circle-exclamation"
                  />
                </span>
              </button>
            </td>
            <td>{{ data.AQILast.PM25.aqi }}</td>
            <td>{{ data.AQILast.PM25.value }}</td>
            <button   @click="openModal(data)">รับข้อมูล</button>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- โครงสร้าง HTML ของ Modal -->

    <!-- Modal สำหรับกรอกอีเมล -->
    <div class="modal" :class="{ 'is-active': isModalActive }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">กรอกอีเมลเพื่อรับข้อมูล PM 2.5</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="email"
                placeholder="อีเมล"
                v-model="email"
                style="font-family: 'Kanit', sans-serif"
              />
              <span class="icon is-small is-left">
                <font-awesome-icon icon="fa-solid fa-envelope" />
              </span>
            </p>
          </div>
          <div class="form-group">
            <label for="scheduledTime">เวลาที่ต้องการส่ง:</label>
            <input
              type="time"
              class="form-control"
              id="scheduledTime"
              v-model="scheduledTime"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-link is-outlined" @click="sendEmail">
            ส่งข้อมูล PM 2.5 ไปที่อีเมล
          </button>
          <button class="button is-link is-light" @click="closeModal">
            ยกเลิก
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emailjs from "emailjs-com";

export default {
  name: "App",
  components: {},
  data() {
    return {
      info: null,
      search: "",
      result: null,
      checkSearch: false,
      size: 0,
      isModalActive: false,
      //scheduledTime: '09:00',

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
    };
  },
  created() {
    this.fetchData();
    //this.scheduleEmail();
    setInterval(() => {
      this.fetchData();
    }, 60000);
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
      axios
        .get("http://air4thai.pcd.go.th/services/getNewAQI_JSON.php")
        .then((res) => {
          this.info = res.data.stations;
          console.log(res.data);
          console.log(res.data.stations);
          this.size = this.info.length;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filterLocation() {
      /// jen test
      if (this.search !== "") {
        this.checkSearch = true;
        this.result = this.info.filter(
          (val) =>
            val.nameTH.toLowerCase().includes(this.search.toLowerCase()) ||
            val.nameEN.toLowerCase().includes(this.search.toLowerCase()) ||
            val.areaTH.toLowerCase().includes(this.search.toLowerCase()) ||
            val.areaEN.toLowerCase().includes(this.search.toLowerCase())
        );
        if (this.result.length == 0) {
          alert("ไม่พบพื้นที่");
        }
      } else {
        this.checkSearch = false;
      }
    },
    
    openModal(data) {
      this.selectedData = data;
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
        };
        const serviceID = "service_0nazvow";
        const templateID = "template_2yaj7wf";
        const userID = "R1-S3aMadPkVaUqP3";
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
        alert("เกิดข้อผิดพลาดในการส่งอีเมล");
      }

      this.closeModal();
    },

    //แบบกำหนดเวลาไว้แล้ว
    //scheduleEmail() {
    //  const currentTime = new Date();
    //  const scheduledTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0);
    //
    //  if (currentTime > scheduledTime) {
    //    scheduledTime.setDate(scheduledTime.getDate() + 1); // ถ้าหากข้ามเวลาที่ตั้งไว้แล้ว ให้ส่งในวันถัดไป
    //  }
    //
    //  const timeDifference = scheduledTime - currentTime;
    //
    //  setTimeout(() => {
    //    this.sendEmail();
    //    setInterval(() => {
    //      this.sendEmail();
    //    }, 24 * 60 * 60 * 1000); // ส่งอีเมล์ทุกๆ 24 ชั่วโมง
    //  }, timeDifference);
    //},

    //แบบinputเวลาจากuser
    //  scheduleEmail() {
    //  const currentTime = new Date();
    //  const [scheduledHour, scheduledMinute] = this.scheduledTime.split(':');
    //  const scheduledTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), scheduledHour, scheduledMinute, 0);
    //
    //  if (currentTime > scheduledTime) {
    //    scheduledTime.setDate(scheduledTime.getDate() + 1); // ถ้าหากข้ามเวลาที่ตั้งไว้แล้ว ให้ส่งในวันถัดไป
    //  }
    //
    //  const timeDifference = scheduledTime - currentTime;
    //
    //  setTimeout(() => {
    //    this.sendEmail();
    //    setInterval(() => {
    //      this.sendEmail();
    //    }, 24 * 60 * 60 * 1000); // ส่งอีเมล์ทุกๆ 24 ชั่วโมง
    //  }, timeDifference);
    //},
  },
};
</script>
<style>
@import "bulma/css/bulma.css";
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");

html,
body {
  font-family: "Kanit", sans-serif;
}

#app {
  font-family: "Kanit", sans-serif;
}

/* สไตล์ของ Modal */
.modal {
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
}
</style>
