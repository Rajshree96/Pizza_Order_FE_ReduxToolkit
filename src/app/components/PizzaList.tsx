import React from 'react';
import { useSelector } from 'react-redux';
import { selectPizzas } from '../features/pizzaSlice';
import StageCard from './StageCard';
import { PizzaStage } from '../types/types';

const PizzaList: React.FC = () => {
  const pizzas = useSelector(selectPizzas);

  const filterPizzasByStage = (stage: PizzaStage) => {
    return pizzas.filter((pizza) => pizza.stage === stage);
  };

  const activeOrders = pizzas.filter(
    (pizza) => pizza.stage !== 'Order Picked' && pizza.stage !== 'Cancelled'
  );

  const isMaxOrdersReached = activeOrders.length >= 10;

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {!isMaxOrdersReached && (
        <>
          <div>
            <h2 className="text-lg font-bold mb-4">Order Placed</h2>
            {filterPizzasByStage('Order Placed').map((pizza) => (
              <StageCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Order in Making</h2>
            {filterPizzasByStage('Order in Making').map((pizza) => (
              <StageCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Order Ready</h2>
            {filterPizzasByStage('Order Ready').map((pizza) => (
              <StageCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Order Picked</h2>
            {filterPizzasByStage('Order Picked').map((pizza) => (
              <StageCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PizzaList;
