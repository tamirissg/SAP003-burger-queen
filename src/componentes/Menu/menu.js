
import React, {useState, useEffect} from 'react';
import firebase from '../../utils/firebase.js';
import Button from '../Button/index.js';
import Input from '../Input/index.js';
import Card from '../Card/index.js';
import '../Button/style.css';
import '../Card/style.css';
import '../Menu/style.css'
import '../Input/style.css'



const Menu = () => {
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [modal, setModal] = useState ({status:false});
  const [extra, setExtra] = useState('');
  const [options, setOptions] = useState('');


  useEffect(() => {
    firebase.firestore().collection('menu')
      .get().then((snapshot) => {
        const Breakfast = snapshot.docs.filter(doc => doc.data().Breakfast).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItem1(Breakfast)

        const Lunch = snapshot.docs.filter(doc => doc.data().Lunch).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItem2(Lunch)
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
    setOrder([...order, item])
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
 
  const verifyOptions = (item2) =>{
      if(item2.options.length !== 0){
        setModal({status: true, item: item2});
      }else{
        addItem(item2);
        
      }
  }

  const totalDeItens = order.reduce((acc, item) => acc + (item.count * item.price), 0);


  return (
    <>
     
      <section className="menu">
      <h3>Menu de Café da manhã </h3>
      <div className= "menu-item1">
        {item1.map((Breakfast) => 
        <Card handleClick={() => 
         verifyOptions(Breakfast)} key={Breakfast.id} 
         type={Breakfast.type} 
         name={Breakfast.name} 
         image={Breakfast.image} 
         price={Breakfast.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} />)}
        </div>
        <h3>Menu da Tarde</h3>
        <div className ="menu-item2">
        {item2.map((Lunch) => 
        <Card handleClick={() => 
          verifyOptions(Lunch)}  
          key={Lunch.id} 
          type={Lunch.type} 
          name={Lunch.name} 
          image={Lunch.image} 
          price={Lunch.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} />)}
        </div>
      </section>
      <section className="order">
        {order.map((product, index) => 
        <div key={product.id+index}> 
        {product.name} 
        {product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}   
        / {product.count}
        <Button id='button-delete' handleClick={(e) => {
          e.preventDefault()
          deleteItem(product);
        }} text={'DELETAR'} />
        <Button id ='button-sub' handleClick = {() => removeItem(product)} text={'-'}/>
        <Button id = 'button-add' handleClick ={() => addItem(product)} text={'+'}/>
        
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
      
        
       
        
    </>
  );
};


export default Menu