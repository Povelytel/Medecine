<template>
  <div id="home">
    <h1>Home</h1>
    <div v-if="!selectAction && !patientInfo" id="select_patient">
      <ui-button :title="'Add patient'" @click="addPatien"></ui-button>
      <div v-if="patiens.length > 0">
        <form action="">
          <ui-select
            :id="'search'"
            @select-patient="selectPatient"
            :title="'Search patient'"
            :options="patiens"
          ></ui-select>
        </form>
        <ui-button :title="'Add storie'" @click="addStorie" :disabled="!patienChose()"></ui-button>
        <ui-button :title="'Edit patient'" @click="editPatien" :disabled="!patienChose()"></ui-button>
      </div>
      <div v-if="patiens.length === 0">
        <p>Don`t have any patient</p>
      </div>
    </div>

    <div v-if="patientInfo" id="patient_info">
      <form>
        <ui-input :id="'first_name'" v-model="patient.first_name" :title="'First name'"></ui-input>
        <ui-input :id="'post_code'" v-model="patient.post_code" :title="'Post code'"></ui-input>
        <ui-input :id="'last_name'" v-model="patient.last_name" :title="'Last name'"></ui-input>
        <span></span>
        <ui-input :id="'phone_number'" v-model="patient.phone_number" :title="'Phone number'"></ui-input>
        <ui-input :id="'address'" v-model="patient.address" :title="'Address'"></ui-input>

        <ui-button @click="savePatientInfo" :title="'Save'"></ui-button>
        <ui-button @click="closePatientInfo" :title="'Close'"></ui-button>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

import UiInput from '@/components/ui/input/uiInput';
import UiInputSelect from '@/components/ui/input/uiInputSelect';
// import UiImageUpload from "@/components/ui/card/uiImageUpload"
import UiButton from '@/components/ui/button/uiButton';

export default {
  name: 'userProfile',
  components: {
    'ui-input': UiInput,
    'ui-select': UiInputSelect,
    'ui-button': UiButton,
    // uiImageUpload: UiImageUpload
  },
  data() {
    return {
      selectAction: false,
      patientInfo: false,
      patient: {},
      patien: null,
      patiens: [
        {
          id: 0,
          full_name: 'Test1',
          date: 1998,
        },
        {
          id: 1,
          full_name: 'Test2',
          date: 1996,
        },
      ],
    };
  },
  methods: {
    addPatien() {
      this.patientInfo = true;
    },
    selectPatient(val) {
      this.patien = val;
    },
    patienChose() {
      return this.patien === null || (this.patien === '' ? false : true);
    },
    editPatien() {
      //
    },
    addStorie() {
      //
    },
    closePatientInfo() {
      this.patientInfo = false;
    },

    //Get png image of coin from it's ID
    formatDate(unix) {
      const date = new Date(unix * 1000); // convert to milliseconds
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      // Check if day or month is only 1 digit
      // this because Moment.js works with 0 leading values
      if (day.toString().length !== 2) day = `0${day}`;
      if (month.toString().length !== 2) month = `0${month}`;

      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    // axios({
    //   method: 'GET',
    //   url: 'https://api.coinmarketcap.com/v1/ticker/?limit=7',
    // }).then(
    //   (result) => {
    //     this.coins = result.data
    //   },
    //   (error) => {
    //     console.error(error)
    //   },
    // )
  },
};
</script>
