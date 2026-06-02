import '../index.css'
import Navbar from '../components/navbar';
import VerPecas from '../components/pecas/verPecas'; // Certifique-se que o caminho está correto

function Pecas(){
    return ( 
       <div className='flex flex-col'>
       
          <Navbar />

        
          <main >
             <VerPecas />
          </main>
       </div>
    );
}
export default Pecas