import { defineStore } from "pinia";
import { supabase } from '../server/supabase'
import axios from "axios";
import type { Product } from "../types/product";
import type { UserDetails } from "../types/user_details";
import type { Order } from "../types/order";
import type { Transaction } from "../types/transaction";
import type { Cart } from "../types/cart";
// import { User } from "@supabase/supabase-js";

export const useShopStore = defineStore("shop", {
    state: () => {
        const user = {} as any
        const user_details = {} as UserDetails
        const products = [] as Product[]
        const cart = { status: 'Cart', cart_products: [] as Product[] } as Cart
        const transaction = {} as Transaction

        return {
            // General Products
            user,
            user_details,
            products,
            cart,
            transaction

            // fav_Products: [] as Product[],

            // Order Products
            // orders: [] as Order[],
            // current_order: {} as Order,
            // order_products: [] as OrderProduct[],

            // // User's orders (Transactions)
            // transactions: [] as Transaction[],
            // current_transaction: {} as Transaction

            // Miscelenous
            // showModal: false
            // showPopupCart: false
        }
    },
    getters: {
        getUser: async (state) => {
            try {
                // TODO set jwt token in dotenv
                const { user, error } = await supabase.auth.api.getUser('ACCESS_TOKEN_JWT')
                if (error) console.log('User state Error:', error);
                state.user = { ...user }
                // TODO: push notification alert for succesful user                
                console.log("User state: ", state.user);

                // TODO: 2. Update user details state to user metadata
                // if this.user_details
                // this.user_details = { ...this.user_details, email: this.user.email, created_on: this.user.email_confirmed_at, last_login: this.user.email_confirmed_at }
                // ? create DB for Users Details to update

            } catch (error: any) {
                // TODO: push notification alert for error when getting user
                console.log(error.error_description || error.message);
            }
        },
        isLoggedIn: (state) => {
            return state.user.aud === 'authenticated' ? true : false
        },
        getProducts: async (state) => {
            try {
                const { data, error } = await supabase.from('products').select()
                if (error) throw error
                console.log("Products state: ", state.products);
                state.products = data
            } catch (error: any) {
                console.log(error.error_description || error.message)
            }
        },
        productById: (state) => (id: Product["id"]) => {
            if (state.products) {
                return state.products.find((product) => product.id === id);
            }
        },
        // getCartProducts

        // cartTotal: (state) => {
        //     var total = 0
        //     state.cart.cart_products.forEach(item => total += item.price)
        //     return total
        // getCartProducts: async (state) => {
        //     if (process.client) {
        //         state.cart.cart_products = [] = JSON.parse(localStorage.shop).cart.cart_products
        //     }
        // },
        // },
        cartQuantity: (state) => {
            if (state.cart.cart_products) {
                return state.cart.cart_products.length
            }
        },
        /*  
            5. Transaction
         */
        // GET Mpesa Consumer Auth Key to env var
        // getAuth: async (state) => {
        //     // await fetch request
        //     const headers = {
        //         "Authorization": 'Basic SGQzVnpYMEtLMkdrU0QwUW1wQkE2TW1SeFdSREdlQVU6cEpGR2JoZWM5U2VqaGx3ZA',
        //         "Access-Control-Allow-Origin" : '*'
        //     }
        //     await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', { headers })
        //         // promise response updating state
        //         .then((response) => { console.log('Type of response', typeof (response), response) })
        // }

        // POST Make an Account Balance query
        // POST Initiate a Lipa na M-Pesa Online Payment
        // POST Query the status of a Lipa na M-Pesa Online Payment
        // POST Reverse an M-Pesa Transaction
    },
    actions: {
        /*  
            1. User
         */
        async signUpAction(user_form: any) {
            try {
                const { error } = await supabase.auth.signUp({
                    email: user_form.email,
                    password: user_form.password,
                });
                if (error) throw error;
                // TODO: push notification alert for succesful signup
                console.log("You've been registered successfully");
                return true
            } catch (error: any) {
                // TODO: push notification alert for error when signup
                console.log(error.error_description || error.message);
                return false
            }
        },
        async signInAction(user_form: any) {
            try {
                const { error, user } = await supabase.auth.signIn({
                    email: user_form.email,
                    password: user_form.password,
                });
                if (error) throw error;
                // TODO: push notification alert for succesful sigin
                console.log("You've Signed In successfully");
                this.user = user
                return true
            } catch (error: any) {
                // TODO: push notification alert for error when sigin
                console.log(error.error_description || error.message);
                return false
            }
        },
        async signInTPS(user_form: any, provider: any) {
            try {
                const { user, session, error } = await supabase.auth.signIn({
                    email: user_form.email,
                    password: user_form.password,
                    provider: provider,
                })
                if (error) throw error;
                // TODO: push notification alert for succesful 3rd party signin
                console.log("You've been Signed In successfully");
                this.user = {}
                
                return true
            } catch (error: any) {
                // TODO: push notification alert for error when sign
                console.log(error.error_description || error.message);
                return false
            }
        },
        async signOutAction() {
            try {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                // TODO: push notification alert for succesful signout
                console.log("You've been logged Out successfully");
                this.user = {}
                return true
            } catch (error: any) {
                // TODO: push notification alert for error when signout
                console.log(error.error_description || error.message);
                return false
            }
        },
        async updateUserDetails(user_form: UserDetails) {
            try {
                // TODO: update state user_details from form using ... to fill opts
                this.user_details = { ...user_form }
                // or update db in users_details
                const { error } = await supabase.auth.update({
                    data: this.user_details,
                })
                if (error) throw error;
                // TODO: push notification alert for succesful user update
                console.log("Your User Details have been updated successfully");
                return true
            } catch (error: any) {
                // TODO: push notification alert for error when user update
                console.log(error.error_description || error.message);
                return false
            }
        },
        /*  
            2. PRODUCT
         */

        /*  
            3. CART
         */
        async addCartProduct(cart_product: Product) {
            // update supabse carts db
            this.cart.cart_products.push(cart_product)
            console.log("Added Cart product", cart_product)
        },
        async removeCartProduct(cart_product: Product) {
            var index = this.cart.cart_products.findIndex(index => index.id === cart_product.id)
            if (index >= 0) {
                this.cart.cart_products.splice(index, 1)
            }
            console.log("Removed Cart product ", cart_product)
        },
        async removeCartProducts(cart_product: Product) {
            // update supabse carts db
            this.cart.cart_products = this.cart.cart_products.filter(item => item.id !== cart_product.id)
            console.log("Removed Cart products ", cart_product)
        },
        async removeAllCartProducts() {
            // update supabse carts db
            this.cart.cart_products = []
            console.log("Removed all Cart products")
        },
        /*  
            5. Transaction
         */
        // POST method actions updating state
    },
});
