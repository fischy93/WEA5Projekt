import { ContactType } from './contact-type';

export class Contact {
    id: number = 0;
    cType?: ContactType;
    data: string = '';


    constructor(
        id?: number,
        cType?: ContactType,
        data?: string
    ) {
        if (id !== undefined) this.id = id;
        if (cType !== undefined) this.cType = cType;
        if (data !== undefined) this.data = data;
    }
}
