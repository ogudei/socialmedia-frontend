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
              v-for="following in user.following"
              :key="following._id"
              :user="following"
              :type="'following'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserCard from '@/components/User/Profile/UserCard'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import profileMixin from '@/mixins/profileMixin'

export default {
  name: 'UsersFollowing',
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
    }
  }
}
</script>
