<template>
  <div class="column">
    <div class="ui card">
      <div class="content">
        <img
          class="right floated mini ui image"
          src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"
        />
        <div class="header">
          {{ user.username }}
        </div>
        <div class="meta">
          {{ `@${user.username}` }}
        </div>
        <div v-if="type === 'following'">
          <button
            class="ui tiny primary button"
            @click="unFollow(user._id)"
          >
            Unfollow
          </button>
        </div>

          <div v-if="type === 'followers'">
          <button v-show="isFollowing === 0"
            class="ui tiny primary button"
            @click="follow(user._id)"
          >
            Follow
          </button>
          <span v-show="isFollowing > 0"> following </span>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
    // isFollowing: {
    //   type: Number,
    //   required: true
    // }
  },
  methods: {
    unFollow (userId) {
      const token = localStorage.getItem('user-token')

      this.$axios
        .post('unfollow', {userId: userId}, {
          headers: {
            'UserAuth': token
          }
        })
        .then((response) => {
          this.authUser.following = this.authUser.following.filter((u) => {
            return u._id !== userId
          })
          let index = this.authUser.following.findIndex(user => user._id === userId)
          this.authUser.following.splice(index, 1)
        })
    },
    follow (userId) {
      const token = localStorage.getItem('user-token')

      this.$axios
        .post('follow', {userId: userId}, {
          headers: {
            'UserAuth': token
          }
        })
        .then((response) => {
          this.authUser.followers = this.authUser.following.filter((u) => {
            return u._id !== userId
          })
          this.$emit('userFollowed', { message: 'user followed' })
        })
    }
  },
  computed: {
    typeComputed () {
      return this.type
    }
  }
}
</script>
