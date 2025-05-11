import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LicenseCard } from '../components/LicenseCard'

describe('LicenseCard', () => {
  const mockLicense = {
    id: 1,
    name: 'Test License',
    software: 'Test Software',
    status: 'active',
    price: 99.99,
    originalPrice: 149.99,
    expiryDate: '2025-12-31',
  }

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders license information correctly', () => {
    renderWithRouter(<LicenseCard license={mockLicense} />)

    expect(screen.getByText('Test License')).toBeInTheDocument()
    expect(screen.getByText('Test Software')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('$149.99')).toBeInTheDocument()
    expect(screen.getByText(/Valid until/)).toBeInTheDocument()
  })

  it('renders the correct status color', () => {
    renderWithRouter(<LicenseCard license={mockLicense} />)
    const statusBadge = screen.getByText('Active')
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders action buttons correctly', () => {
    renderWithRouter(<LicenseCard license={mockLicense} />)
    expect(screen.getByText('View Details')).toBeInTheDocument()
    expect(screen.getByText('Submit for Review')).toBeInTheDocument()
  })

  it('renders the correct link for details', () => {
    renderWithRouter(<LicenseCard license={mockLicense} />)
    const detailsLink = screen.getByText('View Details')
    expect(detailsLink.closest('a')).toHaveAttribute('href', '/dashboard/licenses/1')
  })
})
