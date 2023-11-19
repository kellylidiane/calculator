import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    currentIndex: 0
};

export default () => {
    const [displayValue, setDisplayValue] = useState(initialState.displayValue);
    const [clearDisplay, setClearDisplay] = useState(initialState.clearDisplay);
    const [operation, setOperation] = useState(initialState.operation);
    const [values, setValues] = useState(initialState.values);
    const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
    
    const addDigit = n => {
        const clearDisplayState = (displayValue === '0' & n !== '.') || clearDisplay;
        if (n === '.' && !clearDisplayState && displayValue.includes('.')) {
            return;
        }
        const currentValue = clearDisplayState ? '' : displayValue;
        const newDisplayValue = currentValue + n;
        setDisplayValue(newDisplayValue);
        setClearDisplay(false);

        if (n !== '.') {
            const newValue = parseFloat(newDisplayValue);
            const updatedValues = [...values];
            updatedValues[currentIndex] = newValue;
            setValues(updatedValues);
        }
    }

    const clearMemory = () => {
        setDisplayValue(initialState.displayValue);
        setClearDisplay(initialState.clearDisplay);
        setOperation(initialState.operation);
        setValues(initialState.values);
        setCurrentIndex(initialState.currentIndex);
    }

    const setThisOperation = operationParam => {
        if (currentIndex === 0) {
            setOperation(operationParam);
            setCurrentIndex(1);
            setClearDisplay(true);
        } else {
            const equals = operationParam === '=';
            const currentValues = [...values];
            try {
                currentValues[0] = eval(`${currentValues[0]} ${operation} ${currentValues[1]}`);
            } catch(e) {
                currentValues[0] = currentValues[0];
            }
            currentValues[1] = 0;

            setDisplayValue(`${currentValues[0]}`);
            setOperation(equals ? null : operationParam);
            setCurrentIndex(equals ? 0 : 1);
            setClearDisplay(!equals);
            setValues(currentValues);
        }
    };

    return (
        <SafeAreaView style={style.container}>
            <Display value={displayValue} />
            <View style={style.buttons}>
                <Button label='AC' triple onClick={clearMemory} />
                <Button label='/' operation onClick={setThisOperation} />
                <Button label='7' onClick={addDigit}/>
                <Button label='8' onClick={addDigit}/>
                <Button label='9' onClick={addDigit}/>
                <Button label='*' operation onClick={setThisOperation} />
                <Button label='4' onClick={addDigit}/>
                <Button label='5' onClick={addDigit}/>
                <Button label='6' onClick={addDigit}/>
                <Button label='-' operation onClick={setThisOperation} />
                <Button label='1' onClick={addDigit}/>
                <Button label='2' onClick={addDigit}/>
                <Button label='3' onClick={addDigit}/>
                <Button label='+' operation onClick={setThisOperation} />
                <Button label='0' double onClick={addDigit} />
                <Button label='.' onClick={addDigit} />
                <Button label='=' operation onClick={setThisOperation} />
            </View>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})