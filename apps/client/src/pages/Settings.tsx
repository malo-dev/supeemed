import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/adminLayout";

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [faqVisible, setFaqVisible] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  const deleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleFaq = () => {
    setFaqVisible(!faqVisible);
  };

  return (
     <div
    className={`min-h-screen p-8 ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    } transition-all`}
  >
    <div className="max-w-4xl mx-auto">
      {/* Titre */}
      <h1 className="text-4xl font-bold text-center mb-6">Page des Paramètres</h1>
      
      {/* Préférences du Thème */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Préférences du Thème 🌗</h2>
        <div className="flex items-center gap-4">
          <span>Thème Sombre</span>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
              className="w-12 h-6 bg-gray-300 rounded-full relative appearance-none cursor-pointer transition-colors"
            />
          </label>
        </div>
      </div>

      {/* Liste des Tâches */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Liste de Tâches 📝</h2>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Ajouter une tâche"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Ajouter
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{task}</span>
              <button
                onClick={() => deleteTask(task)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Supprimer 🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Vidéos d'Apprentissage */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Vidéos d'Apprentissage 📚</h2>
        <p>Voici des ressources utiles pour apprendre à développer cette application :</p>
        <ul className="space-y-4 mt-4">
          <li>
            <a
              href="https://www.youtube.com/watch?v=MFh0Fd7BsjE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Introduction à Express.js et Node.js
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/watch?v=2Xkjh8uvnHo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Tutoriel React.js pour les débutants
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/watch?v=4EZGJdm5jmw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Utilisation d'Axios dans React
            </a>
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">FAQ ❓</h2>
        <button
          onClick={toggleFaq}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          {faqVisible ? "Cacher les FAQ" : "Voir les FAQ"}
        </button>
        {faqVisible && (
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-bold">1. Comment ajouter une tâche ?</h3>
              <p>Entrez une nouvelle tâche dans le champ de texte et appuyez sur "Ajouter". 🖊️</p>
            </div>
            <div>
              <h3 className="font-bold">2. Comment changer de thème ?</h3>
              <p>Cliquez sur le bouton à côté de "Thème Sombre" pour basculer entre les modes. 🌙☀️</p>
            </div>
            <div>
              <h3 className="font-bold">3. Comment utiliser GitHub pour le projet ?</h3>
              <p>Créez un nouveau dépôt sur GitHub, puis poussez votre code via Git. 🔄</p>
            </div>
            <div>
              <h3 className="font-bold">4. Qu'est-ce qu'Axios et comment l'utiliser ?</h3>
              <p>Axios est une bibliothèque pour effectuer des requêtes HTTP dans React. Utilisez-le pour récupérer ou envoyer des données depuis votre serveur Express. 🚀</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
    
  );
};

export default SettingsPage;
