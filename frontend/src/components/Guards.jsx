import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Guards = () =>{
    useEffect(()=>{console.log("backend call for fetching the guards table")}, []);  //once we call the api remove one section
    return(
        <div className='top-container'>
          <section className='dayguardsection' style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
              <h3>Day Guard</h3>
              <p>optional pic</p>
              <p>nameofGuard</p>
              <p>phoneNumber</p>
          </section>
          <section className='nightguardsection' style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
              <h3>Night Guard</h3>
              <p>optional pic</p>
              <p>nameofGuard</p>
              <p>phoneNumber</p>
          </section>
        </div>
    )
}


export default Guards;