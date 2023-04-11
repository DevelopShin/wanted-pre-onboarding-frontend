import React, { useCallback, useState } from 'react';
import useInput from 'hooks/useInput';
import axios from 'axios';
function Item({ data }) {
  const [isEdit, setIsEdit] = useState(false);
  const [todo, onChangeTodo, setTodo] = useInput(data.todo);
  const [bChecked, setChecked] = useState(data.isCompleted);

  const checkHandler = async ({ target }) => {
    setChecked(!bChecked);
    await axios.put(`api/todos/${data.id}`, {
      todo: todo,
      isCompleted: !bChecked,
    });
  };

  const submitUpdate = useCallback(async () => {
    await axios
      .put(`api/todos/${data.id}`, {
        todo: todo,
        isCompleted: bChecked,
      })
      .then((res) => res.data.id && setIsEdit(false))
      .catch((e) => console.log(e.response));
  }, [bChecked, data.id, todo]);

  const submitRemove = useCallback(async () => {
    if (window.confirm('삭제합니다.')) {
      await axios.delete(`api/todos/${data.id}`);
      //상태관리 라이브러리(react-qeury, redux...) 사용하면 api호출없이 적용가능
      window.location.reload();
    }
  }, [data.id]);

  const onClickCancel = useCallback(() => {
    setTodo(data.todo);
    setIsEdit(false);
  }, [data.todo, setTodo]);

  const onClienEdit = (second) => {
    setIsEdit(true);
  };

  return (
    <li className="item">
      {!isEdit ? (
        <>
          <label>
            <input
              type="checkbox"
              checked={bChecked}
              onChange={(e) => checkHandler(e)}
            />
            <span>{todo}</span>
          </label>
          <span className="btc-gr">
            <button
              data-testid="modify-button"
              className="edit"
              onClick={onClienEdit}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              className="remove"
              onClick={submitRemove}
            >
              삭제
            </button>
          </span>
        </>
      ) : (
        //수정
        <div className="edit-form">
          <input
            data-testid="modify-input"
            value={todo}
            onChange={onChangeTodo}
          />
          <span className="btc-gr">
            <button data-testid="submit-button" onClick={submitUpdate}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={onClickCancel}>
              취소
            </button>
          </span>
        </div>
      )}
    </li>
  );
}

export default Item;

// function Item({ data }) {
//   const [isEdit, setIsEdit] = useState(false);
//   const [todo, onChangeTodo] = useInput(data.todo);

//   const edit = () => {
//     axios.put(`api/todos/${data.id}`, data);
//   };
//   const remove = () => {
//     axios.delete(`api/todo/${data.id}`);
//   };
//   return (
//     <li>
//       {!isEdit ? (
//         <>
//           <label>
//             <input type="checkbox" />
//             <span>{todo}</span>
//           </label>
//           <span className="btc-gr">
//             <button
//               data-testid="modify-button"
//               className="edit"
//               onClick={setIsEdit(true)}
//             >
//               수정
//             </button>
//             <button data-testid="delete-button" className="remove">
//               삭제
//             </button>
//           </span>
//         </>
//       ) : (
//         <>
//           <input value={todo} onChange={onChangeTodo} />
//           <button>제출</button>
//           <button onClick={setIsEdit(false)}>취소</button>
//         </>
//       )}
//     </li>
//   );
// }

// export default Item;
