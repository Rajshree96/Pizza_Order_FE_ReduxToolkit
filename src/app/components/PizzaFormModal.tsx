import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const PizzaFormModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    size: '',
    base: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-gray-800 opacity-75"></div> {/* Background overlay */}
              <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative z-20">
                <button className="absolute top-2 right-2" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 hover:text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-2xl font-bold mb-4">Place Order</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
                      Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      className="bg-gray-100 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="size">
                      Size
                    </label>
                    <select
                      name="size"
                      id="size"
                      className="bg-gray-100 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      value={formData.size}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="Large">Large</option>
                      <option value="Medium">Medium</option>
                      <option value="Small">Small</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="base">
                      Base
                    </label>
                    <select
                      name="base"
                      id="base"
                      className="bg-gray-100 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      value={formData.base}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Base</option>
                      <option value="Thin">Thin</option>
                      <option value="Thick">Thick</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PizzaFormModal;
