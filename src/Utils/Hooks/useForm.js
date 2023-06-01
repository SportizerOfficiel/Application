import React from "react";
import {useRef } from "react";

const useForm = (FormAction)=>{
const FormRef = useRef(null)
    
const handleSubmit = (event) => {
  if (!event) {
    event = { preventDefault: () => {}, target: FormRef.current };
  }
  event.preventDefault();
  const formData = new FormData(event.target);

  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  FormAction(data)
}

  const resetForm = () => {
      FormRef.current.reset()
  }
  return [FormRef,handleSubmit, resetForm];
}

export default useForm;