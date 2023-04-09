import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, object } from "zod";
import { useNavigate, useLocation } from 'react-router-dom';
import { IUserLogin } from '@dto/user_data';
import { loginThunk } from '@thunk/authThunk';
import { useAppDispatch } from './useAppDispatch';
import { getAuth } from 'firebase/auth';
import { useAppSelector } from './useAppSelector';

const useLogin = () => {
    const auth = getAuth();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { authUser } = useAppSelector((state) => state.user);

    const loginUserSchema = object({
        email: string().min(1, "Email is required").email("Email is invalid"),
        password: string()
            .min(1, "Password is invaild")
            .min(8, "Password is invaild")
            .max(32, "Password is invaild"),
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<IUserLogin, React.FormEventHandler<HTMLFormElement>>({
        resolver: zodResolver(loginUserSchema),
    });

    const submitLoginForm: SubmitHandler<IUserLogin> = async (
        data: IUserLogin,
        e: React.BaseSyntheticEvent | undefined
    ) => {
        e?.preventDefault();
        await dispatch(loginThunk(data));
        if (authUser) {
            navigate(location?.state?.from?.pathname || "/home", { replace: true });
        } {
            alert("Alrady have account")
        }
    };

    return {
        submitLoginForm,
        formUtils: {
            errors,
            control,
            handleSubmit,
        },
    };
};


export default useLogin;
