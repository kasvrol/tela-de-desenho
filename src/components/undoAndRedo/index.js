import { useState } from "react";

export const useHistory = (state) => {
    const initialState = []
    const [index, setIndex] = useState(0);
    const [elements, setElements] = useState([state]);

    const setState = (action, overwrite = false) => {
        const newState =
            typeof action === "function" ? action(elements[index]) : action;

        if (overwrite) {
            const elementsCopy = [...elements];
            elementsCopy[index] = newState;
            setElements(elementsCopy);
        } else {
            const updatedState = [...elements].slice(0, index + 1);
            setElements([...updatedState, newState]);
            setIndex((prevState) => prevState + 1);
        }
    };

    const undo = () => {
        index > 0 && setIndex((prevState) => prevState - 1);
    };

    const redo = () => {
        index < elements.length - 1 && setIndex((prevState) => prevState + 1);
    };

    const clear = () => {
        setIndex(0)
        setElements([initialState])
    };

    return [elements[index], setState, undo, redo, clear];
};