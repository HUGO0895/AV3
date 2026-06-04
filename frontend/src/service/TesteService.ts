import { createTest, updateTest } from "../types/teste";
import Service from "./Service";

class TestesService extends Service<createTest,updateTest,Array<string>>{
            constructor(){
                super("http://localhost:3000/testes")
            }
}
const TesteServ=new TestesService
export default TesteServ;