<template>
  <div>
    demo-vue<br/>
    <button @click="getTest">/page</button> <br/>
    <button @click="getTest">/api</button> <br/>
    <button @click="postTest">/juejin/web/user/login/?account_sdk_source=web</button> <br/>
    <div>
      <textarea ref="textarea" class="textarea"/>
    </div>
  </div>
</template>

<script>
import originAxios from 'axios';
const target = 'http://172.17.5.230:3000/'

const axios = originAxios.create({
  baseURL: target
})
axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (err) => {
      return Promise.reject(err);
    }
);

export default {
  name: "demo",
  data() {
    return {
      target: ''
    }
  },
  async mounted() {
    console.log('mounted')
  },
  methods: {
    getTest,
    postTest
  }
}

async function getTest(e) {
  const url = e.target.innerText
  const res = await axios.get(url)
  this.$refs.textarea.innerText = JSON.stringify(res)
  console.log(res)
}

async function postTest(e) {
  const url = e.target.innerText
  const res = await axios.post(url)
  this.$refs.textarea.innerText = JSON.stringify(res)
  console.log(res)
}

</script>

<style scoped>
.textarea{
  width: 90%;
  height:70vh;
}
</style>
