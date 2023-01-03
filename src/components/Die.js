function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div 
            className="die-background" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-number">{props.value}</h2>
        </div>
    );
}

export default Die;