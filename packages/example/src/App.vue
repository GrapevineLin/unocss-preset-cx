<template>
 <div class="w-full h-full flex items-center justify-center flex-col bg-#fff text-blue hover:text-pink-400 ">
     hello unocss
     <div class="mt-20  at-720:text-red">
         at-720： 大于720 小于下一级
     </div>
     <div class="mt-20 720:text-red">
         720： 大于 720
     </div>
     <div class="mt-20 lt-720:text-red">
         lt-720： 小于 720
     </div>
     <div class="mt-20 720:lt-1080:text-red">
         720:lt-1080： 大于720 小于1080
     </div>
 </div>
</template>


