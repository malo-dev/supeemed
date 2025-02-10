// global.d.ts
declare namespace Express {
  export interface Multer {
    File: {
      /** Nom du champ original dans le formulaire */
      fieldname: string;
      /** Nom de fichier sur le serveur */
      originalname: string;
      /** Encodage du fichier */
      encoding: string;
      /** MIME type */
      mimetype: string;
      /** Taille du fichier */
      size: number;
      /** Buffer contenant le contenu du fichier */
      buffer: Buffer;
    };
  }
}
