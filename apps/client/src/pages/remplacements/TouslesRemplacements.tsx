import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs"; // Import de l'icône de suppression
import DefaultLayout from "../../layout/adminLayout";

const Replacements = () => {
  const [replacements, setReplacements] = useState([]); // Liste des remplacements
  const [editingReplacement, setEditingReplacement] = useState(null); // Remplacement en cours d'édition
  const [showModal, setShowModal] = useState(false); // Gestion de la modal
  const [showAddModal, setShowAddModal] = useState(false); // Modal pour ajouter une demande de remplacement
  const [newReplacementRequest, setNewReplacementRequest] = useState({ // État pour la demande de remplacement
    date: "",
    requestingEmployeeName: "",
    replacingEmployeeName: "",
  });

  // Charger les données des remplacements
  useEffect(() => {
    fetchReplacements();
  }, []);

  const fetchReplacements = async () => {
    try {
      const response = await axios.get("http://localhost:3000/replacements/");
      if (response.data.status === 200) {
        setReplacements(response.data.result);
      } else {
        console.error("Erreur lors de la récupération des données :", response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  // Gérer l'édition d'un remplacement
  const handleEdit = (replacement) => {
    setEditingReplacement(replacement); // Charger les données dans le formulaire
    setShowModal(true); // Afficher la modal
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/replacements/${editingReplacement.id}`,
        editingReplacement
      );
      alert("Remplacement mis à jour avec succès !");
      setShowModal(false); // Fermer la modal
      fetchReplacements(); // Rafraîchir les données
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  // Supprimer un remplacement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/replacements/${id}`);
      alert("Remplacement supprimé avec succès !");
      fetchReplacements(); // Rafraîchir les données après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingReplacement({ ...editingReplacement, [name]: value });
  };

  // Gérer les changements dans les champs du formulaire de demande de remplacement
  const handleReplacementChange = (e) => {
    const { name, value } = e.target;
    setNewReplacementRequest({ ...newReplacementRequest, [name]: value });
  };

  // Ajouter une nouvelle demande de remplacement
  const handleAddReplacementRequest = async () => {
    try {
      await axios.post("http://localhost:3000/replacements", newReplacementRequest);
      alert("Demande de remplacement ajoutée avec succès !");
      setShowAddModal(false); // Fermer la modal
      fetchReplacements(); // Rafraîchir les données
    } catch (error) {
      console.error("Erreur lors de l'ajout de la demande de remplacement :", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="space-y-4">
        {/* Table des remplacements */}
        <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Liste des remplacements</h3>
          </div>
          <div className="p-4 md:p-6 xl:p-9">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-black dark:text-white">N°</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Date</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Employé demandant</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Employé remplaçant</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {replacements.map((replacement, index) => (
                    <tr key={replacement.id} className="hover:bg-gray-100 dark:hover:bg-meta-3">
                      <td className="border-b border-gray-200 py-5 px-4 dark:border-strokedark">{index + 1}</td>
                      <td className="border-b border-gray-200 py-5 px-4 dark:border-strokedark">{replacement.date}</td>
                      <td className="border-b border-gray-200 py-5 px-4 dark:border-strokedark">
                        {replacement.requestingEmployeeName}
                      </td>
                      <td className="border-b border-gray-200 py-5 px-4 dark:border-strokedark">
                        {replacement.replacingEmployeeName}
                      </td>
                      <td className="border-b border-gray-200 py-5 px-4 dark:border-strokedark">
                        <button
                          className="hover:text-primary transition-all duration-200"
                          title="Modifier"
                          onClick={() => handleEdit(replacement)}
                        >
                          <BsFillPencilFill className="h-4 w-4" />
                        </button>
                        <button
                          className="ml-2 hover:text-red-500 transition-all duration-200"
                          title="Supprimer"
                          onClick={() => handleDelete(replacement.id)} // Bouton de suppression
                        >
                          <BsFillTrashFill className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal d'ajout de demande de remplacement */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
              <h2 className="text-lg font-bold mb-4">Ajouter une demande de remplacement</h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newReplacementRequest.date}
                    onChange={handleReplacementChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Employé demandant</label>
                  <input
                    type="text"
                    name="requestingEmployeeName"
                    value={newReplacementRequest.requestingEmployeeName}
                    onChange={handleReplacementChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Employé remplaçant</label>
                  <input
                    type="text"
                    name="replacingEmployeeName"
                    value={newReplacementRequest.replacingEmployeeName}
                    onChange={handleReplacementChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
                    onClick={() => setShowAddModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleAddReplacementRequest}
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal d'édition */}
        {showModal && editingReplacement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
              <h2 className="text-lg font-bold mb-4">Modifier le remplacement</h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editingReplacement.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Employé demandant</label>
                  <input
                    type="text"
                    name="requestingEmployeeName"
                    value={editingReplacement.requestingEmployeeName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Employé remplaçant</label>
                  <input
                    type="text"
                    name="replacingEmployeeName"
                    value={editingReplacement.replacingEmployeeName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleSave}
                  >
                    Enregistrer
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

export default Replacements;
