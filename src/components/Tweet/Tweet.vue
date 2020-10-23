<template>
    <div class="event">
        <div class="label">
            <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
        </div>
        <div class="content">
            <div class="summary">
                    {{ tweet.username }}
                    </div>
                                    <div class="title">
                    {{ tweet.title }}
                </div>
                                    <div class="extra text">
                    {{ tweet.post }}
                </div>

                <div class="date">
                    {{ tweet.createdAt | timeAgo }}
                </div>
                <button v-if="isOwner" class="ui basic button" @click="checked(tweet._id)">{{tweetStatus}}</button>
            </div>

        </div>
</template>

<script>
export default {
  name: 'Tweet',
  props: {
    tweet: {
      type: Object,
      required: true
    },
    isOwner: {
      type: Boolean
    }
  },
  data () {
    return {
      tweetStatus: ''
    }
  },
  created () {
    this.tweetStatus = this.tweet.status
  },
  methods: {
    checked (tweetId) {
      if (this.tweetStatus === 'private') {
        this.tweetStatus = 'public'
      } else if (this.tweetStatus === 'public') {
        this.tweetStatus = 'private'
      }
      this.$axios
        .post('/poststatuschanged', {
          tweetId: tweetId,
          status: this.tweetStatus
        }, {
          headers: {
            'UserAuth': localStorage.getItem('user-token')
          }})
        .then((response) => {
          if (response.data.isValid === 1) {
            this.tweetStatus = response.data.value.status
          }
          // save token in localstorage
        })
        .catch((error) => {
          // clear form inputs
          this.email = this.password = ''

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
