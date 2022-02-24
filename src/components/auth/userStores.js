import {derived, writable} from "svelte/store";
import axios from "axios";
import {backendURL} from "../stores";

const Auth = createAuthStore({});
const User = createUserStore({}, Auth);


function createUserStore(value, auth = writable()) {
    console.log("user init");
    const {subscribe, set, update} = writable(value);
    let content = JSON.parse(localStorage.getItem("User")) || {};
    set(JSON.parse(JSON.stringify(content)));
    subscribe(async (n) => {
        if (n && Object.keys(n).length && JSON.stringify(n) !== JSON.stringify(content)) {
            localStorage.setItem("User", JSON.stringify(n));
            let {data} = await axios.put(
                `${backendURL}/api/usersettings/`,
                n
            );
        }
        content = JSON.parse(JSON.stringify(n));
    })
    auth.subscribe(async (n) => {
        if (n && Object.keys(n).length) {
            if (!content || Object.keys(content).length === 0) {
                let {data} = await axios.get(`${backendURL}/api/usersettings/`);
                if (data) {
                    content = JSON.parse(JSON.stringify(data))
                    set(data);
                    localStorage.setItem("User", JSON.stringify(data));
                }
            }
        } else {
            set({})
            content = {};
        }
    })


    return {
        subscribe,
        set,
        update,
    }
}

function createAuthStore(value) {
    console.log("auth init")
    const {subscribe, set, update} = writable(value);
    let interceptor;
    set(JSON.parse(localStorage.getItem("Auth")) || {});

    subscribe((n) => {
        if (n) {
            if (new Date(n.expires) < new Date()) {
                console.log("logedout because login is to old");
                signout();
            }
        }
    });


    async function signin(login_data, callback = () => {
    }, fallback = () => {
    }) {
        if (!login_data?.password || !login_data?.username) return;
        let bodyFormData = new FormData();
        bodyFormData.append("username", login_data.username);
        bodyFormData.append("password", login_data.password);
        axios.post(
            `${backendURL}/api/token`,
            bodyFormData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic Og==",
                },
            }
        ).then((data) => {
                interceptor = axios.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = `Bearer ${data.data.access_token}`;
                        return config;
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );

                localStorage.setItem("Auth", JSON.stringify(data.data));

                set(data.data);
                callback()
                console.log(data)
            }
        ).catch((er) => {
            fallback(er)
        });
        if (status === 200) {

        }
    }

    function signout() {
        axios.interceptors.request.eject(interceptor);
        interceptor = undefined;
        localStorage.clear();
        update(() => {
            return {};
        });
    }

    async function register(login_data) {
        return new Promise(async (resolve, reject) => {
            axios.post(`${backendURL}/api/signup`, login_data).then(
                (response) => {
                    resolve(response);
                }
            ).catch((er) => {
                reject(er)
            })
        })
    }

    return {
        subscribe,
        set,
        update,
        signin,
        signout,
        register
    };
}


const loginStatus = derived(Auth, ($Auth, set) => {
    set(false)
    if ($Auth && Object.keys($Auth).length) {
        set(true)
    } else {
        set(false)
    }
})

export {Auth, User, loginStatus}