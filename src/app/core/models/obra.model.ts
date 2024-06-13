// obra.model.ts

export class Obra {
    id: number;
    nombre: string;
    activo: boolean;

    constructor(
    ) {
        this.id = 0;
        this.nombre = '';
        this.activo = false;
    }
}
