import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import ComplaintList from './ComplaintList';

const Complaints = () => {
    
    const [listofComplaints, setListofComplaints] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('other');

    const addNewComplaint = async (e) => {
        try
        {
            e.preventDefault();
            const data = await API.post("/complaints", { title, description, category }); //change
            alert("Complaint was Raised")
        }
        catch (err){
            console.error(err);
        }
    }
    const fetchComplaints = async () => {
        try{
            const response = await API.get("/complaints");
            console.log('fetching details from server')
            console.log(response.data);
            setListofComplaints(response.data);
        }
        catch (err){
             console.error(err);
        }
    }

    useEffect(() =>{
        fetchComplaints();
    }, [])

    return(
        <div>
            <p>This is complaints page</p>
            <form onSubmit={addNewComplaint}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} />
                <label>category</label>
                <select value={category} onChange={(e) => {setCategory(e.target.value)}}>
                    <option value="Lift">Lift</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Security">Security</option>
                    <option value="Other">Other</option>
                </select>
                <button className='complaintButton' type='submit'>submit</button>
            </form>            
            <p>List of complaints</p>
            {listofComplaints.map(eachComplaint => {return (<ComplaintList key={eachComplaint._id} complaintItem={eachComplaint}/>)})}
        </div>
    );
};

export default Complaints;