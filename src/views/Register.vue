
// Register.vue
<template>
 <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   <div class="sm:mx-auto sm:w-full sm:max-w-md">
     <h2 class="text-center text-3xl font-bold text-gray-900">Register</h2>
   </div>

   <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
     <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
       <form @submit.prevent="handleSubmit" class="space-y-6">
         <div>
           <label class="block text-sm font-medium text-gray-700">Name</label>
           <input 
             type="text" 
             v-model="form.name" 
             required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
           >
         </div>

         <div>
           <label class="block text-sm font-medium text-gray-700">Email</label>
           <input 
             type="email" 
             v-model="form.email" 
             required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
           >
         </div>

         <div>
           <label class="block text-sm font-medium text-gray-700">Password</label>
           <input 
             type="password" 
             v-model="form.password" 
             required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
           >
         </div>

         <div>
           <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
           <input 
             type="password" 
             v-model="form.password_confirmation" 
             required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
           >
         </div>

         <div v-if="error" class="text-red-500 text-sm">
           {{ error }}
         </div>

         <div>
           <button 
             type="submit"
             class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
           >
             Register
           </button>
         </div>
       </form>

       <div class="mt-6">
         <router-link 
           to="/login"
           class="text-center block text-sm text-blue-600 hover:text-blue-500"
         >
           Already have an account? Login
         </router-link>
       </div>
     </div>
   </div>
 </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const error = ref('')

const form = reactive({
 name: '',
 email: '',
 password: '',
 password_confirmation: ''
})

const handleSubmit = async () => {
 if (form.password !== form.password_confirmation) {
   error.value = 'Passwords do not match'
   return
 }

 try {
   await authStore.register(form)
   router.push('/comics')
 } catch (err) {
   error.value = 'Registration failed'
 }
}
</script>