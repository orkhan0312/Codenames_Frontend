import Header from '../components/Header'
import Button from '../components/Button'


const Mainpage = () => {
    return (
        <div className='container'>
            <Header title="Codenames" size={200} family={'Tulpen One'}/>
            <Button text='Log in' width={150} nav="/login" />
            <br/>
            <Button text='Sign up' width={150} nav="/register"/>
            </div>
    )
}

export default Mainpage
