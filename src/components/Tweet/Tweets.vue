<template>
  <div class="ui feed">
    <Tweet v-for="tweet in tweets" :is-owner="isOwner" :key="tweet.id" :tweet="tweet" />
  </div>
</template>

<script>
import Tweet from '@/components/Tweet/Tweet'
import EventBus from '@/eventBus'

export default {
  name: 'Tweets',
  components: {
    Tweet
  },
  created () {
    // listen for event fired
    EventBus.$on('tweetAdded', this.fetchAddedTweet)
  },
  methods: {
    fetchAddedTweet (tweet) {
      // add tweet to top of tweets
      this.tweets.unshift(tweet)
    }
  },
  props: {
    tweets: {
      type: Array,
      required: true
    },
    isOwner: {type: Boolean}
  }
}
</script>
