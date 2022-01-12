<template>
  <div id="Ui-Components">
    <h1>Ui Components</h1>
    <div class="ui-content">
      <div class="for-input" v-if="data.length > 0 && users.length > 0">
        <div class="ui-block">
          <p>Input - empty</p>
          <ui-input
            :id="'text'"
            v-model="users[0].empty"
            :title="'Name'"
          ></ui-input>
          <p>Select - empty</p>
          <ui-input-select
            :id="'list'"
            :options="data[0].citys"
            v-model="users[0].empty"
            :title="'City'"
          ></ui-input-select>
        </div>
        <div class="ui-block">
          <p>Input - focus/not empty</p>
          <ui-input
            :id="'text'"
            v-model="users[0].last_name"
            :title="'Name'"
          ></ui-input>
          <p>Select - focus/not empty</p>
          <ui-input-select
            :id="'list'"
            :options="data[0].citys"
            v-model="users[0].city"
            :title="'City'"
          ></ui-input-select>
        </div>
        <div class="ui-block">
          <p>Input - disable</p>
          <ui-input
            :id="'text'"
            v-model="users[0].disable"
            :title="'Name'"
            :disabled="true"
          ></ui-input>
          <p>Select - disable</p>
          <ui-input-select
            :id="'list'"
            :options="data[0].citys"
            v-model="users[0].disable"
            :title="'City'"
            :disabled="true"
          ></ui-input-select>
        </div>
      </div>
      <div class="for-button">
        <div class="ui-block">
          <p>Button - Normal</p>
          <uiButton :title="'Button'"></uiButton>
        </div>
        <div class="ui-block">
          <p>Button - Hover</p>
          <uiButton class="hoverr" :title="'Button'"></uiButton>
        </div>
        <div class="ui-block">
          <p>Button - disable</p>
          <uiButton :title="'Button'" :disabled="true"></uiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { storage, db } from "@/main"
// import stor from "firebase/storage"
import UiInput from '@/components/ui/input/uiInput'
import UiInputSelect from '@/components/ui/input/uiInputSelect'
import UiButton from '@/components/ui/button/uiButton'
export default {
  name: 'Ui-Components',
  components: {
    'ui-input': UiInput,
    'ui-input-select': UiInputSelect,
    uiButton: UiButton,
  },
  data() {
    return {
      users: [],
      data: [],
      disable: true,
    }
  },
  // firestore() {
  //   return {
  //     users: db.collection("users"),
  //     data: db.collection("data").orderBy("contrys")
  //   }
  // },
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
  },
}
</script>
