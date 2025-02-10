import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";


const PlanningTable = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({
    id: "",
    name: '',
    department: '',
    position: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    shiftType: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [planningData, setPlanningData] = useState({
    id: "",
    employeeId: "",
    employeeName: "",
    department: "",
    position: "",
    schedule: [
      {
        date: "",
        startTime: "",
        endTime: "",
        breaks: [
          {
            startTime: "",
            endTime: "",
          },
        ],
        location: "",
        shiftType: "",
        status: "",
      },
    ],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/plannings/all/1234frazzrgg5")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.result);
        setFilteredData(data.result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


  const handleAddPlanning = () => {
    setIsEditing(false);
    setModalOpen(true);
    // setPlanningData({
    //   id: "",
    //   employeeId: "",
    //   employeeName: "",
    //   department: "",
    //   position: "",
    //   schedule: [
    //     {
    //       date: "",
    //       startTime: "",
    //       endTime: "",
    //       breaks: [{ startTime: "", endTime: "" }],
    //       location: "",
    //       shiftType: "",
    //       status: "",
    //     },
    //   ],
    // });
document.location.href = '/presences'
  };

  const handleEditPlanning = (employee) => {
    setIsEditing(true);
    setModalOpen(true);
    setPlanningData(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanningData({
      ...planningData,
      [name]: value,
    });
  };

  const handleScheduleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSchedule = [...planningData.schedule];
    updatedSchedule[index][name] = value;
    setPlanningData({ ...planningData, schedule: updatedSchedule });
  };

  const handleSavePlanning = () => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3000/plannings/${planningData.id}`
      : "http://localhost:3000/plannings";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planningData),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.result);
        setFilteredData(data.result);
        setModalOpen(false);
        document.location.href = 'http://localhost:5173/mes-plannings'
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement", error);
      });
  };
  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  
    // Effectuer le filtrage après la mise à jour de l'état
    const filtered = data.filter((employee) =>
      employee.schedule.some((schedule) =>
        schedule.name.toLowerCase().includes(value.toLowerCase()) &&
        schedule.department.toLowerCase().includes(search.department.toLowerCase()) &&
        schedule.position.toLowerCase().includes(search.position.toLowerCase()) &&
        schedule.date.toLowerCase().includes(search.date.toLowerCase()) &&
        schedule.startTime.toLowerCase().includes(search.startTime.toLowerCase()) &&
        schedule.endTime.toLowerCase().includes(search.endTime.toLowerCase()) &&
        schedule.location.toLowerCase().includes(search.location.toLowerCase()) &&
        schedule.shiftType.toLowerCase().includes(search.shiftType.toLowerCase()) &&
        schedule.status.toLowerCase().includes(search.status.toLowerCase())
      )
    );
  
    setFilteredData(filtered);
    setCurrentPage(1); // Réinitialiser la page à la première lors de la recherche
  };
  

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p className="text-center text-lg font-semibold">Chargement des données...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Erreur : {error}</p>;

  return (
    <DefaultLayout>
   <div className="p-6">
   
      
   {/* Filtres de recherche */}
   <div className="mb-4 flex flex-wrap gap-4 justify-center">
     {Object.keys(search).map((key) => (
       <input
         key={key}
         name={key}
         value={search[key]}
         onChange={handleSearch}
         className="border border-gray-300 p-2 rounded-md"
         placeholder={`Filtrer par ${key}`}
       />
     ))}
   </div>


   <div className="overflow-x-auto">
     <table className="min-w-full table-auto border-collapse border border-gray-300">
       <thead className="bg-gray-100 text-gray-700">
         <tr>
           <th className="px-4 py-2 border-b text-left">Nom</th>
           <th className="px-4 py-2 border-b text-left">Département</th>
           <th className="px-4 py-2 border-b text-left">Position</th>
           <th className="px-4 py-2 border-b text-left">Date</th>
           <th className="px-4 py-2 border-b text-left">Heure Début</th>
           <th className="px-4 py-2 border-b text-left">Heure Fin</th>
           <th className="px-4 py-2 border-b text-left">Pause</th>
           <th className="px-4 py-2 border-b text-left">Lieu</th>
           <th className="px-4 py-2 border-b text-left">Type de Shift</th>
           <th className="px-4 py-2 border-b text-left">Statut</th>
           <th className="px-4 py-2 border-b text-left">Presence</th>
           <th className="px-4 py-2 border-b text-left">Action</th>
         </tr>
       </thead>
       <tbody>
         {currentRows.map((employee) =>
           employee.schedule.map((schedule, index) => (
             <tr key={`${employee.id}-${index}`} className="even:bg-gray-50">
               {index === 0 && (
                 <>
                   <td rowSpan={employee.schedule.length} className="px-4 py-2 border-b">{employee.employeeName}</td>
                   <td rowSpan={employee.schedule.length} className="px-4 py-2 border-b">{employee.department}</td>
                   <td rowSpan={employee.schedule.length} className="px-4 py-2 border-b">{employee.position}</td>
                 </>
               )}
               <td className="px-4 py-2 border-b">{schedule.date}</td>
               <td className="px-4 py-2 border-b">{schedule.startTime}</td>
               <td className="px-4 py-2 border-b">{schedule.endTime}</td>
               <td className="px-4 py-2 border-b">
                 {schedule.breaks.map((b, i) => (
                   <div key={i}>
                     {b.startTime} - {b.endTime}
                   </div>
                 ))}
               </td>
               <td className="px-4 py-2 border-b">{schedule.location}</td>
               <td className="px-4 py-2 border-b">{schedule.shiftType}</td>
               <td className="px-4 py-2 border-b">{schedule.status}</td>
               <td className="px-4 py-2 border-b">{'Absent'}</td>
               <td className="px-4 py-2 border-b flex flex-row justify-center gap-3">
                 <button
                   onClick={() => handleEditPlanning(employee)}
                   className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                 >
                   Modifier
                 </button>
             
               </td>
             </tr>
           ))
         )}
       </tbody>
     </table>
   </div>

   {/* Pagination */}
   <div className="flex justify-center mt-4">
     <button
       onClick={() => paginate(currentPage - 1)}
       disabled={currentPage === 1}
       className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
     >
       Précédent
     </button>
     <span className="text-lg">{currentPage}</span>
     <button
       onClick={() => paginate(currentPage + 1)}
       disabled={indexOfLastRow >= filteredData.length}
       className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
     >
       Suivant
     </button>
   </div>

   {/* Modal pour Ajouter/Modifier Planning */}
   {modalOpen && (
     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
       <div className="bg-white p-6 rounded-lg max-w-lg w-full">
         <h3 className="text-xl font-semibold mb-4">
           {isEditing ? "Modifier un Planning" : "Ajouter un Planning"}
         </h3>
         <div>
           <input
             name="employeeName"
             value={planningData.employeeName}
             onChange={handleChange}
             className="border border-gray-300 p-2 rounded-md w-full mb-2"
             placeholder="Nom de l'employé"
           />
           <input
             name="department"
             value={planningData.department}
             onChange={handleChange}
             className="border border-gray-300 p-2 rounded-md w-full mb-2"
             placeholder="Département"
           />
           <input
             name="position"
             value={planningData.position}
             onChange={handleChange}
             className="border border-gray-300 p-2 rounded-md w-full mb-2"
             placeholder="Position"
           />
           <textarea
             name="schedule"
             onChange={handleChange}
             value={JSON.stringify(planningData.schedule, null, 2)}
             className="border border-gray-300 p-2 rounded-md w-full mb-2"
             placeholder="Entrez l'horaire du planning"
           />
           <div className="flex justify-end mt-4">
             <button
               onClick={handleSavePlanning}
               className="bg-green-500 text-white px-4 py-2 rounded-md"
             >
               {isEditing ? "Sauvegarder les Modifications" : "Ajouter Planning"}
             </button>
           </div>
         </div>
       </div>
     </div>
   )}


 </div>-
    </DefaultLayout>
 
  );
};

export default PlanningTable;
