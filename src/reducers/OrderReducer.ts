import { MenuItem, OrderItem } from "../types";

// Acciones posibles para el reducer
export type OrderActions =
  | { type: "add-item"; payload: { item: MenuItem } }
  | { type: "remove-item"; payload: { itemId: MenuItem["id"] } }
  | { type: "place-order" }
  | { type: "set-tip"; payload: { value: number } };

// Estado del pedido
export type OrderState = {
  order: OrderItem[];
  tip: number;
};

// Estado inicial
export const initialState: OrderState = {
  order: [],
  tip: 0,
};

// Reducer para manejar las acciones
export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
): OrderState => {
  switch (action.type) {
    case "add-item": {
      const itemExist = state.order.find(
        (orderItem) => orderItem.id === action.payload.item.id
      );

      // Si el item ya existe en el pedido, aumentamos la cantidad
      let order: OrderItem[];
      if (itemExist) {
        order = state.order.map((orderItem) =>
          orderItem.id === action.payload.item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        // Si el item no existe, lo agregamos con cantidad 1
        const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
        order = [...state.order, newItem];
      }

      return {
        ...state,
        order,
      };
    }

    case "remove-item": {
      // Eliminamos el item del pedido
      const order = state.order.filter(
        (orderItem) => orderItem.id !== action.payload.itemId
      );

      return {
        ...state,
        order,
      };
    }

    case "place-order": {
      
      return {
        order: [], 
        tip: 0
      };
    }

    case "set-tip": {
      // Actualizamos la propina
      return {
        ...state,
        tip: action.payload.value,
      };
    }

    default:
      return state;
  }
};
