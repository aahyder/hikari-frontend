/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
  categories: [
    {
      name: 'Men',
      featured: [
        { name: 'Casual', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Outdoor', href: '#' },
      ],
      collection: [
        { name: 'Everything', href: '#' },
        { name: 'Core', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
      ],
      categories: [
        { name: 'Artwork Tees', href: '#' },
        { name: 'Pants', href: '#' },
        { name: 'Accessories', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Basic Tees', href: '#' },
      ],
      brands: [
        { name: 'Significant Other', href: '#' },
        { name: 'My Way', href: '#' },
        { name: 'Counterfeit', href: '#' },
        { name: 'Re-Arranged', href: '#' },
        { name: 'Full Nelson', href: '#' },
      ],
    },
  ],
  pages: [
  ],
}

const products = [
  {
    id: 1,
    name: "Men's Jujitsu Gi",
    color: 'Black',
    price: '$90',
    href: '#',
    imageSrc: 'img/Gi.jpeg',
    buyImageSrc: 'img/IMG_0259.jpeg',
    imageAlt: "Men's Jujitsu Gi",
    sizes: [
      { name: 'A1', description: "Men's Small" },
      { name: 'A2', description: "Men's Medium" },
      { name: 'A3', description: "Men's Large" },
      { name: 'A4', description: "Men's Extra Large" },
    ],
  },
  // More products...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [giOpen, setGiOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(products[0].sizes[0])
  const [sendEmail, setSendEmail] = useState({ address : ''});

  const handleBuy = (e) => {
    e.preventDefault();
    if(selectedSize.name === "A1") {
      window.location.href = 'https://buy.stripe.com/00g3cw8Vc7akcYUbII'
    } else if(selectedSize.name === "A2") {
      window.location.href = 'https://buy.stripe.com/3cs28s3AS52c3ok28d'      
    } else if(selectedSize.name === "A3") {
      window.location.href = 'https://buy.stripe.com/9AQ3cwfjA52cbUQ5ko'        
    } else {
      window.location.href = 'https://buy.stripe.com/eVa14o2wO7ak4so00b'
    }
  };
  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    try {
      await fetch('https://backend-9f7fq.ondigitalocean.app/api/v1/create-customer?email='+sendEmail.address, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  const handleEmailUpdate = (e) => {
    setSendEmail({sendEmail, [e.target.name]: e.target.value});
  }

  return (
    <div className="bg-white">
      <main>
      <Transition.Root show={giOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setGiOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setGiOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                        <img src={products[0].buyImageSrc} alt={products[0].imageAlt} className="object-cover object-center" />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{products[0].name}</h2>

                      <section aria-labelledby="information-heading" className="mt-4">
                        <h3 id="information-heading" className="sr-only">
                          products information
                        </h3>

                        <div className="mt-6 flex items-center">
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                          <p className="ml-2 font-medium text-gray-500">In stock and ready to ship</p>
                        </div>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-6">
                        <h3 id="options-heading" className="sr-only">
                          products options
                        </h3>

                        <form>
                          <div className="sm:flex sm:justify-between">
                            {/* Size selector */}
                            <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                              <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                                Size
                              </RadioGroup.Label>
                              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {products[0].sizes.map((size) => (
                                  <RadioGroup.Option
                                    as="div"
                                    key={size.name}
                                    value={size}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'ring-2 ring-red-500' : '',
                                        'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                                          {size.name}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                                          {size.description}
                                        </RadioGroup.Description>
                                        <div
                                          className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-red-500' : 'border-transparent',
                                            'pointer-events-none absolute -inset-px rounded-lg'
                                          )}
                                          aria-hidden="true"
                                        />
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="mt-6">
                            <button
                              type="submit"
                              onClick={handleBuy}
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                              Buy Now
                            </button>
                          </div>
                          <div className="mt-6 text-center">
                            <a href="#" className="group inline-flex text-base font-medium">
                              <ShieldCheckIcon
                                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span className="text-gray-500 group-hover:text-gray-700">100% Pearl Weave</span>
                            </a>
                          </div>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>        
        {/* Hero */}
        <div className="flex flex-col border-b border-gray-200 lg:border-0">
          <nav aria-label="Offers" className="order-first">
            <div className="mx-auto lg:px-8 mt-3">
              <img src='/HIKARI.jpg'  className="max-w-xs mx-auto"/>
            </div>
          </nav>

          <div className="relative">
            <div aria-hidden="true" className="absolute hidden h-full w-1/2 bg-white lg:block" />
            <div className="relative bg-white lg:bg-transparent">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                  <div className="lg:pr-16">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                      Focus on what matters
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                      Quality martial arts gear at an affordable price for gyms and practicioners
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-48 w-full sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
              <img
                src="/img/IMG_0301.jpeg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Trending products */}
        <section aria-labelledby="trending-heading" className="bg-white mb-10">
          <div className="flex justify-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mx-auto mt-10">Our Flagship Products</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
            {products.map((products) => (
              <div key={products.id} className="group-reletaive flex justify-center">
                <li className="inline-flex w-64 flex-col text-center lg:w-72">
                  <div className="h-auto w-full overflow-hidden rounded-lg group-hover:opacity -75">
                    <img
                      src={products.imageSrc}
                      alt={products.imageAlt}
                      className="h-full w-full object-cover object-center"
                      onClick={() => setGiOpen(true)}
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    <a href={products.href}>
                      <span className="absolute inset-0" />
                      {products.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{products.price}</p>
                </li>  
              </div>
            ))}
          </div>          
        </section>
      </main>

      <footer aria-labelledby="footer-heading" className="bg-white">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200">
            <div className="pt-16 pb-20">
              <div className="md:flex md:justify-center">
                <img
                  src="/HIKARI.jpg"
                  alt=""
                  className="h-8 w-auto"
                />
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
              <div className="flex items-center rounded-lg bg-gray-100 p-6 sm:p-10">
                <div className="mx-auto max-w-sm">
                  <h3 className="font-semibold text-gray-900">Sign up to get our latest updates</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    We'll keep you up to date on anything and everything Hikari related (new products, discounts, and more!)
                  </p>
                  <form className="mt-4 sm:mt-6 sm:flex" onSubmit={handleEmailSubmit}>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="address"
                      type="text"
                      autoComplete="email"
                      required
                      value={sendEmail.address}
                      onChange={handleEmailUpdate}
                      className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="py-10 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">&copy; 2021 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
