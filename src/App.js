import React from 'react';
import penSquare from './files/icons/pen-to-square-solid.svg';
import delIcon from './files/pictures/Trash.png';
import clarifyDragHandle from './files/pictures/clarity_drag-handle-line.png';
import Header from './components/Header/Header';
import Lists from './components/Lists/Lists';
import Footer from './components/Footer/Footer';

const App = () => {
  const [activities,setactivities] = React.useState([]);
  const [Text, setText] = React.useState('');
  const [Error,setError] = React.useState('');
  const Drag = React.useRef(null);
  const Drag2 = React.useRef(null);

  React.useEffect(() => {
    const getTasks = () => {
      if(localStorage.getItem("activities") === null){
        localStorage.setItem("activities", JSON.stringify(activities));
      }else {
        let localTask = JSON.parse(localStorage.getItem('activities'));
        setactivities(localTask);
      }
    }
    getTasks();
  }, []);

  React.useEffect(() => {
    const setLocalTask = () => {
      if(activities.length > 0){
        localStorage.setItem("activities", JSON.stringify(activities));
      }
    }
    setLocalTask();
  },[activities])

  const handleClick = () => {
    if(Text !== ''){
      setactivities([...activities,{
          text: Text,
          id: (Math.random() * 1000),
        }
      ])
      setText('');
      setError('');
    }else {
      setError('Campo obrigatório.');
    } 
  }

  const onUpdateItems = (e,id) => {
    const button = e.target.parentNode;
    button.hidden = true;
    const salvarAndUpdate = {
      edit(){
        const mainCard = e.target.parentNode.parentNode.parentNode;
        const div = mainCard.firstElementChild;
        const h3 = div.lastElementChild;
        const input = document.createElement('input');

        input.className = 'input_update_text';
        input.type = 'text';
        input.value = h3.textContent;
        div.insertBefore(input,h3);
        div.removeChild(h3);
      },
    }

    const salvar = (x) => {   
      if(x.target.tagName === 'INPUT'){ 
        if(x.key === 'Enter'){ 
          const inputText = x.target;
          const divInput = inputText.parentNode;
          const h3title = document.createElement('h3');
          h3title.className = 'mt-0 mb-0 card__headline_title';
          h3title.textContent = inputText.value;
          divInput.insertBefore(h3title,inputText);
          divInput.removeChild(inputText);
          button.hidden = false;
          window.removeEventListener('keydown', salvar);
        }
      }
    }
    
    if(id){
      salvarAndUpdate.edit();
      window.addEventListener('keydown', salvar);
    }
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }
  const onHandleDelete = (id) => {
    setactivities(activities.filter(task => task.id !== id));
  }

  const onHandleSortable = () => {
    let _activities = [...activities];
    let draggedItemContent = _activities.splice(Drag.current,1)[0]; 
    _activities.splice(Drag2.current,0,draggedItemContent);
    Drag.current = null;
    Drag2.current = null;
    setactivities(_activities);
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
          <input value={Text} className="form-control inputTask inputTask1" onChange={(handleChange)} type="text" placeholder="Qual lista você deseja criar?" style={{padding: '20px 0 20px 20px'}}/>
          <label className="label-plus" onClick={handleClick}></label>
          <small style={{color: '#e74c3c'}}>{Error}</small>
      </div>
      <div className="main-card container">
            {activities && activities.map((task,index) => (
              <div 
                key={task.id} className="card" draggable onDragStart={() => Drag.current = index} onDragEnter={() => Drag2.current = index} onDragEnd={onHandleSortable}>
                  <div className="card__headline">
                      <div className="card__headline_item_1">
                          <img src={clarifyDragHandle} alt={clarifyDragHandle} style={{heigth: '20px'}}/>
                          <h3 className="mt-0 mb-0 card__headline_title">{task.text}</h3>
                      </div>
                      <div className='card__trash'>
                          <button className='edit_button' onClick={(e) => onUpdateItems(e,task.id)}><img src={penSquare} alt={task.text} style={{width: '17px',height: '17px',position: 'relative', top: '7px',marginRight: '10px'}}/></button>
                          <span onClick={() => onHandleDelete(task.id)}><img className="card__headline_trash" src={delIcon} alt={delIcon} /></span>
                      </div>
                  </div>
                  <div className="card_input_sub_items">                    
                    <Lists activities={activities} indexElement={index} id={task.id} />
                  </div>
              </div>
            ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
