import { LicenseForm } from '../features/licenses/components/LicenseForm'

export default function NewLicense() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New License</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Fill in the details below to create a new license listing.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <LicenseForm />
        </div>
      </div>
    </div>
  )
}
