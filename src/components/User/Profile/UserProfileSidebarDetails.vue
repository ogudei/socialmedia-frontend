<template>
    <div>
        <router-link class="ui button mini primary" to="/">Back Home</router-link>
        <div class="ui segment">
            <h2 class="ui medium header">
                <router-link :to="`/${user._id}`">{{ user.username }}</router-link>
                <div class="sub header">
                    <router-link :to="`/${user._id}`">{{ `@${user.username}` }}</router-link>
                </div>
            </h2>

            <p v-show="user.bio">{{ user.bio }}</p>

            <div class="ui list">
                <div class="item" v-show="user.location">
                    <i class="marker icon"></i>
                    <div class="content">
                        {{ user.location }}
                    </div>
                </div>
                <div class="item" v-show="user.createdAt">
                    <i class="calendar icon"></i>
                    <div class="content">
                        Joined {{ user.createdAt | joined }}
                    </div>
                </div>
                <div class="item" v-show="user.dob">
                    <i class="birthday icon"></i>
                    <div class="content">
                        {{ user.dob | dob }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserProfileSidebarDetails',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
