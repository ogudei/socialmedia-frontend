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
    }
  }
}
</script>
