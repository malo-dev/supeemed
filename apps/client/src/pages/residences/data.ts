export interface Residence {
    id: number;
    nom: string;
    adresse: string;
    gestionnaire: string;
    statut: 'active' | 'inactive';
}

export const residencesData: Residence[] = [
    {
        id: 1,
        nom: "Résidence Les Lilas",
        adresse: "123 Avenue Principale, Goma",
        gestionnaire: "Jean Dupont",
        statut: "active"
    },
    {
        id: 2,
        nom: "Résidence Le Palmier",
        adresse: "45 Rue du Commerce, Goma",
        gestionnaire: "Marie Claire",
        statut: "active"
    }
];
