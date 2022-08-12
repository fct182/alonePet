import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/petDetails/:id',
    name: 'PetDetails',
    component: () => import('../views/PetDetails/PetDetails.vue')
  },
  {
    path: '/userLocation',
    name: "UserLocation",
    component: () => import('../views/UserLocation/UserLocation.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search/Search.vue'),
    children: [
      {
        path: 'searchResult/:key',
        name: 'SearchResult',
        component: () => import('../views/Search/children/SearchResult.vue'),
      }
    ]
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me/Me.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('../views/Friends/Friends.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/editInfo/:id',
    name: 'EditInfo',
    props: true,
    component: () => import('../views/Me/children/EditInfo.vue'),
  },
  {
    path: '/editDetailInfo',
    name: 'EditDetailInfo',
    component: () => import('../views/Me/children/EditDetailInfo.vue'),
  },
  {
    path: '/feedRecord/:id',
    name: 'FeedRecord',
    component: () => import('../views/Me/children/FeedRecord.vue'),
  },
  {
    path: '/rescueRecord/:id',
    name: 'RescueRecord',
    component: () => import('../views/Me/children/RescueRecord.vue'),
  },
  {
    path: '/foundInfoRecord/:id',
    name: 'FoundInfoRecord',
    component: () => import('../views/Me/children/FoundInfoRecord.vue'),
  },
  {
    path: '/userSettings',
    name: 'UserSettings',
    component: () => import('../views/Me/children/UserSettings.vue'),
  },
  {
    path: '/publishZLInfo',
    name: 'PublishZLInfo',
    component: () => import('../views/PublishZLInfo/PublishZLInfo.vue'),
  },
  {
    path: '/toRescue/:id',
    name: 'ToRescue',
    component: () => import('../views/ToRescue/ToRescue.vue'),
  },
  {
    path: '/findPet',
    name: 'FindPet',
    component: () => import('../views/FindPet/FindPet.vue'),
  },
  {
    path: '/toAdopt/:id',
    name: 'ToAdopt',
    component: () => import('../views/ToAdopt/ToAdopt.vue'),
  },
  {
    path: '/toFeed/:id',
    name: 'ToFeed',
    component: () => import('../views/ToFeed/ToFeed.vue'),
  },
  {
    path: '/chatItemRoom/:id',
    name: 'ChatItemRoom',
    component: () => import('../views/Friends/children/ChatItemRoom.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
