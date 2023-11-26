import axios from "axios";
import {googleLogout, TokenResponse} from "@react-oauth/google";

// userProfileKey stores the access token and expiration from Google OAuth.
const userProfileKey = '_profile'

function loadUserProfile(): TokenResponse | undefined {
    const data = localStorage.getItem(userProfileKey)
    if (!data) return
    return JSON.parse(data)
}

function saveUserProfile(data: TokenResponse) {
    localStorage.setItem(userProfileKey, JSON.stringify(data))
}

function clearUserProfile() {
    localStorage.clear()
}

async function parseToken() {
    const localProfile = loadUserProfile()
    if (!localProfile) throw new Error("no token found")
    const path = "https://www.googleapis.com/oauth2/v1/userinfo"
    const res = await axios.get(`${path}?access_token=${localProfile.access_token}`,
        {
            headers: {
                Authorization: `Bearer ${localProfile.access_token}`,
                Accept: 'application/json'
            }
        })
    const {data} = res
    return data
}

function logout() {
    googleLogout();
    clearUserProfile()
}


export {
    clearUserProfile,
    loadUserProfile,
    logout,
    parseToken,
    saveUserProfile,
}