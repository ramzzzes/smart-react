import React, {useEffect, useState} from "react";
import InputComponent from "../Input.tsx";
import {Button, message} from "antd";
import axios from "axios";
import {BACKEND_URL} from "./Login.tsx";
import {DeleteFilled} from "@ant-design/icons";



interface Blog {
    id : string,
    name : string,
    description : string,
    author : string,
    created_at : string
}


function Dashboard(): React.JSX.Element {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage();

    const save = async () => {
        const token = localStorage.getItem('token')
       try{
           await axios.post(BACKEND_URL + '/blog/create',{
               name,
               description
           },{
               headers : {
                   Authorization : `Bearer ${token}`,
               }
           })
           await getBlogs()
           setName('')
           setDescription('')
           messageApi.open({
               type: 'success',
               content: 'Blog Added'
           });
       }catch (e){
           messageApi.open({
               type: 'error',
               content: e.response.data?.message,
           });
       }
    }

    const getBlogs = async () => {
       const token = localStorage.getItem('token')
       try{
           const response = await axios.get(BACKEND_URL + '/blog',{
               headers : {
                   Authorization : `Bearer ${token}`,
               }
           })
           setBlogs(response.data.data)
       }catch (e){
           messageApi.open({
               type: 'error',
               // @ts-ignore
               content: e.response.data?.message,
           });
       }
    }
    const checkUser = () => {
        if(localStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }

    const deleteBlog = async (id) => {
        const token = localStorage.getItem('token')
        try{
            await axios.delete(BACKEND_URL + `/blog/${id}/delete`,{
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            })
            await getBlogs()
            messageApi.open({
                type: 'success',
                content: 'Blog Deleted'
            });
        }catch (e){
            messageApi.open({
                type: 'error',
                content: e.response.data?.message,
            });
        }
    }

    useEffect(() => {
        checkUser()
        getBlogs()
    }, []);

    return <>
        {contextHolder}
        <ul>
            {blogs?.map((blog,key) => (
                <li key={key}>{blog.name}
                    <span onClick={() => deleteBlog(blog.id)}><DeleteFilled /></span>
                </li>
            ))}
        </ul>
        <InputComponent name={'name'} value={name} method={setName}/>
        <br/>
        <br/>
        <InputComponent name={'description'} value={description} method={setDescription}/>
        <br/>
        <br/>
        <Button type="primary" onClick={save}>Save</Button>

    </>
}

export default Dashboard
