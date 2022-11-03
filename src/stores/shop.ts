import { defineStore, storeToRefs } from "pinia";
import { supabase } from '../server/supabase'
import type { Product } from "../types/product";
import type { UserDetails } from "../types/user_details";
import type { Order } from "../types/order";
import type { Transaction } from "../types/transaction";
import type { Cart } from "../types/cart";
// import { User } from "@supabase/supabase-js";

const SELECTED_CART = 'LocalCart';

export const useShopStore = defineStore("shop", {
    state: () => ({

        // General Products
        user: {} as any,
        user_details: {} as UserDetails,
        products: [] as Product[],
        cart: {} as Cart,
        transaction: {} as Transaction,
        loading: true,
        current_product: {} as Product,

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
    }),
    getters: {
        authUser: (state) => {
            if (state.user) {
                return state.user['aud'] === 'authenticated' ? true : false
            } else {
                return false
            }
        },
        productQuantity: (state) => state.products ? Object.keys(state.products).length : {},
        categories: (state) => {
            let ctgs = ['Hoodies', 'Men\'s', 'Lady\s', 'Kid\'s', 'Jewellery', 'Shoals']
            let data: any = {}
            ctgs.forEach(ctg => {
                if (state.products) {
                    data[ctg] = state.products.filter(product => product.category === ctg)
                }
            })
            return data
        },
        cartQuantity: (state) => {
            if (state.cart.cart_products) {
                return state.cart.cart_products.length
            } else return 0
        },
        cartCheckout: (state) => {
            let index: any = {}
            if (state.cart.cart_products) {
                state.cart.cart_products.forEach((cid) => {
                    let items = state.cart.cart_products.filter(id => id === cid)
                    index[items[0]] = {
                        quantity: items.length,
                        id: items[0],
                    }
                })
            }
            return index
        },
        cartTotal: (state) => {
            let total = 0
            if (state.cart.cart_products) {
                state.cart.cart_products.forEach((id) => {
                    state.products.forEach((product) => {
                        if (product.id == id) {
                            total = product['price'] + total
                        }
                    })
                })
                return total
            } else return 0
        },
        /*  
            5. Transaction
         */
        // GET Mpesa Consumer Auth Key to env var
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
            } catch (error: any) {
                // TODO: push notification alert for error when signup
                console.log(error.error_description || error.message);
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
            } catch (error: any) {
                // TODO: push notification alert for error when sigin
                console.log(error.error_description || error.message);
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
            } catch (error: any) {
                // TODO: push notification alert for error when sign
                console.log(error.error_description || error.message);
            }
        },
        async signOutAction() {
            try {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                // TODO: push notification alert for succesful signout
                console.log("You've been logged Out successfully");
            } catch (error: any) {
                // TODO: push notification alert for error when signout
                console.log(error.error_description || error.message);
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
            } catch (error: any) {
                // TODO: push notification alert for error when user update
                console.log(error.error_description || error.message);
            }
        },
        /*  
            2. PRODUCT
         */

        async getProducts() {
            console.log('PINIA PINIA PINIA')
            try {
                const { data, error } = await supabase.from('products').select()
                if (error) throw error
                this.products = await data
                console.log("Products state: ", await data);
                // return await data
            } catch (error: any) {
                console.log(error.error_description || error.message)
                // return []
            }
        },
        getProductById(id: string) {
            if (this.products) {
                let product = this.products.find((product) => product.id === id)
                return Object.assign({}, product)
            }
        },
        currentProduct(title: string) {
            if (this.products) {
                let product = this.products.find((product) => product.title === title)
                return Object.assign({}, product)
            }
        },
        /*  
            3. CART
         */
        async getCart() {
            // TODO: switch instead of if to exec both blocks
            if (!localStorage.getItem(SELECTED_CART)) {
                try {
                    const { data, error } = await supabase
                        .from('carts')
                        // TODO: fk carts db cart_products
                        .insert({})
                    if (error) throw error
                    localStorage.setItem(SELECTED_CART, await data[0]['id'])
                    console.log('Setting new cart', await data[0]['id'])
                } catch (error: any) {
                    console.log(error.error_description || error.message);
                }
            }
            if (localStorage.getItem(SELECTED_CART)) {
                try {
                    const { data, error } = await supabase
                        .from('carts')
                        .select()
                        .eq('id', await localStorage.getItem(SELECTED_CART))
                    if (error) throw error
                    this.cart = await data[0]
                    // if(!this.cart.cart_products) this.cart.cart_products = data[0]['cart_products']
                    console.log('Getting cart', data[0])
                } catch (error: any) {
                    console.log(error.error_description || error.message);
                }
            }
        },
        inCart(product: Product) {
            if (this.cart.cart_products) {
                let inCart = this.cart.cart_products.find(id => id === product.id)
                return !!inCart
            } else {
                return false
            }
        },
        cartItems(cid: string) {
            if (this.cart.cart_products) {
                // let items = this.cart.cart_products.filter(id => id === cid)
                return this.cart.cart_products.filter(id => id === cid).length
            } else return 0
        },
        async addCartProduct(cart_product: Product) {
            try {
                this.cart.cart_products.push(cart_product.id)
                const { error } = await supabase
                    .from('carts')
                    // TODO: updated_at column
                    .upsert(this.cart)
                if (error) throw error;
                // TODO: push notification alert for succesful user update
                console.log("Added Cart product", cart_product)
            } catch (error: any) {
                // TODO: push notification alert for error when user update
                console.log(error.error_description || error.message);
            }
        },
        async removeCartProduct(cart_product: Product) {
            try {
                var index = this.cart.cart_products.findIndex(id => id === cart_product.id)
                if (index >= 0) {
                    this.cart.cart_products.splice(index, 1)
                }
                const { error } = await supabase
                    .from('carts')
                    .upsert(this.cart)
                if (error) throw error;
                // TODO: push notification alert for succesful user update
                console.log("Removed Cart product ", cart_product)
            } catch (error: any) {
                // TODO: push notification alert for error when user update
                console.log(error.error_description || error.message);
            }

        },
        async removeCartProducts(cart_product: Product) {
            try {
                this.cart.cart_products = this.cart.cart_products.filter(id => id !== cart_product.id)
                const { error } = await supabase
                    .from('carts')
                    .upsert(this.cart)
                if (error) throw error;
                // TODO: push notification alert for succesful user update
                console.log("Removed Cart products ", cart_product)
            } catch (error: any) {
                // TODO: push notification alert for error when user update
                console.log(error.error_description || error.message);
            }
        },
        async removeAllCartProducts() {
            try {
                this.cart.cart_products = []
                const { error } = await supabase
                    .from('carts')
                    .upsert(this.cart)
                if (error) throw error;
                // TODO: push notification alert for succesful user update
                console.log("Removed all Cart products")
            } catch (error: any) {
                // TODO: push notification alert for error when user update
                console.log(error.error_description || error.message);
            }

        },
        /*  
            5. Transaction
         */
        // POST method actions updating state
    },
});

export async function initShop() {
    const shop = useShopStore()
    shop.getProducts()
    shop.getCart()
}