class PaginationDTO {
    constructor(query) {
        this.page = parseInt(query.page) || 1;
        this.limit = parseInt(query.limit) || 10;

        // proteção (boas práticas)
        if (this.limit > 100) this.limit = 100;

        this.search = query.search || null;
        this.sort = query.sort || null;
        this.order = query.order || 'ASC';
        this.filters = query;
    }

    get offset() {
        return (this.page - 1) * this.limit;
    }
}

module.exports = PaginationDTO;