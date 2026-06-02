import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Aeronaves from './pages/aeronaves';
import Pecas from './pages/pecas';
import VerEtapas from './pages/etapas';
import VerTestes from './pages/testes';
import GerenciarFuncionarios from './pages/funcionarios';
import Relatorio from './pages/relatorio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/aeronaves" element={<Aeronaves />} />
        <Route path='/Pecas' element={<Pecas/>}/>
        <Route path='/etapas' element={<VerEtapas/>}/> 
          <Route path='/testes' element={<VerTestes/>}/>
          <Route path='/funcionarios' element={<GerenciarFuncionarios/>}/>
          <Route path='/relatorios' element={<Relatorio/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;