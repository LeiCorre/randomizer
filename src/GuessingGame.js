import { useState, useEffect } from "react";
import { getLuckyNum } from "./LuckyNum";
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import './err.css'

export function GuessingGame () {
    
    const guessRecall = parseInt(localStorage.getItem('numberOfGuesses'));
    const luckyRecall = parseInt(localStorage.getItem('luckyNumber'));
    const random = luckyRecall? luckyRecall : getLuckyNum();
    const guessNum = guessRecall? guessRecall : 0;

    const [userGuess, setUserGuess] = useState(null);
    const [guessMessage, setGuessMessage ] = useState('Start Guessing');
    const [randomNumber, setRandomNumber] = useState(random);
    const [numOfGuesses, setNumOfGuesses] = useState(guessNum);
    const [errorMessage, setErrorMessage] = useState('');

    function guessNumber(e) {
        e.preventDefault()
        setNumOfGuesses(numOfGuesses+1);
    
        if (userGuess === randomNumber) {
                setGuessMessage('You guessed the lucky number!')
        } else if (userGuess > randomNumber) {
                setGuessMessage('Your guess is too high!')
        } else if (userGuess < randomNumber) {
                setGuessMessage('Your guess is too low!')
        }

        localStorage.setItem('numberOfGuesses', numOfGuesses);
        localStorage.setItem('luckyNumber', randomNumber);

    } 


    function reset (e) {
        e.preventDefault();
        setUserGuess(null);
        setNumOfGuesses(0);
        setRandomNumber(getLuckyNum());
        localStorage.removeItem('numberOfGuesses');
        localStorage.removeItem('luckyNumber');
        document.getElementById('form').reset();
        setGuessMessage('Start Guessing');
    }


    function errorCheck (e) {
        let input = e.target.value;
        let regex = /\D/
        let tester = regex.test(input);
      
        if (input.length === 0) {
            setErrorMessage('')
        } else if (input > 100) {
            setErrorMessage('Your number is too large');
        } else if (input < 1) {
            setErrorMessage('Your number is too small');
        } else if (tester) {
            setErrorMessage('Invalid data type')
        } else {
            setErrorMessage('')
        }
    }

    useEffect(()=> {
        const ele = document.getElementById('guess');
        const button = document.getElementById('submitButton');

        if (errorMessage.length > 0) {
            ele.classList.add('error');
            button.setAttribute('disabled', true)
        } else {
            ele.classList.remove('error');
            button.removeAttribute('disabled')
        }
    }, [errorMessage])

    function valUpdate (e) {
        errorCheck(e);
        setUserGuess(parseInt(e.target.value))
    }

    return (
        <div>
            <p>I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
            <p>You have made {numOfGuesses} guesses</p>
            <Form id='form' style={{margin: '0 2rem'}}>
                <Form.Label htmlFor='guess'>Enter a Number between 1 and 100</Form.Label>
                <Form.Control style={{padding: '10px'}} required id='guess' type='text' name='guess' onChange={(e)=> valUpdate(e) }/>
                <p id='err-message' style={{color: 'red'}}>{errorMessage}</p>
                <br/>
                <Button id='submitButton' onClick={(e)=> guessNumber(e)}>Guess</Button>
            </Form>
            <br/>
            <Button onClick={(e)=> reset(e)}>Reset</Button>
            <br />
            <br/>
            {guessMessage}
        </div>
    )
}