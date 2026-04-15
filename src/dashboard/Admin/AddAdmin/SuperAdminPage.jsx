import CreateAdminForm from "./CreateAdminForm";
import AdminTable from "./AdminTable";
import { FiShield, FiUsers, FiBook, FiLayers } from 'react-icons/fi';


const SuperAdminPage = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">
        Super Admin Controls
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreateAdminForm />

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Admin Management
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Capabilities granted to admin users
            </p>
          </div>

          <div className="space-y-4 p-6">
            {[
              { icon: FiUsers, label: 'Manage students' },
              { icon: FiBook, label: 'Create & manage courses' },
              { icon: FiLayers, label: 'Assign students to batches' },
              { icon: FiShield, label: 'View system reports' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <Icon className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium text-slate-800">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <AdminTable />
    </div>
  );
};

export default SuperAdminPage;