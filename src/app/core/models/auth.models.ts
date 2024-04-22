export class User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email: string;
    profile?: string;
}

export interface LoginUser {
    extension: string;
    password: string;
    languageId : number
}

export interface UserResponse {
    Resultado:   number;
    Mensaje:     string;
    ID_Usuario:  number;
    Descripcion: string;
    Nombres:     string;
    apellidos:   string;
    Anexo:       string;
    Pin_Sip:     string;
    o_ck:        string;
    Id_prefijo:  number;
    Celular:     string;
    correo:      string;
    id_madre:    number;
}


export interface UserAddBody {
    api_key:     string;
    session_key: string;
    locale_Code: string;
    prmHash:     string;
    data:        Data;
}

export interface Data {
    extension: string;
    name:      string;
    title:     string;
    id_device: string;
    password:  string;
    mail:      string;
    prefix:    string;
    phone:     string;
}


export interface UserAddResponse {
    resp_cod: number;
    resp_msg: string;
    data:     UserAddDataResponse;
}

export interface UserAddDataResponse {
    _id:            string;
    extension:      string;
    isonline:       boolean;
    name:           string;
    mail:           string;
    phone:          string;
    prefix:         number;
    country:        Country;
    id_device:      string;
    account_mother: AccountMother;
    date_creation:  number;
    photo:          Photo;
}

export interface AccountMother {
    id_mother:      number;
    number_account: string;
}

export interface Country {
    country_code: string;
    name_country: string;
}

export interface Photo {
    thumb:    string;
    medium:   string;
    original: string;
}



export interface SessionBody {
    api_key:     string;
    session_key: string;
    locale_Code: string;
    prmHash:     string;
    data:        DataSession;
}

export interface DataSession {
    user_id:   string;
    extension: string;
}



export interface SessionResponse {
    resp_cod: number;
    resp_msg: string;
    data:     DataSessionResponse;
}

export interface DataSessionResponse {
    _id:           string;
    session_key:   string;
    status:        boolean;
    user_id:       string;
    date_creation: number;
}
