import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [amount, setAmount] = useState(0)
    const [sum, setSum] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
        setAmount(amount + 1)
        setSum(sum + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAmount(amount + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
        setAmount(amount + 1)
        setSum(sum - 1)
    }

    const options = ['good', 'neutral', 'bad']

    return (
        <div>
            <h1>give feedback</h1>
            <Buttons handleGoodClick={handleGoodClick}
                handleNeutralClick={handleNeutralClick}
                handleBadClick={handleBadClick}
                options={options}
            />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} amount={amount} sum={sum} />
        </div>
    )

}

const Buttons = ({ handleGoodClick, handleNeutralClick, handleBadClick, options }) => {
    return (
        <div>
            <Button onClick={handleGoodClick} text={options[0]} />
            <Button onClick={handleNeutralClick} text={options[1]} />
            <Button onClick={handleBadClick} text={options[2]} />
        </div>
    )
}

const Button = ({ onClick, text }) => {

    return (
        <button onClick={onClick}>{text}</button>
    )

}

const Statistics = ({ good, neutral, bad, amount, sum }) => {

    const countAverage = () => {
        return sum / amount
    }
    const countPositivePercentage = () => {
        const percentage = good / amount * 100
        return `${percentage} %`
    }

    if (amount === 0) {
        return 'No feedback given'
    }
    return (
        <table>
            <tbody>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={amount} />
                <Statistic text='average' value={countAverage()} />
                <Statistic text='positive' value={countPositivePercentage()} />
            </tbody>
        </table>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}



ReactDOM.render(<App />,
    document.getElementById('root')
)