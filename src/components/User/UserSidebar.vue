<template>
  <div>
    <div class="ui attached segment">
      <form class="ui form" @submit.prevent="postTweet">
        <div class="field">
          <textarea
            name="tweetTitle"
            v-model="title"
            placeholder="Başlık"
            rows="1"
          ></textarea>
        </div>
        <div class="field">
          <textarea
            name="tweet"
            v-model="tweet"
            rows="3"
            placeholder="Tweetle"
          ></textarea>
        </div>
        <button class="ui button fluid primary" :disabled="!isFormValid">
          Tweet
        </button>
      </form>
    </div>
    <div class="ui bottom attached menu">
      <router-link class="item" to="/">
        <i class="home icon"></i>
      </router-link>
      <router-link class="item" :to="`/${user.username}`">Profile</router-link>
      <router-link class="item" to="/settings/profile">Settings</router-link>
      <a class="item" @click="logout">
        <i class="sign out icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
import EventBus from '@/eventBus'

export default {
  name: 'UserSidebar',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: '',
      title: ''
    }
  },

  methods: {
    postTweet () {
      const token = localStorage.getItem('user-token')

      this.$axios
        .post(
          '/createpost',
          { post: this.tweet, title: this.title },
          {
            headers: {
              'UserAuth': token
            }
          }
        )
        .then((response) => {
          // fire an event to the event bus
          EventBus.$emit('tweetAdded', response.data.value)

          // clear input field
          this.tweet = ''
        })
    },
    logout () {
      localStorage.removeItem('user-token')

      this.$router.push('/login')
    }
  },
  computed: {
    isFormValid () {
      return !!this.tweet
    }
  }
}
</script>
