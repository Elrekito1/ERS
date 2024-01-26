import {useSpring, animated as a} from "react-spring"
import "./SpringIn.css"

const SpringIn = ({children}) => {
    const animatedProps = useSpring({
        opacity: 1,
        from: {opacity: 0},
        config: {mass: 1, tension: 150, friction: 10},
    })
}