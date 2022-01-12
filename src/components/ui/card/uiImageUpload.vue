<template>
  <div class="prof_img">
    <img v-bind:src="imgProfile(user.profileImgUrl)" alt="Imagen for profile" />
    <label>
      <input
        type="file"
        accept="image/*"
        class="hide"
        v-on:change="onFileChange($event, user.id, profileImgName)"
      />
      Select photo
    </label>
    <div
      v-if="progressUpload !== 0 && progressUpload !== 100"
      class="progress-bar"
      :style="{ width: progressUpload + '%' }"
    >
      {{ progressUpload }}%
    </div>
  </div>
</template>
<script>
// import { storage } from "@/main"
// import stor from "firebase/storage"
export default {
  name: 'UiImageUpload',
  props: {
    user: Object,
  },
  data() {
    return {
      imgProfileUrl: '',
      progressUpload: 0,
      uploadTask: '',
      downloadURL: '',
      uploadEnd: false,
      uploading: false,
    }
  },
  methods: {
    cheackInput(file) {
      if (!(file === '')) {
        if (!(file === undefined)) {
          return 'inputCheack'
        }
        return false
      } else {
        return false
      }
    },
    onFileChange(e, id, ImgName) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
      this.uploadFile(files[0], id, ImgName)
    },
    createImage(file) {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.imgProfileUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      console.log(e)
      this.imgProfileUrl = ''
    },
    imgProfile(profileImgUrl) {
      if (this.imgProfileUrl == '') {
        if (profileImgUrl == '') {
          return require('@/assets/bill.jpg')
        } else {
          return profileImgUrl
        }
      } else {
        return this.imgProfileUrl
      }
    },
    uploadFile(file, id, ImgName) {
      if (id === '') {
        // id = profile
        id = 'asd'
      }
      let profileImgName
      if (ImgName === id) {
        profileImgName = id + '1'
      } else {
        profileImgName = id
      }
      console.log(profileImgName)
      // this.uploadTask = storage.ref(id + "/" + profileImgName).put(file)
    },
    deleteImage(ImgName) {
      console.log(ImgName)
      // storage
      //   .ref(ImgName)
      //   .delete()
      //   .then(() => {
      //     console.log(ImgName)
      //   })
      //   .catch(error => {
      //     console.error(`file delete error occured: ${error}`)
      //   })
    },
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on(
        'state_changed',
        (sp) => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100,
          )
          this.uploadEnd = false
          this.downloadURL = ''
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.uploadEnd = true
            this.downloadURL = downloadURL
            this.$emit('url', downloadURL)
          })
        },
      )
    },
  },
}
</script>
