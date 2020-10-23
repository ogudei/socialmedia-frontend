<template>
  <div class="ui segment">
    <div class="ui grid container">
      <div class="four wide column">
        <img
          class="ui tiny avatar image"
          src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"
        />
      </div>
      <div class="bottom aligned twelve wide column">
        <div class="ui horizontal relaxed link list">
          <div class="item">
            <div class="content">
              <router-link :to="`/${user._id}`">
                <div class="header">Tweets</div>
                <strong>{{ tweetsLength || 0 }}</strong>
              </router-link>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <router-link
                :to="'/following'"
              >
                <div class="header">Following</div>
                <strong>{{ user.following.length || 0 }}</strong>
              </router-link>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <router-link
                :to="'/followers'"
              >
                <div class="header">Followers</div>
                <strong>{{ user.followers.length || 0}}</strong>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfileHeader',
  props: {
    user: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
    tweetsLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    isOwner () {
      return this.user._id === this.authUser._id
    },
    isLoggedIn () {
      return !!this.authUser
    }
  },
  created () {
    console.log(this.authUser)
    console.log(this.user)
  },
  methods: {
    follow (userId) {
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
        .then((response) => {
          this.authUser.following.push({ _id: userId })
        })
    },
    unFollow (userId) {
      const token = localStorage.getItem('user-token')

      this.$axios
        .delete(`/users/unfollow/${userId}`, {
          headers: {
            'UserAuth': token
          }
        })
        .then((response) => {
          this.authUser.following = this.authUser.following.filter((u) => {
            return u._id !== userId
          })
        })
    }
  }
}
</script>
