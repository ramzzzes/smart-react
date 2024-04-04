import React, { useState } from 'react'
import {Button, message} from "antd";
import axios from "axios";
import InputComponent from "../Input.tsx";
import {useNavigate} from "react-router-dom";

export const BACKEND_URL = 'http://localhost:8000';

function Login(): React.JSX.Element {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage();

    const navigation = useNavigate()
    const login = async () => {
        try{
            if (email === "" || password === "") {
                messageApi.open({
                    type: 'error',
                    content: "Please enter email and password",
                });
                return
            }

            const response = await axios.post(BACKEND_URL + '/user/login',{
                email,
                password
            })

            messageApi.open({
                type: 'success',
                content: 'You are authorized',
            });
            localStorage.setItem('token',response.data.token)
            navigation('/dashboard')

        }catch (e){

            messageApi.open({
                type: 'error',
                // @ts-ignore
                content: e.response.data?.message,
            });
        }

    }

    return (
        <>
            {contextHolder}
            <InputComponent name={'Email'} method={setEmail}/>
            <br/>
            <br/>
            <InputComponent name={'Password'} method={setPassword}/>
            <br/>
            <br/>
            <Button type="primary" onClick={login}>Login</Button>

        </>
    )
}

export default Login
