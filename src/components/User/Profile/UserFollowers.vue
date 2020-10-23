<template>
  <div>
    <UserProfileHeader :user="user" :auth-user="authUser" :tweets-length="tweetsLength" />
    <div class="ui stackable grid container">
      <div class="four wide column">
        <UserProfileSidebarDetails :user="user" />
      </div>
      <div class="twelve wide column">
        <div class="ui segment">
          <div class="ui three column grid">
            <UserCard
              v-for="follower in user.followers"
              :key="follower._id"
              :user="follower"
              :type="'followers'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import UserCard from '@/components/User/Profile/UserCard'
import profileMixin from '@/mixins/profileMixin'

export default {
  name: 'UserFollowers',
  mixins: [profileMixin],
  components: {
    UserProfileHeader,
    UserCard,
    UserProfileSidebarDetails
  },
  data () {
    return {
      user: {},
      authUser: {},
      tweetsLength: 0
      // isFollowing: this.authUser.following.filter(x => this.authUser.followers.filter(y => y._id === x._id).length)
    }
  },
  methods: {
    userFollowed (payload) {
      this.isFollowing = 1
    }
  }
}

</script>
