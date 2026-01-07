import React, { useEffect, useState } from "react";
import API from "../utils/api";


const FlatsTable = () => {
    const [flats, setFlats] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedFlat, setSelectedFlat] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchFlats = async () => {
          try {
            const { data } = await API.get(`/flats?page=${page}&limit=10`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setFlats(data.flats || []);
            setTotalPages(data.totalPages);
          } catch (err) {
            console.error(err);
          }
        };
        fetchFlats();
    }, [page]);

    const handleClaimClick = (flat) => {
    setSelectedFlat(flat);
    setIsModalOpen(true);};  
  
    const confirmClaim = async () => {
        if (!selectedFlat) return;
        console.log(selectedFlat)
    
        try {
          await API.post(`/flats/claim/${selectedFlat._id}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          alert("Flat claimed successfully!");
          setFlats(flats.map(f => f._id === selectedFlat._id ? { ...f, owner: { name: "You" } } : f));
          setIsModalOpen(false);
          setSelectedFlat(null);
        } catch (err) {
          alert(err.response?.data?.message || "Error claiming flat");
        }
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Flats</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Flat No</th>
              <th className="border px-4 py-2">Block</th>
              <th className="border px-4 py-2">Owner</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {flats.map(flat => (
              <tr key={flat._id}>
                <td className="border px-4 py-2">{flat.flatNumber}</td>
                <td className="border px-4 py-2">{flat.block || "-"}</td>
                <td className="border px-4 py-2">
                  {flat.owner ? flat.owner.name : "Not claimed"}
                </td>
                <td className="border px-4 py-2">
                  {!flat.owner && (
                    <button
                    onClick={() => handleClaimClick(flat)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Claim
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
           <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>

           <span> Page {page} of {totalPages} </span>

           <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
        {/*pagination end*/}
        {/* Modal */}
        {isModalOpen && selectedFlat && (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{ background: "white", padding: "20px", borderRadius: "8px", width: "300px" }}>
            <h3>Confirm Flat Claim</h3>
            <p><strong>Flat No:</strong> {selectedFlat.flatNumber}</p>
            <p><strong>Block:</strong> {selectedFlat.block}</p>
            <p><strong>Floor:</strong> {selectedFlat.floor}</p>
            <p><strong>Status:</strong> {selectedFlat.status}</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <button onClick={confirmClaim} style={{ background: "green", color: "white", padding: "5px 10px", borderRadius: "8px", cursor: 'pointer' }}>Confirm</button>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "red", color: "white", padding: "5px 10px", borderRadius: "8px", cursor: 'pointer' }}>Cancel</button>
            </div>
            </div>
        </div>
        )}
      </div>
    );
}

export default FlatsTable;