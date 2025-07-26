import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useAxios from './useAxios';

const UseUserRole = () => {
    const { user, loading: authLoading } = use(AuthContext)
    const axiosSecure = useAxios();

    const { data: role = 'user', isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['profileUser', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`user/${user?.email}`)
            return res.data.role;
        }
    })

    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default UseUserRole;
