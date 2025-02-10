import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsCalendar2Week, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import DefaultLayout from '../../layout/adminLayout';

const url = 'http://localhost:3000/plannings/';

export default function Plannings() {
  const [plannings, setPlannings] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlanning, setEditingPlanning] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setPlannings(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLastPlanning = currentPage * itemsPerPage;
  const indexOfFirstPlanning = indexOfLastPlanning - itemsPerPage;
  const currentPlannings = plannings.slice(indexOfFirstPlanning, indexOfLastPlanning);

  const filteredPlannings = currentPlannings.filter((planning) =>
    planning.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: string) => {
    setIsDeleting(true);
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce planning ?')) {
      axios
        .delete(`${url}${id}`)
        .then(() => {
          setPlannings(plannings.filter((planning) => planning.id !== id));
          setIsDeleting(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression :', error);
          setIsDeleting(false);
        });
    } else {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (planning: any) => {
    setEditingPlanning(planning);
    setIsEditing(true);
    setCurrentStep(1); // Revenir à la première étape
  };

  const handleUpdate = () => {
    if (!editingPlanning) return;

    setIsLoading(true);
    axios
      .put(`${url}${editingPlanning.id}`, editingPlanning)
      .then((response) => {
        const updatedPlannings = plannings.map((p) =>
          p.id === editingPlanning.id ? response.data : p
        );
        setPlannings(updatedPlannings);
        setIsLoading(false);
        setIsEditing(false);
        setEditingPlanning(null);
        location.href='http://localhost:5173/tous-les-plannings'
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour :', error);
        setIsLoading(false);
      });
  };

  const handleScheduleClick = (schedule: any) => {
    setSelectedSchedule(schedule);
  };

  const closeScheduleDetails = () => {
    setSelectedSchedule(null);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Impression</title></head><body>');
    printWindow.document.write('<table border="1">');
    printWindow.document.write('<thead><tr><th>ID</th><th>Nom Emp.</th><th>Dépt.</th><th>Poste</th><th>Horaires</th><th>Actions</th></tr></thead>');
    printWindow.document.write('<tbody>');
    plannings.forEach((planning) => {
      printWindow.document.write(`<tr><td>${planning.id}</td><td>${planning.employeeName}</td><td>${planning.department}</td><td>${planning.position}</td><td>${planning.schedule}</td><td>Actions</td></tr>`);
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <DefaultLayout>
 <div className="space-y-4">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center p-4">
        <Link to="/calendar" className="hover:opacity-80">
          <BsCalendar2Week className="w-8 h-8 text-primary" />
        </Link>
        <Link
          to="/add-planning"
          className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90"
        >
          Ajouter un planning
        </Link>
      </div>

      {/* Filtrage */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrer par nom..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark flex items-center justify-between">
          <h3 className="font-medium text-black dark:text-white">Plannings en cours...</h3>
          <button onClick={handlePrint} className="bg-primary text-white py-2 px-4 rounded-md">
            Imprimer
          </button>
        </div>
        <div className="p-4 md:p-6 xl:p-9">
          {plannings.length > 0 ? (
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Id Planning</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Id Emp</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Nom Emp.</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Dépt.</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Poste</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Horaires</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlannings.map((planning) => (
                    <tr key={planning.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="border-b py-4 px-4 dark:border-strokedark">{planning.id}</td>
                      <td className="border-b py-4 px-4 dark:border-strokedark">{planning.employeeId}</td>
                      <td className="border-b py-4 px-4 dark:border-strokedark">{planning.employeeName}</td>
                      <td className="border-b py-4 px-4 dark:border-strokedark">{planning.department}</td>
                      <td className="border-b py-4 px-4 dark:border-strokedark">{planning.position}</td>
                      <td className="border-b py-4 px-4 dark:border-strokedark">
                        <button
                          onClick={() => handleScheduleClick(planning.schedule)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Voir programme
                        </button>
                      </td>
                      <td className="border-b py-4 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditClick(planning)}
                          >
                            <BsFillPencilFill className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(planning.id)}
                          >
                            {isDeleting ? (
                              <div className="spinner-border text-red-500" role="status">
                                <span className="sr-only">Suppression...</span>
                              </div>
                            ) : (
                              <BsFillTrashFill className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 dark:text-gray-400">Aucun planning en cours</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 my-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-primary text-white py-2 px-4 rounded-md disabled:bg-gray-300"
        >
          Précédent
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPlanning >= plannings.length}
          className="bg-primary text-white py-2 px-4 rounded-md disabled:bg-gray-300"
        >
          Suivant
        </button>
      </div>

      {/* Modal d'édition */}
      {isEditing && editingPlanning && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="font-bold text-xl mb-4">Modifier le Planning</h2>
            {/* Etape 1 */}
            {currentStep === 1 && (
              <div>
                <label className="block">Nom de l'employé</label>
                <input
                  type="text"
                  value={editingPlanning.employeeName}
                  onChange={(e) => setEditingPlanning({ ...editingPlanning, employeeName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-primary text-white py-2 px-4 rounded-md mt-2"
                >
                  Suivant
                </button>
              </div>
            )}
            {/* Etape 2 */}
            {currentStep === 2 && (
              <div>
                <label className="block">Département</label>
                <input
                  type="text"
                  value={editingPlanning.department}
                  onChange={(e) => setEditingPlanning({ ...editingPlanning, department: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-primary text-white py-2 px-4 rounded-md mt-2"
                >
                  Suivant
                </button>
              </div>
            )}
            {/* Etape 3 */}
            {currentStep === 3 && (
              <div>
                <label className="block">Poste</label>
                <input
                  type="text"
                  value={editingPlanning.position}
                  onChange={(e) => setEditingPlanning({ ...editingPlanning, position: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-primary text-white py-2 px-4 rounded-md mt-2"
                >
                  Mettre à jour
                </button>
              </div>
            )}
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 ml-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Détails du planning */}
      {selectedSchedule && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="font-bold text-xl mb-4">Détails du programme</h2>
            <button
              className="text-red-500 hover:text-red-700 mb-4"
              onClick={closeScheduleDetails}
            >
              Fermer
            </button>
            {selectedSchedule.map((shift: any, index: number) => (
              <div key={index} className="mb-4">
                <p><strong>Date :</strong> {shift.date}</p>
                <p><strong>Heure Début :</strong> {shift.startTime}</p>
                <p><strong>Heure Fin :</strong> {shift.endTime}</p>
                <p><strong>Lieu :</strong> {shift.location}</p>
                <p><strong>Type de Shift :</strong> {shift.shiftType}</p>
                <p><strong>Statut :</strong> {shift.status}</p>
                <div>
                  <strong>Pauses :</strong>
                  {shift.breaks.length > 0 ? (
                    <ul className="list-disc pl-6">
                      {shift.breaks.map((br: any, idx: number) => (
                        <li key={idx}>
                          {br.type} (Début : {br.startTime}, Fin : {br.endTime})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucune pause</p>
                  )}
                </div>
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditClick(selectedSchedule)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(selectedSchedule.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </DefaultLayout>
   
  );
}
