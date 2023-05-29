const Total = ({exercises}) => {
    const total = exercises.map((part) => part.exercises).reduce((a, b) => a + b, 0)
    return (
        <>
        <b>Total of {total} exercises</b>
        </>
    )
}

export default Total