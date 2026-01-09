import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import API from '../utils/api';

const Profile = () =>{
    const userData = JSON.parse(localStorage.getItem('user'));
    const [flats, setFlats] = useState([]);
    const getFlatDetails = async () => {
        try
        {
            const response = await API.get('/flats/me');
            console.log("**********")
            console.log(typeof response.data);
            setFlats(response.data);
        }
        catch (err)
        {
            console.error(err);
        }
    }
    useEffect(() =>{
        getFlatDetails();
    }, []);
    return(
        <div>
            <p>Name: {userData?.user?.name}</p>
            <p>Email: {userData?.user?.email}</p>
            <p>Phone: {userData?.user?.phone}</p>
            <div>
                <h3>Flat(s) Owned</h3>
                {flats.map((flat) =>
                    (
                        <div key = {flat._id}>
                            <p>Flat Number: {flat.flatNumber}</p>
                            <p>Floor: {flat.floor}</p>
                            <p>Block: {flat.block}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}


export default Profile;