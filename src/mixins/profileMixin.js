import axios from 'axios'

export default {
  created () {
    this.$_profileMixin_fetchUser(this.$route.params.username)

    const token = localStorage.getItem('user-token')

    if (token) {
      this.$_profileMixin_fetchAuthenticatedUser(token)
    }
  },
  methods: {
    $_profileMixin_fetchUser (username) {
      if (username) {
        axios.get(`/${username}`).then(response => {
          this.user = response.data.value.profile
          this.tweetsLength = response.data.value.posts.length
        })
      } else {
        const token = localStorage.getItem('user-token')

        axios
          .get('me', {
            headers: {
              'UserAuth': token
            }
          })
          .then(response => {
            this.user = response.data.value.profile
            this.tweetsLength = response.data.value.posts.length
          })
      }
    },
    $_profileMixin_fetchAuthenticatedUser (token) {
      axios
        .get('me', {
          headers: {
            'UserAuth': token
          }
        })
        .then(response => {
          this.authUser = response.data.value.profile
          this.tweetsLength = response.data.value.posts.length
        })
    }
  }
}
