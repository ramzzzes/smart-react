import React from "react";
import { Input } from 'antd';

interface InputProps {
    name : string,
    value ?: string,
    method : React.Dispatch<React.SetStateAction<string>>;
}
const InputComponent: React.FC<InputProps> = ({name,value,method}) => {
    return <Input placeholder={name} value={value} onChange={(e) => method(e.target.value)} />
}

export default InputComponent
