/// <reference types="vite/client" />

//attention:
//Acronym and their meaning:
//A: All
//AC: Accept
//B: Base
//C: Create
//D: Delete
//F: Folder
//G: Get
//H: Hidden (disabled)
//I: Information
//L: Login
//LO: Logout
//R: Register
//S: Search
//O: One
//T: Type
//U: Update
//UH: Unhidden {enabled)
//V: Verify
//VER: Version

interface ImportMetaEnv {
    readonly VITE_SERVER_PORT: string;
    readonly VITE_API_HOST: string;

    // Cloudinary
    readonly VITE_CLOUD_B_URL: string;
    readonly VITE_CLOUD_NAME: string;
    readonly VITE_CLOUD_T_I: string;
    readonly VITE_CLOUD_VER: string;
    readonly VITE_CLOUD_F_P: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
