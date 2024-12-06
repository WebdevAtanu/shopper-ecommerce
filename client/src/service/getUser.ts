import axios from 'axios';
import { useDispatch } from 'react-redux';

// Custom hook
export default function useGetUser() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/user/details`, { withCredentials: true });
      dispatch({ type: 'userData', payload: res.data });
      dispatch({ type: 'stateTrue' });
    } catch (err) {
      console.error(err.message);
    }
  };

  return getUser;
}
