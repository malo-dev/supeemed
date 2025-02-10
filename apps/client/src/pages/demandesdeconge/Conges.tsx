import React, { useState, useEffect } from "react";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsCheckCircleFill,
  BsXCircleFill,
  BsUpload,
} from "react-icons/bs";
import axios from "axios";
import DefaultLayout from "../../layout/adminLayout";

const Conges = () => {
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
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-4 md:p-6 xl:p-9">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
                    N°
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Employé
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Type de congé
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Date de début
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Date de fin
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Statut
                  </th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {conges.map((conge, index) => (
                  <tr key={conge.id}>
                    <td className="border-b py-5 px-4">{index + 1}</td>
                    <td className="border-b py-5 px-4">{conge.employeeName}</td>
                    <td className="border-b py-5 px-4">{conge.reason}</td>
                    <td className="border-b py-5 px-4">{conge.startDate}</td>
                    <td className="border-b py-5 px-4">{conge.endDate}</td>
                    <td className="border-b py-5 px-4">
                      <span
                        className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                          conge.status === "approved"
                            ? "bg-success bg-opacity-10 text-success"
                            : conge.status === "rejected"
                            ? "bg-danger bg-opacity-10 text-danger"
                            : "bg-warning bg-opacity-10 text-warning"
                        }`}
                      >
                        {conge.status === "pending"
                          ? "En attente"
                          : conge.status === "approved"
                          ? "Approuvé"
                          : "Rejeté"}
                      </span>
                    </td>
                    <td className="border-b py-5 px-4 flex space-x-2">
                      <button
                        className="hover:text-primary"
                        title="Modifier"
                        onClick={() => handleEdit(conge)}
                      >
                        <BsFillPencilFill className="h-4 w-4" />
                      </button>
                      <button className="hover:text-primary" title="Importer">
                        <BsUpload className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      {showModal && editingConge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Formulaire d'édition */}
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
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
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

export default Conges;
