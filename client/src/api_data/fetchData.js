import axios from 'axios';
import _ from 'lodash';

async function fetchData() {
    try {
        const response = await axios.get('https://dummyjson.com/products?limit=50');
        const allData = response.data.products;
        const groupedData = _.groupBy(allData, 'category');
        return { groupedData, allData };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default fetchData;
