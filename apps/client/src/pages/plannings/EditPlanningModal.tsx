import React, { useState, useEffect } from 'react';
import { Planning } from './data';

interface EditPlanningModalProps {
    planning: Planning | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (planning: Planning) => void;
}

export default function EditPlanningModal({ planning, isOpen, onClose, onUpdate }: EditPlanningModalProps) {
    const [formData, setFormData] = useState<Planning>({
        id: 0,
        planning: '',
        date: '',
        shift: '',
        employee: '',
        residence: ''
    });

    useEffect(() => {
        if (planning) {
            setFormData(planning);
        }
    }, [planning]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-boxdark p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Modifier le planning</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Planning</label>
                        <input
                            type="text"
                            name="planning"
                            value={formData.planning}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Date</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Shift</label>
                        <select
                            name="shift"
                            value={formData.shift}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                        >
                            <option value="Matin">Matin</option>
                            <option value="Après-midi">Après-midi</option>
                            <option value="Soir">Soir</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Employé</label>
                        <input
                            type="text"
                            name="employee"
                            value={formData.employee}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">Résidence</label>
                        <input
                            type="text"
                            name="residence"
                            value={formData.residence}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-meta-4 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-meta-4 dark:text-white"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
                        >
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
