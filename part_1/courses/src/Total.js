const Total = ({exercises}) => {
    const total = exercises.map((part) => part.exercises).reduce((a, b) => a + b, 0)
    return (
        <>
        <p>Number of exercises {total}</p>
        </>
    )
}

export default Total