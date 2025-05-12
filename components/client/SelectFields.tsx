import { useEffect, useState } from "react";
import { getCategories } from "@/services/categories";
import { CustomSelect } from "../CustomSelect";


export const CategorySelect = ({ value, onChange }:
    {value: string, onChange: (value: string) => void}) => {
        
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function getCategoriesAPI(){
            const response = await getCategories({});            
            if(response.status === 200){
                setOptions(response.data.categories)
            }
        }
        getCategoriesAPI();
    },[]);
    

    return (
        <CustomSelect
            value={value}
            onChange={onChange}
            options={options}
            valueKey={'_id'}
            labelKey={'name'}
            placeholder="Select a category"
        />
    );
};

export const ApiMethodSelect = ({ value, onChange }:
    {value?: string, onChange?: (value: string) => void}) => {
    
    const options = ["GET", "POST", "PUT", "DELETE"].map((method) => ({
        value: method,
        label: method,
    }));

    return (
        <CustomSelect
            value={value ? value : ''}
            onChange={onChange ? onChange : () => console.log('hhhhh')}
            options={options}
            placeholder="Select a method"
        />
    );
};