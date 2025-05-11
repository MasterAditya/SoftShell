import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'How does the license transfer process work?',
    answer:
      'When you purchase a license, the seller will transfer the license key to your account. Once confirmed, you can activate the software using the provided key. The entire process is automated and usually takes just a few minutes.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, debit cards, and UPI payments through our secure payment gateway. All transactions are encrypted and processed securely.',
  },
  {
    question: 'How do you verify license authenticity?',
    answer:
      'We have an automated system that verifies each license key against the software publisher\'s database. Additionally, our team manually reviews high-value transactions for extra security.',
  },
  {
    question: 'What happens if a license key doesn\'t work?',
    answer:
      'We offer a 100% money-back guarantee if a license key doesn\'t work. Simply contact our support team within 24 hours of purchase, and we\'ll process your refund immediately.',
  },
  {
    question: 'Can I sell my unused software licenses?',
    answer:
      'Yes! You can list your unused software licenses on our platform. We\'ll verify the license validity before listing, and you\'ll receive payment once the sale is completed.',
  },
  {
    question: 'How long does it take to receive payment for sold licenses?',
    answer:
      'Payments are processed within 24-48 hours after the buyer confirms the license is working. The funds will be transferred to your registered bank account.',
  },
]

export default function FAQ() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200 dark:divide-gray-700">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={\`\${
                              open ? '-rotate-180' : 'rotate-0'
                            } h-6 w-6 transform transition-transform duration-200\`}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500 dark:text-gray-300">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
