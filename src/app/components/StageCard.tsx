import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePizzaStage } from '../features/pizzaSlice';
import { Pizza, PizzaStage } from '../types/types';

interface Props {
  pizza: Pizza;
}

const StageCard: React.FC<Props> = ({ pizza }) => {
  const dispatch = useDispatch();
  const [timeElapsed, setTimeElapsed] = useState<string>('');
  const [isRed, setIsRed] = useState<boolean>(false);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (pizza.stage === 'Order Picked') {
      setTimeElapsed('Picked');
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        const currentTime = new Date();
        const diff = Math.abs(currentTime.getTime() - new Date(pizza.createdAt).getTime());
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeElapsed(`${minutes} min ${seconds} sec`);

        // Check if time elapsed is more than threshold for highlighting
        if (minutes >= getTimeThreshold(pizza.size)) {
          setIsRed(true);
        } else {
          setIsRed(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [pizza.stage, pizza.createdAt, pizza.size]);

  const handleNext = () => {
    const stages: PizzaStage[] = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];
    const currentIndex = stages.indexOf(pizza.stage);
    const nextStage = stages[currentIndex + 1];
    dispatch(updatePizzaStage({ id: pizza.id, stage: nextStage }));
  };

  const getTimeThreshold = (size: string): number => {
    switch (size) {
      case 'Small':
        return 3; // 3 minutes for Small
      case 'Medium':
        return 4; // 4 minutes for Medium
      case 'Large':
        return 5; // 5 minutes for Large
      default:
        return 3; // Default to 3 minutes
    }
  };

  const getStatusColor = () => {
    switch (pizza.stage) {
      case 'Order Placed':
        return 'bg-purple-200';
      case 'Order in Making':
        return 'bg-yellow-100';
      case 'Order Ready':
        return 'bg-green-300';
      case 'Order Picked':
        return 'bg-stone-500 text-white';
      default:
        return 'bg-white'; // Default color
    }
  };

  const getCardClassName = () => {
    if (isRed) {
      return 'shadow-lg rounded-lg p-4 bg-red-500 text-white';
    }
    return `shadow-lg rounded-lg p-4 ${getStatusColor()}`;
  };

  return (
    <div className={`${getCardClassName()} mb-4 text-center`}>
      <div className="font-bold text-lg">{pizza.type} Pizza</div>
      <div><span className="font-bold">Size:</span> {pizza.size}</div>
      <div><span className="font-bold">Base:</span> {pizza.base}</div>
      <div><span className="font-bold">Order ID:</span> {pizza.id}</div>
      <div className="mt-2"><span className="font-bold">Time Elapsed:</span> {timeElapsed}</div>
      {pizza.stage !== 'Order Picked' && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StageCard;
