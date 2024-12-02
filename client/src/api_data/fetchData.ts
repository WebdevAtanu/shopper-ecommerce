import axios from 'axios';
import _ from 'lodash';

async function fetchData() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/product/products`);
        const allData = response.data.data;
        const groupedData = _.groupBy(allData, 'category');
        const chunkData=_.chunk(allData,10);
        return { groupedData, allData, chunkData };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default fetchData;
