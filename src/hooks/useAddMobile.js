import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import API from '../service/API';

export function useAddMobile() {
  const {id} = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
   name: '',
    brand: '',
    price: '',
    stock: '',
    ram: '',
    storage: '',
    camera: '',
    battery: '',
    image: '',
    description: ''
  });

useEffect(()=>{
  const fetchmobileData = async()=>{
    setLoading(true)
    try{
    const response = await API.get(`/mobiles/${id}`)
    setFormData(response.data)
    }catch(error){
      console.log('mobile data fetch me error',error)
      navigate('/admin')
    }finally{
      setLoading(false)
    }
  }
  if(isEditMode){
    fetchmobileData()
  }
},[id,isEditMode,navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    if(isEditMode){
     await API.put(`/mobiles/${id}`,formData)

     alert('mobile successfully update')
    }else{
     await API.post(`mobiles`,formData)
     alert('New Mobile Add successfull')
    }
    navigate('/admin')
    } catch (error) {
      console.error("Mobile add karne me galti hui:", error);
      alert('Kuch galti hui, data save nahi ho paya.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    isEditMode,
    handleChange,
    handleSubmit,
    handleBack: () => navigate('/admin')
  };
}
