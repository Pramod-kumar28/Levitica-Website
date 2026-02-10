import CreateAdminForm from './CreateAdminForm';

const SuperAdminPage = () => {
  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h4 className="page-title">Super Admin Controls</h4>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6">
              <CreateAdminForm />
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Admin Management</h4>
                </div>
                <div className="card-body">
                  <p>From this panel, you can create new admin accounts that will have access to the admin dashboard.</p>
                  <p>Admins will be able to:</p>
                  <ul>
                    <li>Manage students</li>
                    <li>Create and manage courses</li>
                    <li>Assign students to batches</li>
                    <li>View system reports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPage;