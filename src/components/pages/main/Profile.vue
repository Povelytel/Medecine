<template>
  <div id="profile">
    <h1>User profile</h1>
    <div id="user_info">
      <form
        v-for="(user, idx) in users"
        :key="idx"
        v-on:click="
          setUserInformation(
            user.id,
            user.first_name,
            user.last_name,
            user.phone_number,
            user.profileImgName,
            user.profileImgUrl,
            user.contry,
            user.city,
            user.address,
            user.post_code,
          )
        "
      >
        <!-- <uiImageUpload  :user="user" v-on:url="downloadURL=$event"></uiImageUpload> -->
        <ui-input
          :id="'first_name'"
          v-model="user.first_name"
          :title="'First name'"
        ></ui-input>
        <ui-select
          :id="'contry'"
          v-if="data.length > 0"
          v-model="user.contry"
          :title="'Contry'"
          :options="data[0].contrys"
        ></ui-select>
        <ui-input
          :id="'post_code'"
          v-model="user.post_code"
          :title="'Post code'"
        ></ui-input>
        <ui-input
          :id="'last_name'"
          v-model="user.last_name"
          :title="'Last name'"
        ></ui-input>
        <ui-select
          :id="'city'"
          v-if="data.length > 0"
          v-model="user.city"
          :title="'City'"
          :options="data[0].citys"
        ></ui-select>
        <span></span>
        <ui-input
          :id="'phone_number'"
          v-model="user.phone_number"
          :title="'Phone number'"
        ></ui-input>
        <ui-input
          :id="'address'"
          v-model="user.address"
          :title="'Address'"
        ></ui-input>
        <ui-button :title="'Save'"></ui-button>
      </form>
    </div>
  </div>
</template>
<script>
// import { storage, db } from "@/main"
// import stor from "firebase/storage"
// import axios from "axios"
import UiInput from '@/components/ui/input/uiInput'
import UiInputSelect from '@/components/ui/input/uiInputSelect'
// import UiImageUpload from "@/components/ui/card/uiImageUpload"
import UiButton from '@/components/ui/button/uiButton'

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
      users: [
        {
          id: 0,
          first_name: 'first_name',
          last_name: 'last_name',
          phone_number: '+380986271177',
          profileImgName: 'profileImgName',
          profileImgUrl: 'profileImgUrl',
          contry: 'contry',
          city: 'city',
          address: 'address',
          post_code: '24000',
        },
      ],
      data: [
        {
          contrys: ['Україна'],
        },
      ],
      downloadURL: '',
    }
  },
  // firestore() {
  //   return {
  //     users: db.collection("users"),
  //     data: db.collection("data").orderBy("contrys")
  //   }
  // },
  methods: {
    addUserInformation(first_name) {
      const createdAt = new Date()
      console.log(first_name)
      console.log(createdAt)
      // db.collection("users").add({ first_name, createdAt })
    },
    setUserInformation(
      id,
      first_name,
      last_name,
      phone_number,
      profileImgName,
      profileImgUrl,
      contry,
      city,
      address,
      post_code,
    ) {
      const changeAt = new Date()
      if (this.downloadURL !== '') {
        profileImgUrl = this.downloadURL
        // Розкоментируй для удаление не нужного файла, закоментируй для меньшого обращения к серверу. Оптимизация, или здравый смысл вот в чём вопрос.
        // this.deleteImage(id+'/'+profileImgName)
        if (profileImgName === id) {
          profileImgName = profileImgName + '1'
        } else {
          profileImgName = id
        }
        this.downloadURL = ''
      }
      console.log({
        changeAt,
        first_name,
        last_name,
        phone_number,
        profileImgName,
        profileImgUrl,
        contry,
        city,
        address,
        post_code,
      })
      // db.collection("users")
      //   .doc(id)
      //   .set({
      //     changeAt,
      //     first_name,
      //     last_name,
      //     phone_number,
      //     profileImgName,
      //     profileImgUrl,
      //     contry,
      //     city,
      //     address,
      //     post_code
      //   })
    },
    deleteUserInformation(id) {
      // <-- новый метод
      console.log(id)
      // db.collection("users")
      //   .doc(id)
      //   .delete()
    },
    // checkThisFuck(fuck){

    // 	fuck.forEach(element => {
    // 		if(element.contrys!==undefined){
    // 			return element.contrys
    // 		}
    // 		else {
    // 		return ['asdas','asdasa']
    // 		}
    // 	})
    // 	return ['asdas','asdasa']
    // }
  },
}
</script>
