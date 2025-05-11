import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import { LicenseList } from '../features/licenses/components/LicenseList'
import { Button } from '../components/ui/Button'

export default function Licenses() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Licenses</h1>
          <Link to="/dashboard/licenses/new">
            <Button>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New License
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <LicenseList />
        </div>
      </div>
    </div>
  )
}
