import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import API from '../service/API';

export function useDashboard() {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm , setSearchTerm] = useState('')
  const [selectedBrand,setSelectedBrand] = useState('')
  const navigate = useNavigate();

  const fetchMobiles = async () => {
    setLoading(true);
    try {
      const response = await API.get('/mobiles');
      if (Array.isArray(response.data)) {
        setMobiles(response.data);
      } else {
        setMobiles([]);
      }
    } catch (error) {
      console.error("Data fetch karne me error:", error);
      setMobiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Kya aap is mobile ko delete karna chahte hain?")) {
      try {
        await API.delete(`/mobiles/${id}`);
        alert("Mobile deleted!");
        fetchMobiles(); 
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchMobiles();
  }, []);

 const totalProducts = mobiles.length;
 const totalStock = mobiles.reduce((sum,item)=> sum + Number(item.stock || 0),0)
 const outOfStock = mobiles.filter(item=> Number(item.stock || 0)===0).length


 const uniqueBrands = [...new Set(mobiles.map(m => m.brand))].filter(Boolean);
 
 const filteredMobiles = mobiles.filter(mobile =>{
  const matchSearch = (mobile.brand || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
  (mobile.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  const matchBrand = selectedBrand === "" || mobile.brand === selectedBrand;
  return matchSearch && matchBrand;
 }) 
  return {
    mobiles:filteredMobiles,
    loading,
    handleDelete,
    uniqueBrands,
    searchTerm,setSearchTerm,
    selectedBrand,setSelectedBrand,
    stats:{totalProducts,totalStock,outOfStock},
    navigateToAdd: () => navigate('/admin/add')
  };
}
