import React, { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import toast, {Toaster} from 'react-hot-toast';
import axiosInstance from '../axiosConfig';
import { PinData } from "./PinContext";


const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false)

    async function registerUser(name, email, password, navigate, fetchPins ) {
        setBtnLoading(true);
        try {
            const { data } = await axiosInstance.post("/api/user/register/", {name, email, password});
            console.log(data)
            setUser(data.user);
            setIsAuth(true);
            toast.success("Log In Successfull");
            setBtnLoading(false);
            navigate("/");
            fetchPins();
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    async function loginUser(email, password, navigate, fetchPins) {
        setBtnLoading(true);
        try {
            const { data } = await axiosInstance.post("/api/user/login/", {email, password});
            console.log(data)
            setUser(data.user);
            setIsAuth(true);
            toast.success("Log In Successfull");
            setBtnLoading(false);
            navigate("/");
            fetchPins();
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }
    const [loading, setLoading] = useState(true)
    async function fetchUser(){
        try {
            const {data} = await axiosInstance.get("/api/user/me");

            setUser(data);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            console.log(error);   
            setLoading(false);
        }
    }
    async function followUser(id, fetchUser){
        try {
            const {data} = await axiosInstance.post("/api/user/follow/" + id);

            toast.success(data.message);
            fetchUser();
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }
    useEffect(() => {
      fetchUser();
    }, [])
    
    return (
        <UserContext.Provider value={{loginUser, btnLoading, isAuth, user, loading, registerUser, setIsAuth, setUser, followUser}}>
          {children}
        </UserContext.Provider>
      );
    };


export const UserData = () => useContext(UserContext);