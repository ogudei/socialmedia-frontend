<template>
    <div class="ui segment">
        <h2 class="ui medium dividing header">Who to follow</h2>
        <i class="refresh link icon" @click="fetchWhoToFollow"></i>

        <div class="ui divided link items">
            <div class="item" v-for="user in usersToFollow" :key="user._id">
                <div class="ui avatar image">
                    <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
                </div>
                <div class="content">
                    <router-link class="ui small header" :to="`/${user.username}`">
                        {{ user.username }} <small>{{ `@${user.username}` }}</small>
                    </router-link>

                    <div class="meta">
                        <button class="ui compact button mini primary" @click="followUser(user._id)">Follow</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'WhoToFollow',
  data () {
    return {
      usersToFollow: ''
    }
  },
  created () {
    this.fetchWhoToFollow()
  },
  methods: {
    fetchWhoToFollow () {
      const token = localStorage.getItem('user-token')

      this.$axios
        .get('/whotofollow', {
          headers: {
            'UserAuth': token
          }
        })
        .then(response => {
          this.usersToFollow = response.data.value
        })
    },
    followUser (userId) {
      const token = localStorage.getItem('user-token')

      this.$axios
        .post(
          '/follow',
          { userId: userId },
          {
            headers: {
              'UserAuth': token
            }
          }
        )
        .then(response => {
          if (response.data.isValid === 1) {
            this.usersToFollow = this.usersToFollow.filter(u => {
              return u.id !== userId
            })
            let index = this.usersToFollow.findIndex(user => user._id === userId)
            this.usersToFollow.splice(index, 1)
          } else {
            console.log(response.data.notification)
          }
        })
    }
  }
}
</script>
