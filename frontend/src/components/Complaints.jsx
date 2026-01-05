import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../utils/api';
import ComplaintList from './ComplaintList';

const Complaints = () => {
    
    const[listofComplaints, setListofComplaints] = useState([]);

    const fetchComplaints = async () => {
        try{
            const data = await API.get(`url to fetch the complaints`);
            setListofComplaints(data.info);
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
            <button className='complaintButton'>Add</button>
            <p>List of complaints</p>
            {listofComplaints.map(complaint => <ComplaintList key={complaint.id}
          complaint={complaint}/>)}
        </div>
    );
};

export default Complaints;