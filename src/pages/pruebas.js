import useUser from '../hooks/use-user'
import Upload from '../components/post/upload'


const Pruebas = () => {

    const { user } = useUser()
    console.log(user.rol)

    return (
        <div className='text-white-normal'>
            {/* <Upload /> */}
            {/* {
                !user.rol === 'free' ? <Otro /> 
                : user.rol === 'diamond' ?
                 <UserView /> 
                 : user.rol === 'model' ? 
                 <Upload /> : null
                 
            } */}
        </div>
    )
}

export default Pruebas
