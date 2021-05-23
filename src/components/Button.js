import './Button.css'
const Button = ({text, nav, width}) => {
    return (
        <div>
            {/*<button className='btn'>{text}</button> */}
            <a href={nav} className="btn" style={{width: width}}>{text}</a>
        </div>
    )
}

export default Button
