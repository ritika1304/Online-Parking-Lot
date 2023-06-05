import axios from "axios"
import * as qs from "qs";
const BASE_URL = "http://localhost:7001/"
export const BASE_URL_IMG = "http://localhost:7001/"
class apiServices {
    login(data) {
        return axios.post(BASE_URL + "admin/loginuser", qs.stringify(data))
    }

    register(data) {
        return axios.post(BASE_URL + "user/addperson", qs.stringify(data))
    }
    
    viewparking(data) {
        return axios.post(BASE_URL + "user/showparking", qs.stringify(data))
    }
    
    viewslots(data) {
        return axios.post(BASE_URL + "user/showslots", qs.stringify(data))
    }
    
    addvehicle(data) {
        return axios.post(BASE_URL + "user/addvehicle", qs.stringify(data))
    }
    
    showvehicle(data) {
        return axios.post(BASE_URL + "user/showvehicle", qs.stringify(data))
    }
    
    addbooking(data) {
        return axios.post(BASE_URL + "user/addBooking", qs.stringify(data))
    }
    
    showbooking(data) {
        return axios.post(BASE_URL + "user/allBookings", qs.stringify(data))
    }
    
    managebooking(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/allBookings", qs.stringify(data),{ headers: header })
    }
    
    checkin(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/checkIn", qs.stringify(data),{ headers: header })
    }
    
    checkOut(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/checkOut", qs.stringify(data),{ headers: header })
    }

    getsingleParking(data) {
        return axios.post(BASE_URL + "user/fetchbyparkingid", qs.stringify(data))
    }
    
    dashboard(data) {
        // console.log(token)
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/dashboardAdmin", data, { headers: header })
    }
    addCity(data) {
        // console.log(token)
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/addcity", data, { headers: header })
    }
    allCity(data) {
        // console.log(token)
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/showcity", data)
    }
    getSingleCity(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/fetchcitybyid", data, { headers: header })
    }
    updateCity(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/updatecity", data, { headers: header })
    }
    addParking(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/addparking", data, { headers: header })
    }
    allParking(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/showparking", data, { headers: header })
    }
    updateParking(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/updateparking", data, { headers: header })
    }
    singleParking(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/fetchbyid", data, { headers: header })
    }
    deleteParking(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/deleteparking", data, { headers: header })
    }
    addSlot(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/addslots", data, { headers: header })
    }
    allSlot(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/showslots", data, { headers: header })
    }
    deleteSlot(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/deleteslots", data, { headers: header })
    }
    updateSlot(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/updateslots", data, { headers: header })
    }
    singleSlot(data) {
        let header = {
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL + "admin/fetchslotbyid", data, { headers: header })
    }
}
export default new apiServices;