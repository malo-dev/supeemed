import React, { useState } from 'react';
import { FaDownload } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Employee } from './data';

function AjouterUnEmploye() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Champs essentiels pour le tableau
    name: '',
    subname: '',
    phone: '',
    service: '',
    residence: '',
    status: 'actif',
    // Champs additionnels
    username: '',
    password: '',
    departement: '',
    img: '',
    role: '',
    Roledesc: '',
    isEmployee: false,
    isAdmin: false,
    isResidenceManager: false,
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setFormData(prev => ({
      ...prev,
      role: selectedRole,
      departement: getDescriptionForRole(selectedRole),
      isAdmin: selectedRole === "Administrateur",
      isEmployee: selectedRole === "Employé(e)",
      isResidenceManager: selectedRole === "Gestionnaire de residence",
      Roledesc: getDescriptionForRole(selectedRole),
      // Mettre à jour le service en fonction du rôle
      service: getDescriptionForRole(selectedRole)
    }));
  };

  const getDescriptionForRole = (role: string) => {
    switch (role) {
      case "Administrateur":
        return "Administration";
      case "Employé(e)":
        return "Employés support Medic";
      case "Gestionnaire de residence":
        return "Gestion des residences";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation des champs essentiels uniquement
      if (!formData.name || !formData.subname || !formData.phone || !formData.service || !formData.residence) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }

      // Récupérer les employés existants
      const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      
      // Créer un nouvel employé avec un ID unique et le nom complet
      const newEmployee: Employee = {
        id: existingEmployees.length > 0 ? Math.max(...existingEmployees.map((e: Employee) => e.id)) + 1 : 1,
        name: `${formData.subname} ${formData.name}`,
        phone: formData.phone,
        service: formData.service,
        residence: formData.residence,
        status: formData.status
      };

      // Ajouter le nouvel employé à la liste
      const updatedEmployees = [...existingEmployees, newEmployee];
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));

      toast.success('Employé ajouté avec succès');
      navigate('/employees');
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-start items-center min-h-screen bg-gray-100 p-10 dark:bg-gray-800">
      <div className="w-full lg:w-2/3 sm:w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-medium text-3xl text-black dark:text-white">
            Enregistrer un nouvel employé
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Prénom <span className="text-meta-1">*</span>
              </label>
              <input
                name='subname'
                value={formData.subname}
                onChange={handleChange}
                type="text"
                placeholder="Ex: Joe"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Nom <span className="text-meta-1">*</span>
              </label>
              <input
                name='name'
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Ex: Doe"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Numéro de téléphone <span className="text-meta-1">*</span>
              </label>
              <input
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+1 (XXX)XXXXXX"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Département/Service <span className="text-meta-1">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="w-full h-11 rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Sélectionnez un role</option>
                <option value="Administrateur">Administrateur</option>
                <option value="Employé(e)">Employé</option>
                <option value="Gestionnaire de residence">Gestionnaire de residence</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Résidence <span className="text-meta-1">*</span>
              </label>
              <select
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                className="w-full h-11 rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Sélectionnez une résidence</option>
                <option value="Résidence A">Résidence A</option>
                <option value="Résidence B">Résidence B</option>
                <option value="Résidence C">Résidence C</option>
              </select>
            </div>

            <div className='mb-2.5'>
              {formData.Roledesc && (
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>{formData.Roledesc}</p>
              )}
            </div>

            <div className="mb-6 mt-6">
              <label htmlFor="file-upload" className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Photo de l'employé
              </label>
              <div className="relative flex items-center justify-start w-full">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex w-full max-w-lg cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-600 bg-green-600/20 py-6 px-4 text-center text-sm font-medium text-green-800 shadow-md transition hover:bg-green-600/30 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:border-green-500 dark:bg-green-700/10 dark:hover:bg-green-800/20 dark:text-green-300 dark:focus:ring-offset-gray-800"
                >
                  <FaDownload size={30} />
                  <span className='mt-5'>Télécharger l'image de l'employé ici</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="7+ caractères et 1 Majuscule"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute right-4 top-4" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {passwordVisible ? <IoEyeSharp /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent"></div>
                    <span className="ml-2">Enregistrement...</span>
                  </div>
                ) : (
                  "Enregistrer l'employé"
                )}
              </button>

              <Link
                to="/employees"
                className="flex-1 cursor-pointer rounded-lg border border-stroke bg-gray p-4 text-black transition hover:bg-opacity-90 text-center dark:border-strokedark dark:text-white"
              >
                Annuler
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjouterUnEmploye;