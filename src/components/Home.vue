<template>
  <div class="ui stackable grid vertically padded container">
    <div class="four wide column">
      <UserSidebar :user="user" />
    </div>
    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui medium dividing header">Timeline</h2>

        <Tweets :tweets.sync="tweets" />
      </div>
    </div>
    <div class="four wide column">
      <WhoToFollow />
    </div>
  </div>
</template>

<script>
import Tweets from '@/components/Tweet/Tweets'
import UserSidebar from '@/components/User/UserSidebar'

import WhoToFollow from '@/components/User/WhoToFollow'

export default {
  name: 'Home',
  components: {
    Tweets,
    UserSidebar,
    WhoToFollow
  },
  data () {
    return {
      user: {},
      tweets: []
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('user-token')

    return token ? next() : next('/login')
  },
  created () {
    this.fetchAuthenticatedUser()
    this.fetchUserTimeline()
  },
  methods: {
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('user-token')

      this.$axios
        .get('me', {
          headers: {
            'UserAuth': token
          }
        })
        .then((response) => {
          this.user = response.data.value.profile
        })
    },
    fetchUserTimeline () {
      const token = localStorage.getItem('user-token')

      this.$axios
        .get('/posts', {
          headers: {
            'UserAuth': token
          }
        })
        .then((response) => {
          this.tweets = response.data.value
        })
    }
  }
}
</script>
