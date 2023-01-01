function Die(props) {
    return (
        <div className="die-background">
            <h2 className="die-number">{props.value}</h2>
        </div>
    );
}

export default Die;