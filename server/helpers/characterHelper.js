/* istanbul ignore file */
class CharacterHelper{

   static async sortResult(results, query) {
        try {
            switch (Object.values(query)[0]) {
                case 'asc':
                    return results.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                case 'desc':
                    return results.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0))
                default:
                    return results;
            }
        } catch (error) {
            return error;
        }
    }

    static async filterResult(results, query) {
        try {   
            const values = results.filter(item => {
            switch (Object.values(query)[1]) {
                case 'female':
                    return item.gender === 'female';
                case 'male':
                    return item.gender === 'male';
                case 'hermaphrodite':
                    return item.gender === 'hermaphrodite';
                case 'none':
                    return item.gender === 'none';
                case 'n/a':
                    return item.gender === 'n/a';
                default:
                    return results;
            }
        });
            return values;
        } catch (error) {
           return error; 
        }
    }

    static async calculateHeightCount(results) {
        let sum = 0;
        let heightInfeet, heightInFeetRound, heightRemainderInInches;
        results.forEach(element => {
            if(element.height !== 'unknown'){
                sum += Number(element.height);
            };
            heightInfeet = sum / 30.48;
            heightInFeetRound = Math.floor(heightInfeet);
            heightRemainderInInches = ((heightInfeet - Math.floor(heightInfeet)) * 12).toFixed(2);
        });
        return {
            results,
            'height-in-cm': `${sum}cm`,
            'height-in-feet': `${heightInFeetRound}ft and ${heightRemainderInInches}inches`,
            count: results.length
        } 
    }

    static async calcAndFilterValues(value, query) {
        const sortedValues = await this.sortResult(value, query);
        const filteredValues = await this.filterResult(sortedValues, query);
        const finalCharactersResult = await this.calculateHeightCount(filteredValues);
        return finalCharactersResult;
    }

}

export default CharacterHelper;
