import React, { useState, useEffect } from "react";
import { BsFillPencilFill, BsUpload } from "react-icons/bs";
import axios from "axios";
import DefaultLayout from "../../layout/DefaultLayout";

const FormulairedeDemandedeConge = () => {
  const [conges, setConges] = useState([]);
  const [editingConge, setEditingConge] = useState(null); // Stocker la demande en cours d'édition
  const [newConge, setNewConge] = useState({
    employeeName: "",
    reason: "",
    startDate: "",
    endDate: "",
  }); // Stocker les données pour une nouvelle demande
  const [showModal, setShowModal] = useState(false); // Gérer la visibilité de la modal
  const [showAddModal, setShowAddModal] = useState(false); // Gérer la modal pour ajout
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page

  // Récupérer les données depuis l'API
  useEffect(() => {
    fetchConges();
  }, []);

  const fetchConges = async () => {
    try {
      const response = await axios.get("http://localhost:3000/leaverequest/");
      setConges(response.data.result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  // Calculer la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConges = conges.slice(indexOfFirstItem, indexOfLastItem);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (conge) => {
    setEditingConge(conge); // Charger les données dans le formulaire
    setShowModal(true); // Afficher la modal
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/leaverequest/${editingConge.id}`,
        editingConge
      );
      alert("Demande mise à jour avec succès !");
      setShowModal(false); // Fermer la modal
      fetchConges(); // Mettre à jour la liste
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleChange = (e, type = "edit") => {
    const { name, value } = e.target;
    if (type === "edit") {
      setEditingConge({ ...editingConge, [name]: value });
    } else {
      setNewConge({ ...newConge, [name]: value });
    }
  };

  const handleAddConge = async () => {
    try {
      await axios.post("http://localhost:3000/leaverequest/", newConge);
      alert("Demande ajoutée avec succès !");
      setShowAddModal(false);
      fetchConges();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  // Calculer le nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(conges.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <DefaultLayout>
        <div className="space-y-4">
  
  {/* Boutons d'action */}
  <div className="flex justify-between items-center">
    <h3 className="font-medium text-lg">Liste des demandes de congés</h3>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => setShowAddModal(true)}
    >
      Ajouter une demande
    </button>
  </div>

  {/* Tableau */}
  <div className="rounded-lg border border-stroke bg-white shadow-md overflow-hidden">
    <div className="p-6">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="py-4 px-6 font-medium text-black">N°</th>
              <th className="py-4 px-6 font-medium text-black">Employé</th>
              <th className="py-4 px-6 font-medium text-black">Type de congé</th>
              <th className="py-4 px-6 font-medium text-black">Date de début</th>
              <th className="py-4 px-6 font-medium text-black">Date de fin</th>
              <th className="py-4 px-6 font-medium text-black">Statut</th>
              <th className="py-4 px-6 font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentConges.map((conge, index) => (
              <tr
                key={conge.id}
                className="hover:bg-gray-100 border-b"
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{conge.employeeName}</td>
                <td className="py-4 px-6">{conge.reason}</td>
                <td className="py-4 px-6">{conge.startDate}</td>
                <td className="py-4 px-6">{conge.endDate}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                      conge.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : conge.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {conge.status === "pending"
                      ? "En attente"
                      : conge.status === "approved"
                      ? "Approuvé"
                      : "Rejeté"}
                  </span>
                </td>
                <td className="py-4 px-6 flex space-x-4">
                  <button
                    className="hover:text-blue-500"
                    title="Modifier"
                    onClick={() => handleEdit(conge)}
                  >
                    <BsFillPencilFill className="h-5 w-5" />
                  </button>
                  <button className="hover:text-blue-500" title="Importer">
                    <BsUpload className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* Pagination */}
  <div className="flex justify-center mt-6">
    <nav>
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              }`}
              disabled={currentPage === number}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </div>

  {/* Modals */}
  {/* Modal d'édition */}
  {showModal && editingConge && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Modifier la demande</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Employé</label>
            <input
              type="text"
              name="employeeName"
              value={editingConge.employeeName}
              onChange={(e) => handleChange(e, "edit")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Type de congé</label>
            <input
              type="text"
              name="reason"
              value={editingConge.reason}
              onChange={(e) => handleChange(e, "edit")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Date de début</label>
            <input
              type="date"
              name="startDate"
              value={editingConge.startDate}
              onChange={(e) => handleChange(e, "edit")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Date de fin</label>
            <input
              type="date"
              name="endDate"
              value={editingConge.endDate}
              onChange={(e) => handleChange(e, "edit")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSave}
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  {/* Modal d'ajout */}
  {showAddModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Ajouter une demande</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Employé</label>
            <input
              type="text"
              name="employeeName"
              value={newConge.employeeName}
              onChange={(e) => handleChange(e, "add")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Type de congé</label>
            <input
              type="text"
              name="reason"
              value={newConge.reason}
              onChange={(e) => handleChange(e, "add")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Date de début</label>
            <input
              type="date"
              name="startDate"
              value={newConge.startDate}
              onChange={(e) => handleChange(e, "add")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Date de fin</label>
            <input
              type="date"
              name="endDate"
              value={newConge.endDate}
              onChange={(e) => handleChange(e, "add")}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={() => setShowAddModal(false)}
            >
              Annuler
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleAddConge}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
    </DefaultLayout>
  
  );
};

export default FormulairedeDemandedeConge;
