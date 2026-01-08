


const ComplaintList = ({ complaintItem }) => {
    return (
        <div style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
            <label>
                <span style={{ padding: '10px 20px' }}>Title: </span>
               <p style={{ padding: '10px 20px' }} >{complaintItem.title}</p>
            </label>
            <label>
               <span style={{ padding: '10px 20px' }}>Description: </span>
               <p style={{ padding: '10px 20px' }} >{complaintItem.description}</p>
            </label>
            <label>
               <span style={{ padding: '10px 20px' }}>Category: </span>
               <p style={{ padding: '10px 20px' }} >{complaintItem.category}</p>
            </label>
            
        </div>
    )
}

export default ComplaintList;