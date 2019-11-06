class CharacterHelper{
    constructor(payload){
        this.payload = payload;
    }
    async sortFunction(results){
        const { query } = this.payload;
        try {
            if(Object.values(query)[0] == 'asc') {
                results.sort((a, b) => a.name > b.name);
            } else{
                results.sort((a, b) => b.name > a.name)
            };
            const values = results.filter(item => {
                if(Object.values(query)[1] == 'female'){
                    return item.gender == 'female';
                }else if(Object.values(query)[1] == 'male'){
                    return item.gender == 'male';
                }else{
                    return item.gender == 'n/a';
                }
            });
            return values;
        } catch (error) {
            return error;
        }
    }
}

export default CharacterHelper;