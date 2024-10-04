import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import toast from 'react-hot-toast';

import InputField from '@components/InputField';
import Button from '@components/Button';

import { loggedIn, setLoginLoading } from './reducer';
import { selectLoginLoading } from './selectors';
import { doLogin } from './thunk';
import { persistor } from '@store/configureStore';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isLoading = useAppSelector(selectLoginLoading);
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z
    .object({
      email: z.string().email({ message: t('form_email_validation_invalid') }),
      password: z.string().min(6, { message: t('form_password_validation_min') }),
    })
    .strict();
  type formData = z.infer<typeof loginSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<formData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'wanrif@test.com',
      password: 'password',
    },
  });

  const onSubmit: SubmitHandler<formData> = async (data) => {
    try {
      dispatch(setLoginLoading(true));

      const response = await dispatch(doLogin(data)).unwrap();
      console.log('response ->', response);
      persistor.flush();
      dispatch(loggedIn(response));

      reset();
      const from = location.state?.from || '/';
      navigate(from);
    } catch (err: any) {
      if (err.status === 404) {
        toast.error(err.message, {
          position: 'top-right',
        });
      } else {
        setError(err.data?.message || err.message);
      }
    } finally {
      dispatch(setLoginLoading(false));
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-primary-300 text-primary-200 dark:text-primary-50 px-5'>
      <form
        autoComplete='off'
        className='p-5 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-none border-gray-100 w-full max-w-[400px]'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='text-4xl font-bold text-center flex flex-col justify-center items-center'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/2170/2170153.png'
            alt='Logo'
            loading='eager'
            className='h-20 w-20'
            onClick={() => navigate('/')}
          />
          <h1>{t('form_login_title')}</h1>
        </div>
        {error && <div className='text-red-500 text-center mt-3'>{error}</div>}
        <div className='mt-3'>
          <InputField
            autoFocus
            type='email'
            placeholder={t('form_login_email_placeholder')}
            register={register}
            name='email'
            error={errors.email?.message}
          />
        </div>
        <div className='mt-3'>
          <InputField
            type='password'
            placeholder={t('form_login_password_placeholder')}
            register={register}
            name='password'
            error={errors.password?.message}
          />
        </div>
        <div className='mt-3'>
          <Button
            text={isLoading ? t('form_login_loading') : t('form_login_submit')}
            type='submit'
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
