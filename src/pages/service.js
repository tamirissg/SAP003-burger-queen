
import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase.js';
import Button from '../componentes/Button/index.js';
import Input from '../componentes/Input/index.js';
import Card from '../componentes/Card/index.js';
import '../componentes/Button/index.js';
import '../componentes/Card/style.css';
import '../componentes/Input/style.css'
import '../pages/service.css'
import '../componentes/Button/style.css'
import Nav from '../componentes/nav/index.js'



const Menu = () => {
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [modal, setModal] = useState ({status:false});
  const [extra, setExtra] = useState('');
  const [options, setOptions] = useState('');


  useEffect(() => {
    firebase.firestore().collection('menu')
      .get().then((snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setBreakfast(data.filter(doc => doc.Breakfast))
        setLunch(data.filter(doc => doc.Lunch))
      })
  }, [])



  function onSubmit(e) {
    e.preventDefault()
    firebase.firestore().collection('client').add({
      client,
      table: parseInt(table),
      order
    }).then(() => {
      setTable('')
      setClient('')
      setOrder([])
    })
  }

  const addItem = (item) => {
    if (!order.includes(item)) {
      item.count = 1;
      setOrder([...order, item])
    }
    else {
      item.count += 1;
      setOrder([...order])
    }
      setExtra("");
      setOptions("");
      setModal({status:false});
  }

  const removeItem =(item) => {
    if(item.count === 1){
      const removeItens = order.filter(product => {
        return product !== item
      })
      setOrder([...removeItens])
    }else{
      item.count --;
      setOrder([...order])
    }
  }

  const deleteItem = (item) => {
    const remove = (order.indexOf(item))
    order.splice(remove, 1);
    setOrder([...order]);
  }


  const totalDeItens = order.reduce((acc, item) => acc + (item.count * item.price), 0);


  return (

   <>
   <Nav/>
    <div className="container">
      <section className="menu">
      
        <MenuList title="Menu de Café da manhã" list={breakfast} addItem={addItem} setModal={setModal}/>
        <MenuList title="Menu da Tarde" list={lunch} addItem={addItem} setModal={setModal}/>
      </section>
      <section className="order">
        {order.map((product, index) => 
        <div key={product.id+index}> 
        {product.name} 
        {product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}   
        / {product.count}
        <div>
          <Button id='button-delete' handleClick={(e) => {
            e.preventDefault()
            deleteItem(product);
          }} text={'DELETAR'} />
          <Button id ='button-sub' handleClick = {() => removeItem(product)} text={'-'}/>
          <Button id = 'button-add' handleClick ={() => addItem(product)} text={'+'}/>
          
        </div>
        
        </div>)}
        <p>Total = {totalDeItens.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
      
        {modal.status ? (
            <>
            <h4>Extras</h4>
            <div>{modal.item.extra.map(elem => (<> 
            <input type="radio" name="extra" value={elem} onChange={() => 
              setExtra(`${extra} ${elem}`)}/>
            <label>{elem}</label></>))}
          
          </div>
          <h4>Opções</h4>
            <div>{modal.item.options.map(elem => (<> 
            <input type="radio" name="options" value={elem} onChange={() => 
              setOptions(`${options} ${elem}`)}/>
            <label>{elem}</label></>))}
            <button onClick={() => 
            addItem({...modal.item, name: modal.item.name  + " " + options + extra})}> Adicionar</button>
          </div>
          </>  
        ): false}
        
        <div>
        <p>Pedidos</p>
          <strong className="cliente">Cliente</strong>
        <Input id='input-text' type='text' state={client} handleChange={e => setClient(e.currentTarget.value)} />
        <label>
        <strong  className="mesa">Mesa</strong>
        </label>
        <Input id='input-number' type='number' state={table} handleChange={e => setTable(e.currentTarget.value)} />
        <Button id='button-send' handleClick={onSubmit} text={'ENVIAR'} />
        </div>
        </section>
      
        
       
        
    </div>
    </>
  );
};

function MenuList(props) {
  const verifyOptions = (item2) =>{
    if(item2.options.length !== 0){
      props.setModal({status: true, item: item2});
    }else{
      props.addItem(item2);
      
    }
}

  return (
    <div>
    <h3>{props.title}</h3>
    <div className ="menu-item">
      {props.list.map((item) => 
        <Card handleClick={() => 
          verifyOptions(item)}  
          key={item.id} 
          type={item.type} 
          name={item.name} 
          image={item.image} 
          price={item.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} />)}
    </div>
  </div>
  
  )

} 


export default Menu