export type PizzaStage = 'Order Placed' | 'Order in Making' | 'Order Ready' | 'Order Picked';

export interface Pizza {
  id: string;
  type: string;
  size: string;
  base: string;
  stage: PizzaStage;
  createdAt: Date;
}
