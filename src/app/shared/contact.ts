import { ContactType } from './contact-type';

export class Contact {
    constructor(
        public id?: number,
        public customerID?: number,
        public cType?: ContactType,
        public data?: string
    ) { }
}
