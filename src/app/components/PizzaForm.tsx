import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, selectPizzas } from '../features/pizzaSlice';
import PizzaFormModal from './PizzaFormModal';
import { Pizza } from '../types/types';

const PizzaForm: React.FC = () => {
  const dispatch = useDispatch();
  const pizzas = useSelector(selectPizzas);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (formData: any) => {
    const activeOrdersCount = pizzas.filter((pizza) => pizza.stage !== 'Order Picked').length;
    const MAX_ORDERS = 10;

    if (activeOrdersCount >= MAX_ORDERS) {
      alert('Not taking any more orders at the moment. Maximum order limit reached.');
      return;
    }

    const { type, size, base } = formData;
    const newPizza: Pizza = {
      id: generateOrderId(),
      type,
      size,
      base,
      stage: 'Order Placed',
      createdAt: new Date(),
    };
    dispatch(addPizza(newPizza));
    setIsOpen(false);
  };

  const generateOrderId = (): string => {
    const orderIdPrefix = 'Order';
    const paddedNumber = (pizzas.length + 1).toString().padStart(3, '0');
    return `${orderIdPrefix} ${paddedNumber}`;
  };

  return (
    <div className="mt-8 mb-8">
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Place Order
      </button>
      <PizzaFormModal isOpen={isOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default PizzaForm;
