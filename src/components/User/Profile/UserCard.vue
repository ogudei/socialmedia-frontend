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
          <button
            class="ui tiny primary button"
            @click="unFollow(user._id)"
          >
            Unfollow
          </button>
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
    }
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
        })
    }
  }
}
</script>
