import React,{useState} from 'react';
import {useFormik} from 'formik';
import {loginValidation} from './FormValidation';
import {toast} from 'react-toastify';

function LoginForm() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidation,
        onSubmit: async(data, action) => {
            console.log(data);
            try {
                let result = await axios.post('http://localhost:8080/api/user/login', data, {
                    header: {
                        'content-type': 'application/json'
                    },
                    withCredentials: true
                });
                console.log(result);
                toast.success('Welcome', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                action.resetForm();
            } catch (error) {
                toast.error('Login Failed', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        }
    })

	const [flag,setFlag]=useState(false);
	const showPassword=()=>{
		setFlag(!flag);
	}
	return (
		<div className='border border-black px-5 rounded'>
		<p className='text-center p-1 bg-blue-800 rounded-b-xl text-white'>User Login</p>
			<form className='flex flex-col gap-2 p-3' onSubmit={formik.handleSubmit}>
				<input type="email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='johndoe@gmail.com' className='border border-gray-600 outline-0 px-2 py-1'/>
				<span className='text-sm text-red-500'>
					{formik.errors.email && formik.touched.email? formik.errors.email:<p> </p>}
				</span>
				<div className='flex gap-1 items-center border border-gray-600'>
				<input type={flag?'text':'password'} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder='your password' className='outline-0 px-2 py-1'/>
				{flag?<span className='px-2 py-1' onClick={showPassword}><i className="bi bi-eye-slash"></i></span>:<span className='px-2 py-1' onClick={showPassword}><i className="bi bi-eye"></i></span>}
				</div>
				<span className='text-sm text-red-500'>
					{formik.errors.password && formik.touched.password? formik.errors.password:<p> </p>}
				</span>
				<button type='submit' className='bg-blue-800 px-2 py-1 text-white self-center'>Login</button>
			</form>
		</div>
	)
}

export default LoginForm