import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, object } from "zod";
import { useNavigate, useLocation } from 'react-router-dom';
import { IUserRegistration } from '@dto/user_data';
import { signupThunk } from '@thunk/authThunk';
import { useAppDispatch } from './useAppDispatch';
import { getAuth } from 'firebase/auth';
import { useAppSelector } from './useAppSelector';

const useSignup = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { authUser } = useAppSelector((state) => state.user);


    const signupUserSchema = object({
        email: string().min(1, "Email is required").email("Email is invalid"),
        password: string()
            .min(1, "Password is required")
            .min(8, "Password must be more than 8 characters")
            .max(32, "Password must be less than 32 characters"),
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<IUserRegistration, React.FormEventHandler<HTMLFormElement>>({
        resolver: zodResolver(signupUserSchema),
    });

    const submitSingupForm: SubmitHandler<IUserRegistration> = async (
        data: IUserRegistration,
        e: React.BaseSyntheticEvent | undefined
    ) => {
        e?.preventDefault();
        await dispatch(signupThunk(data));
        if (authUser?.uid) {
            navigate(location?.state?.from?.pathname || "/home", { replace: true });
        }else{
            alert("user alrady created")
        }
    };

    return {
        submitSingupForm,
        formUtils: {
            errors,
            control,
            handleSubmit,
        },
    };
};


export default useSignup;
