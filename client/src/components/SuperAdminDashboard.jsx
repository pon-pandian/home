import SuperAdminAdmin from './SuperAdminAdmin';
import SuperAdminUser from './SuperAdminUser';

const SuperAdminDashboard = () => {

return (
<>
<div>
    <h5>Admin</h5>
    <SuperAdminAdmin />
    <h5>User</h5>
    <SuperAdminUser />
</div>
</>
);
};

export default SuperAdminDashboard;