import '../index.css'
import Navbar from '../components/navbar';
import VerAeronaves from '../components/aeronaves/verAero';

function Aeronaves(){
    return ( 
      
       <div className='flex flex-col'>
          <Navbar/>
          <VerAeronaves/>
         
        </div>

 
      
       
    );


}



export default Aeronaves;