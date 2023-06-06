<template>
  <div class="main-mine">
  <div class="stream">
    <qr-stream @decode="onDecode" class="mb" @init="onInit" >
      <div style="color: red;" class="frame"></div>
    </qr-stream>
  </div>
  <div class="result">
    Result: {{data}}
  </div>
  </div>
</template>

<script lang="js" setup>
import { QrStream} from 'vue3-qr-reader'
import { defineComponent, ref, Ref, reactive, toRefs } from 'vue'
import { payFee, getBorrowedBookLists} from "@/api/modules/Staff"
import { success } from "@/api"
import axios from "axios"

export default defineComponent({
  name: 'Qrcode3',
  components: {
    QrStream,
    //QrCapture,
    //QrDropzone
  },
  setup() {
    const state = reactive({
      data: null
    })
    const onDecode = async(QRcontent) => {
      state.data = QRcontent
      console.log(JSON.parse(QRcontent));

      const { data } = await payFee(JSON.parse(QRcontent));
      state.data = data;
      if(data.success) {
        success();
      }
    }
    const  onInit = async(promise) => {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = `ERROR: Camera access is only permitted in secure context. 
          Use HTTPS or localhost rather than HTTP.`;
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    }
    return {
      ...toRefs(state),
      onDecode,
      onInit
    }
  }
})
</script>
<style lang="scss" scoped>
.main-mine {
  background: #ccc;
}
</style>