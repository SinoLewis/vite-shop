import { defineStore, storeToRefs } from "pinia";
import { supabase } from '../server/supabase'
import type { Product } from "../types/product";
import type { UserDetails, UserForm } from "../types/user_details";
import type { Order } from "../types/order";
import type { Transaction } from "../types/transaction";
import type { Cart } from "../types/cart";
import type { ApiError } from "@supabase/supabase-js";
import { useToast } from 'vue-toast-notification';
import type { ToastProps } from 'vue-toast-notification';


const SELECTED_CART = 'LocalCart';
const $toast = useToast();

const toastBody: ToastProps = {
    position: 'top-right',
    duration: 10000
}

export const useShopStore = defineStore("shop", {
    state: () => ({

        // General Products
        user: {} as any,
        user_details: {} as UserDetails,
        products: [] as Product[],
        cart: {} as Cart,
        transaction: {} as Transaction,
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
        // TODO: State 4 notifications
        // notifications: [{type: 'error', msg: 'Your offline'}]
        // show_modal: false
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
        async signUpAction(user_form: UserForm) {
            try {
                const { error } = await supabase.auth.signUp({
                    email: user_form.email,
                    password: user_form.password,
                });
                if (error) throw error;
                $toast.success("You've been registered successfully", toastBody);
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
                console.log(error.error_description || error.message);
            }
        },
        async signInAction(user_form: UserForm) {
            try {
                const { error, user } = await supabase.auth.signIn({
                    email: user_form.email,
                    password: user_form.password,
                });
                if (error) throw error;
                $toast.success("You've Signed In successfully", toastBody);
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
                console.log(error.error_description || error.message);
            }
        },
        async signInTPS(user_form: UserForm, provider: any) {
            try {
                const { user, session, error } = await supabase.auth.signIn({
                    email: user_form.email,
                    password: user_form.password,
                    provider: provider,
                })
                if (error) throw error;
                $toast.success("You've been Signed In successfully", toastBody);
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
                console.log(error.error_description || error.message);
            }
        },
        async signOutAction() {
            try {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                $toast.success("You've been logged Out successfully", toastBody);
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
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
                $toast.success("Your User Details have been updated successfully", toastBody);
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
                console.log(error.error_description || error.message);
            }
        },
        /*  
            2. PRODUCT
         */

        async getProducts() {
            try {
                const { data, error } = await supabase.from('products').select()
                if (error) throw error
                this.products = await data
                console.log("Products state: ", await data);
                // return await data
            } catch (error: ApiError | any) {
                console.log(error.error_description || error.message)
                // return []
            }
        },
        getProductById(id: string): Product {
            if (this.products) {
                let product = this.products.find((product) => product.id === id)
                return Object.assign({}, product)
            } else return {} as Product
        },
        currentProduct(title: string): Product {
            if (this.products) {
                let product = this.products.find((product) => product.title === title)
                return Object.assign({}, product)
            } else return {} as Product
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
                } catch (error: ApiError | any) {
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
                } catch (error: ApiError | any) {
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
                console.log("Added Cart product", cart_product)
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
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
                console.log("Removed Cart product ", cart_product)
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
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
                console.log("Removed Cart products ", cart_product)
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
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
                console.log("Removed all Cart products")
            } catch (error: ApiError | any) {
                $toast.error(error.message, toastBody)
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