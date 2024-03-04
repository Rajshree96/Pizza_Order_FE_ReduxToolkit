import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Pizza, PizzaStage } from '../types/types';

interface PizzaState {
  pizzas: Pizza[];
  activeOrders: number;
}

const initialState: PizzaState = {
  pizzas: [],
  activeOrders: 0,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<Pizza>) => {
      // Check if the number of active orders (excluding 'Order Picked') is less than 10
      const activeNonPickedOrders = state.pizzas.filter(pizza => pizza.stage !== 'Order Picked');
      if (activeNonPickedOrders.length < 10) {
        state.pizzas.push(action.payload);
        state.activeOrders++;
      } else {
        console.log('Not taking any more orders at the moment.');
      }
    },
    updatePizzaStage: (state, action: PayloadAction<{ id: string; stage: PizzaStage }>) => {
      const { id, stage } = action.payload;
      const pizza = state.pizzas.find((pizza) => pizza.id === id);
      if (pizza) {
        const currentStage = pizza.stage;
        pizza.stage = stage;
        if (currentStage !== 'Order Picked' && stage === 'Order Picked') {
          state.activeOrders--;
        } else if (currentStage === 'Order Picked' && stage !== 'Order Picked') {
          state.activeOrders++;
        }
      }
    },
    cancelPizza: (state, action: PayloadAction<string>) => {
      state.pizzas = state.pizzas.filter((pizza) => {
        if (pizza.id === action.payload) {
          if (pizza.stage !== 'Order Picked') {
            state.activeOrders--;
          }
          return false;
        }
        return true;
      });
    },
  },
});

export const { addPizza, updatePizzaStage, cancelPizza } = pizzaSlice.actions;

export const selectPizzas = (state: RootState) => state.pizza.pizzas;

export default pizzaSlice.reducer;
