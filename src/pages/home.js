
import React, {useState, useEffect} from 'react';
import firestore from '../utils/firebaseUtils.js';
import Button from '../componentes/Button/index.js';
import Input from '../componentes/Input/index.js';
import Card from '../componentes/Card/index.js';
import Header from '../componentes/Header/index.js';
import '../componentes/Button/style.css';
import '../componentes/Card/style.css';
import '../componentes/Header/style.css';

const AddClientInfo = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [itens1, setItens1] = useState([]);
    const [itens2, setItens2] = useState([]);
    
    useEffect(() => {
        firestore.collection('menu')
            .get().then((snapshot) => {
                    const products = snapshot.docs.filter(doc =>doc.data().Breakfast).map((doc) => ({
                        id: doc.id,
                        ...doc.data()
            }))
                    setItens1(products)

                    const products2 = snapshot.docs.filter(doc =>doc.data().Lunch).map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setItens2(products2)
                })

        },[])

     
    function onSubmit(e) {
        e.preventDefault()
        firestore.collection('client').add({
                client,
                table: parseInt(table),
                pedidos,
               
            }).then(()=>{
               setTable('')
               setClient('')
               setPedidos([])
           
                
            }) 
    }
    
    const resumo = (item) =>{
        setPedidos([...pedidos, item])
    }

    return (
        <>
         <Header/>
           
          <div className='menu'>

            {itens1.map((Breakfast) => <Card handleClick={() => 
            resumo(Breakfast)} key={Breakfast.id} text={Breakfast.name} price={Breakfast.price}/>)}
                
            {itens2.map((Lunch) => <Card handleClick={() => resumo(Lunch)} key={Lunch.id} text={Lunch.name} price={Lunch.price} />)}
                
            {pedidos.map(product => <div key={product.id}> {product.name} {product.price}</div>)}
         </div>
            <div>
               <label>
                 <h5>CLIENTE</h5>
                 </label>
                 <Input id='input-number' type="text" state={client} handleChange={e => setClient(e.currentTarget.value)}/>
                 <label>
                 <h5>MESA</h5>
                 </label>
                 <Input id='input-number' type="number" state={table} handleChange={e => setTable(e.currentTarget.value)}/>
                 <Button id='btn-enviar' handleClick={onSubmit} text={'ENVIAR'}/>
                </div>  
        </>
    ); 
};

export default AddClientInfo;