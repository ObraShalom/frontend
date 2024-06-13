// user.model.ts

export class Usuario {
    id: number;
    name: string;
    username: string;
    password: string;
    idRol: number;
    idObra: number;
    token: string;
    obra: string;
    rol: string;
    activo : boolean;
    constructor() {
        this.id = 0;
        this.name = '';
        this.username = '';
        this.password = '';
        this.idRol = 0;
        this.idObra = 0;
        this.token = '';
        this.obra = '';
        this.rol = '';
        this.activo = false;
    }
}
