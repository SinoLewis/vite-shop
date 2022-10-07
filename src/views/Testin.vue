<template>
    <div>
        <p>Testin 1212</p>
    </div>
</template>
  
<script setup lang="ts">

</script>
  
  <!-- 
  
  a) ais-instant-search
  
  b) ais-search-box
  
  c) ais-hits
  
  d) ais-configure
  
  e) ais-highlight
  
  f) ais-snippet
  
  
  import { auth } from "~/server/mpesa";
  
  if (process.client) {
      auth()
  }
  // import { token, settings } from "~/server/sendy";
  // const payload = {
  //     "email": "scottwest742@gmail.com",
  //     "password": "n~&o.7s#\"@_.lP4FbHp("
  // }
  // const token_val = token(payload).then((response) => response.data['token'])
  
  // token_val.then((token) => { settings(token).then((response) => console.log(response)) })
  // const settings_val = ref()
  
  // console.log(settings_val.value)
  
  // console.log(token(payload))
  
  // function routeGuard() {
  //     const router = useRouter()
  //     const route = useRoute()
  //     function authGuard(to: any, from: any, next: any) {
  //         var isAuthenticated = JSON.stringify(user.value) === '{}' ? false : true;
  //         if (!isAuthenticated) {
  //             router.push('/login/sigin')
  //         }
  //     }
  //     //TODO: authGuard to redirect logged user from /signin or sigup
  //     //TODO: redolve pages compo naming error (if trully needed)
  //     const routes = [{
  //         path: "/checkout/delivery",
  //         // name: "delivery",
  //         beforeEnter: authGuard,
  //         component: Delivery,
  //     }, {
  //         path: "/checkout/payment",
  //         // name: "payment",
  //         beforeEnter: authGuard,
  //         component: Payment,
  //     },
  //     {
  //         path: "/checkout/order",
  //         // name: "order",
  //         beforeEnter: authGuard,
  //         component: Order,
  //     }]
  
  //     // TODO: error that redirects to this guarded routes
  //     // router.addRoute()
  //     // routes.forEach((route) => router.addRoute(route))
  //     router.beforeEach(async (to, from) => {
  //         var isAuthenticated = JSON.stringify(user.value) === '{}' ? false : true;
  //         console.log('delivery here')
  //         if (
  //             // make sure the user is authenticated
  //             !isAuthenticated &&
  //             // ❗️ Avoid an infinite redirect
  //             to.path === '/checkout/delivery'
  //         ) {
  //             // redirect the user to the login page
  //             return router.push('/')
  //         }
  //     })
  // }
  -->
  
  