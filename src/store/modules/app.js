import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium',
  theme: 'default',
  livenewsChannels: Cookies.get('livenewsChannels') || '[]',
  visitedViews: [],
  cachedViews: [] // 页面缓存
}

const mutations = {
  ADD_VISITED_VIEWS: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push({ title: view.meta.title, name: view.name, path: view.path, fullPath: view.fullPath, query: view.query, aoe: view.params })
    state.cachedViews.push(view.name)
  },
  DEL_VISITED_VIEWS: (state, view) => {
    let index
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        index = i
        break
      }
    }
    state.visitedViews.splice(index, 1)
  },
  DEL_CACHED_VIEW: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  CLEAN_VIEW: (state) => {
    state.visitedViews = []
    state.cachedViews = []
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
