export class Address {
    constructor(
        public street?: string,
        public houseNumber?: string,
        public zip?: number,
        public city?: string
    ) { }

    public addressIsComplete(): boolean {
        return !!this.street && !!this.houseNumber && !!this.zip && !!this.city;
    }

}
