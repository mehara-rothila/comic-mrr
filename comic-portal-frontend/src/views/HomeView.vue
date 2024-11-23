<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Debug section -->
    <div class="bg-yellow-100 p-2 text-sm" v-if="true">
      Auth Status: {{ authStore.isAuthenticated ? 'Logged In' : 'Not Logged In' }}
      <br>Token: {{ authStore.token ? 'Present' : 'None' }}
    </div>

    <!-- Header/Navigation -->
    <nav class="bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo & Brand -->
          <div class="flex items-center">
            <div class="text-2xl font-bold text-white">
              <router-link to="/" class="text-blue-500">Comic<span class="text-white">Portal</span></router-link>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex space-x-8">
            <router-link to="/" class="text-gray-300 hover:text-white">Home</router-link>
            <div class="relative group">
              <button class="text-gray-300 hover:text-white">
                Categories
                <span class="ml-1">▼</span>
              </button>
              <div class="absolute z-10 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1">
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Action</a>
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Fantasy</a>
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Manga</a>
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Superhero</a>
              </div>
            </div>
            <a href="#" class="text-gray-300 hover:text-white">Bestsellers</a>
            <a href="#" class="text-gray-300 hover:text-white">New Arrivals</a>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <template v-if="!authStore.isAuthenticated">
              <router-link 
                to="/login" 
                class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Login
              </router-link>
              <router-link 
                to="/register" 
                class="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
              >
                Register
              </router-link>
            </template>
            <template v-else>
              <router-link 
                to="/comics" 
                class="text-gray-300 hover:text-white"
              >
                My Comics
              </router-link>
              <button 
                @click="handleLogout" 
                class="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative h-[500px]">
      <Carousel
        :items-to-show="1"
        :wrap-around="true"
        :autoplay="3000"
        class="h-full"
      >
        <!-- Slide 1 -->
        <Slide class="h-full">
          <div class="h-full relative">
            <img 
              src="https://via.placeholder.com/1920x500" 
              alt="Popular Comics"
              class="w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div class="text-center text-white">
                <h1 class="text-5xl font-bold mb-4">Discover Amazing Comics</h1>
                <p class="text-xl mb-8">Explore our vast collection of comic books</p>
                <div class="space-x-4">
                  <router-link 
                    to="/comics" 
                    class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Browse Comics
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        <!-- Slide 2 -->
        <Slide class="h-full">
          <div class="h-full relative">
            <img 
              :src="carouselImage"
              alt="Special Offer"
              class="w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div class="text-center text-white">
                <h2 class="text-5xl font-bold mb-4">Latest Releases</h2>
                <p class="text-xl mb-8">Check out our newest additions</p>
                <router-link 
                  to="/comics" 
                  class="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  View Collection
                </router-link>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>

    <!-- Featured Comics Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-center mb-8">Featured Comics</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://via.placeholder.com/300x400" 
            alt="Comic Cover"
            class="w-full h-48 object-cover"
          >
          <div class="p-4">
            <h3 class="text-lg font-semibold">Comic Title {{ i }}</h3>
            <p class="text-gray-600 text-sm mb-2">Author Name</p>
            <div class="flex justify-between items-center">
              <span class="text-blue-600 font-bold">$19.99</span>
              <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-white font-bold text-lg mb-4">About Us</h3>
            <p class="text-sm">Your ultimate destination for comics and graphic novels.</p>
          </div>
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/" class="hover:text-white">Home</router-link></li>
              <li><router-link to="/comics" class="hover:text-white">Comics</router-link></li>
              <li><a href="#" class="hover:text-white">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Contact</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white">Contact Us</a></li>
              <li><a href="#" class="hover:text-white">FAQs</a></li>
              <li><a href="#" class="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Follow Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="hover:text-white">Facebook</a>
              <a href="#" class="hover:text-white">Twitter</a>
              <a href="#" class="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 Comic Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { onMounted } from 'vue'
// Import the carousel image
import carouselImage from '../assets/wallpaperflare.com_wallpapers (1).jpg'

const router = useRouter()
const authStore = useAuthStore()

// Debug logging on component mount
onMounted(() => {
  console.log('Auth state:', {
    isAuthenticated: authStore.isAuthenticated,
    hasToken: !!authStore.token,
    tokenValue: authStore.token
  })
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
.carousel__slide {
  height: 100%;
}

.carousel__viewport {
  height: 100%;
}

.carousel__track {
  height: 100%;
}
</style>