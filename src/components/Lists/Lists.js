import React from 'react';
import deleteIcon from '../../files/pictures/Trash.png';
// 
const Lists = () => {
    const [inputList,setInputList] = React.useState('');
    const [lists,setList] = React.useState([]);
    const [msgErrorList,setMsgErrorList] = React.useState('');

    React.useEffect(() => {
        function setLocalList(){
            if(lists.length > 0){
                localStorage.setItem('list', JSON.stringify(lists));
            }
        }

        setLocalList();
    },[lists])

    React.useEffect(() => {
        function getLocalList(){
            if(localStorage.getItem('list') === null){
                localStorage.setItem('list', JSON.stringify([]));
            }else {
                const localList = JSON.parse(localStorage.getItem('list'));
                setList(localList);
            }
        }

        getLocalList();
    }, []);


    const onHandleInputText = (e) => {
        setInputList(e.target.value);
    }

    const onHandleClickText = () => {
        if(inputList !== ''){
            setList([
                ...lists, 
                {text: inputList,id: Math.random() * 1000}
            ])

            setInputList('');
            setMsgErrorList('');
        }else {
            setMsgErrorList('O campo informado é obrigatório.');
        }
    }

    const onDeleteListItem = (id) => {
        setList(lists.filter(list =>list.id !== id));
        localStorage.removeItem('list');
    }

    return (
        <div>
            <input value={inputList} className="form-control-card inputTask" onChange={onHandleInputText} type="text" placeholder="Adicione sub-itens a sua lista" />
            <label className="label-plus-card-item" onClick={onHandleClickText}></label>
            <small style={{color: 'red'}}>{msgErrorList}</small>
                {lists.map((list) => (                   
                    <div key={list.id} className="sub-items" style={{padding: '19px 14px'}}>
                        <span>{list.text}</span>   
                        <span className="list-item" onClick={() => onDeleteListItem(list.id)}><img className="card__headline_trash_item" src={deleteIcon} alt={deleteIcon} /></span>
                    </div>
                ))}
        </div>
    )
}

export default Lists;