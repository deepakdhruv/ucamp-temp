import React, { useReducer, createContext, useContext } from 'react';

// Create contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle actions
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if the item already exists in the cart
            const existingItem = state.find(item => item.id === action.id);
            if (existingItem) {
                // Update the quantity if the item exists
                return state.map(item =>
                    item.id === action.id
                        ? { ...item, qty: item.qty + action.qty }
                        : item
                );
            } else {
                // Add the new item if it doesn't exist
                return [
                    ...state,
                    {
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        qty: action.qty,
                        size: action.size,
                    }
                ];
            }
            case "DROP":
                let emparr=[]
                return emparr;
        case "REMOVE":
            // Remove an item completely
            return state.filter(item => item.id !== action.id);

        case "DECREASE_QTY":
            // Decrease the quantity of an item or remove it if the quantity is 1
            return state.map(item =>
                item.id === action.id
                    ? { ...item, qty: item.qty - 1 }
                    : item
            ).filter(item => item.qty > 0); // Remove items with qty <= 0

        case "CLEAR":
            // Clear the cart
            return [];

        default:
            console.error("Unknown action type in reducer:", action.type);
            return state;
    }
};


// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks for accessing the state and dispatch
export const UseCart = () => useContext(CartStateContext); // For state
export const UseDispatchCart = () => useContext(CartDispatchContext); // For dispatch