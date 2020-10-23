<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">Sign Up, it's free!</h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form" @submit.prevent="signup">
        <div class="field">
          <label>Username</label>
          <input type="text" name="username" v-model="username"  placeholder="Username">
        </div>

        <div class="field" >
          <label>Email</label>
          <input type="email" name="email" v-model="email" placeholder="Email">
        </div>

        <div class="field">
          <label>Password</label>
          <input type="password" name="password" v-model="password" placeholder="Password">

        </div>

        <button class="fluid ui primary button" :disabled="false">SIGN UP</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Got an account? <router-link to="/login">Log In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import { extend } from 'vee-validate'

extend('empty', value => {
  return value === ''
})
export default {
  name: 'SignUpForm',
  components: {
    Notification
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  computed: {
    // isFormValid () {
    //   return Object.keys(this.fields).every(key => this.fields[key].valid)
    // }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('user-token')

    return token ? next('/') : next()
  },
  methods: {
    signup () {
      this.$axios
        .post('/signup', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
          // save token in localstorage
          localStorage.setItem('user-token', response.data.value)

          // redirect to user home
          this.$router.push('/')
        })
        .catch(error => {
          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status
          })
        })
    }
  }
}
</script>
