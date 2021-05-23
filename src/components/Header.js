
const Header = ({title, size, family}) => {
    return (
        <header className='header' style={{fontSize: size, fontFamily: family}}>
                <p>{title}</p>
        </header>
    )
}

export default Header
