import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  username: string;
  password: string;
  passwordcheck: string;
}

function Form() {

  const { register, handleSubmit, formState: {errors}, setError } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });  

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordcheck){
      setError(
        "passwordcheck",
        { message: "비밀번호가 다릅니다!!" },
        { shouldFocus: true }
      )
      // setError("extraError", { message: "Server offline." });
    }
  }

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "Only naver.com emails allowed",
            },
          })}
        placeholder="Email"
        />
        <span>{errors?.email?.message}</span>

        <input {...register("username", {
            required: "이름을 입력해주세요",
            validate: {
              noNico: (value) =>
                value.includes("동근") ? "동근은 사용금지입니다!!" : true,
              noNick: (value) =>
                value.includes("동근2") ? "동근2은 사용금지입니다!!" : true,
            },
          })}
        placeholder="Username"
        />
        <span>{errors?.username?.message}</span>

        <input {...register("password", { 
            required: "비밀번호가 없습니다!!", 
            minLength: {
              value: 5,
              message:"비밀번호는 5이상이어야합니다!!"
            }
          })} 
          placeholder="Password" 
        />
        <span>{errors?.password?.message}</span>

        <input {...register("passwordcheck", { 
            required: "비밀번호가 없습니다!!", 
            minLength: {
              value: 5,
              message:"비밀번호는 5이상이어야합니다!!"
            }
          })} 
          placeholder="PasswordCheck" 
        />
        <span>{errors?.passwordcheck?.message}</span>

        <button>가입하기</button>
      </form>
    </div>
  );
}

export default Form;