"use client";


import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PizzaForm from './components/PizzaForm';
import PizzaList from './components/PizzaList';
import StageCard from './components/StageCard';
import { useSelector, useDispatch } from 'react-redux';
import { selectPizzas, cancelPizza } from './features/pizzaSlice';
import { Pizza } from './types/types';

const Home: React.FC = () => {
  const pizzas = useSelector(selectPizzas);
  const dispatch = useDispatch();

  const handleCancelOrder = (id: string) => {
    dispatch(cancelPizza(id));
  };

  // Function to calculate total time spent for a pizza
  const calculateTotalTimeSpent = (pizza: Pizza): string => {
    const currentTime = new Date();
    const diff = Math.abs(currentTime.getTime() - new Date(pizza.createdAt).getTime());
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes} min ${seconds} sec`;
  };

  // Function to get total number of delivered pizzas
  const getTotalDelivered = (): number => {
    return pizzas.filter((pizza) => pizza.stage === 'Order Picked').length;
  };

  return (
    <>
      <div className="container mx-auto">
        <Head>
          <title>Pizza Shop</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">Pizza Shop</h1>

          {/* Place PizzaForm component here */}
          <PizzaForm />

          <h2 className="text-xl font-semibold mt-8 mb-4">Pizza Stages</h2>

          {/* Display each pizza in a stage card */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <h2 className="text-lg font-bold mb-4">Order Placed</h2>
              {pizzas
                .filter((pizza) => pizza.stage === 'Order Placed')
                .map((pizza) => (
                  <StageCard key={pizza.id} pizza={pizza} />
                ))}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Order in Making</h2>
              {pizzas
                .filter((pizza) => pizza.stage === 'Order in Making')
                .map((pizza) => (
                  <StageCard key={pizza.id} pizza={pizza} />
                ))}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Order Ready</h2>
              {pizzas
                .filter((pizza) => pizza.stage === 'Order Ready')
                .map((pizza) => (
                  <StageCard key={pizza.id} pizza={pizza} />
                ))}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Order Picked</h2>
              {pizzas
                .filter((pizza) => pizza.stage === 'Order Picked')
                .map((pizza) => (
                  <StageCard key={pizza.id} pizza={pizza} />
                ))}
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Pizza Orders</h2>

          {/* Table displaying pizza orders */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-200 border border-gray-300">Order ID</th>
                  <th className="px-6 py-3 bg-gray-200 border border-gray-300">Stage</th>
                  <th className="px-6 py-3 bg-gray-200 border border-gray-300">Size</th>
                  <th className="px-6 py-3 bg-gray-200 border border-gray-300">Total Time Spent</th>
                  <th className="px-6 py-3 bg-gray-200 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {pizzas.map((pizza) => (
                  <tr key={pizza.id}>
                    <td className="px-6 py-4 border border-gray-300">{pizza.id}</td>
                    <td className="px-6 py-4 border border-gray-300">{pizza.stage}</td>
                    <td className="px-6 py-4 border border-gray-300">{pizza.size}</td>
                    <td className="px-6 py-4 border border-gray-300">
                      {pizza.stage !== 'Order Picked' ? '-' : calculateTotalTimeSpent(pizza)}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      {pizza.stage !== 'Order Picked' && (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleCancelOrder(pizza.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Display total pizza orders delivered */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Total Pizza Orders Delivered</h2>
            <p className="text-lg">{getTotalDelivered()}</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

