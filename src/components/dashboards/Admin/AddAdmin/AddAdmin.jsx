import CreateAdminForm from './CreateAdminForm';
import { FiShield, FiUsers, FiBook, FiLayers } from 'react-icons/fi';

const AddAdmin = () => {
  return (
    <div className="tw-px-4 tw-py-6 md:tw-px-8">
      {/* Page Header */}
      <div className="tw-mb-8">
        <h1 className="tw-text-2xl tw-font-bold tw-text-slate-900">
          Super Admin Controls
        </h1>
        <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
          Manage administrative access and permissions
        </p>
      </div>

      {/* Content Grid */}
      <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2">
        {/* Create Admin */}
        <CreateAdminForm />

        {/* Info Card */}
        <div className="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-shadow-sm">
          <div className="tw-border-b tw-border-slate-200 tw-p-6">
            <h2 className="tw-text-lg tw-font-semibold tw-text-slate-900">
              Admin Management
            </h2>
            <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
              Capabilities granted to admin users
            </p>
          </div>

          <div className="tw-space-y-4 tw-p-6">
            {[
              { icon: FiUsers, label: 'Manage students' },
              { icon: FiBook, label: 'Create & manage courses' },
              { icon: FiLayers, label: 'Assign students to batches' },
              { icon: FiShield, label: 'View system reports' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="tw-flex tw-items-center tw-gap-3 tw-rounded-xl tw-border tw-border-slate-100 tw-bg-slate-50 tw-p-3"
              >
                <Icon className="tw-h-5 tw-w-5 tw-text-indigo-600" />
                <span className="tw-text-sm tw-font-medium tw-text-slate-800">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
