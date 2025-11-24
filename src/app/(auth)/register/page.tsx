'use client';
import Link from 'next/link';
import React, { use } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormInput, registrationSchema } from '@/schemas/register.schema';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/features/user/userApi';
import { useRouter } from 'next/navigation';

const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IFormInput>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            terms: true,
        }
    });

    const [registerUser] = useRegisterMutation();
    const navigate = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log("Registration Data:", data);

        try {
            const res = await registerUser(data).unwrap();

            if (res.success) {

                toast(`Registration successful`);
                navigate.push('/login');
            }
            reset();


        } catch (error: unknown) {

            if (typeof error === 'object' && error !== null && 'data' in error) {

                const apiError = error as { data?: { message: string } };
                if (apiError.data?.message) {
                    toast.error(apiError.data.message);
                }
            } else {
                toast.error("A generic error occurred.");
            }
        }
    };

    return (
        <section className="_social_registration_wrapper _layout_main_wrapper">
            <div className="_shape_one">
                <img src="/assets/images/shape1.svg" alt="Decorative Shape" className="_shape_img" />
                <img src="/assets/images/dark_shape.svg" alt="Decorative Dark Shape" className="_dark_shape" />
            </div>
            <div className="_shape_two">
                <img src="/assets/images/shape2.svg" alt="Decorative Shape" className="_shape_img" />
                <img src="/assets/images/dark_shape1.svg" alt="Decorative Dark Shape" className="_dark_shape _dark_shape_opacity" />
            </div>
            <div className="_shape_three">
                <img src="/assets/images/shape3.svg" alt="Decorative Shape" className="_shape_img" />
                <img src="/assets/images/dark_shape2.svg" alt="Decorative Dark Shape" className="_dark_shape _dark_shape_opacity" />
            </div>

            <div className="_social_registration_wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="_social_registration_right">
                                <div className="_social_registration_right_image">
                                    <img src="/assets/images/registration.png" alt="Registration Illustration" />
                                </div>
                                <div className="_social_registration_right_image_dark">
                                    <img src="/assets/images/registration1.png" alt="Registration Illustration Dark" />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <div className="_social_registration_content">

                                <div className="_social_registration_right_logo _mar_b28">
                                    <img src="/assets/images/logo.svg" alt="Logo" className="_right_logo" />
                                </div>

                                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                                <h4 className="_social_registration_content_title _title4 _mar_b50">Registration</h4>

                                <button type="button" className="_social_registration_content_btn _mar_b40">
                                    <img src="/assets/images/google.svg" alt="Google Logo" className="_google_img" />
                                    <span>Register with google</span>
                                </button>

                                <div className="_social_registration_content_bottom_txt _mar_b40">
                                    <span>Or</span>
                                </div>

                                <form className="_social_registration_form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8" htmlFor="firstName">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control _social_registration_input"
                                                    id="firstName"
                                                    {...register("firstName")}
                                                />
                                                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8" htmlFor="lastName">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control _social_registration_input"
                                                    id="lastName"
                                                    {...register("lastName")}
                                                />
                                                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8" htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control _social_registration_input"
                                                    id="email"
                                                    {...register("email")}
                                                />
                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8" htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control _social_registration_input"
                                                    id="password"
                                                    {...register("password")}
                                                />
                                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_registration_form_input _mar_b14">
                                                <label className="_social_registration_label _mar_b8" htmlFor="repeatPassword">Repeat Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control _social_registration_input"
                                                    id="repeatPassword"
                                                    {...register("repeatPassword")}
                                                />
                                                {errors.repeatPassword && <p className="text-danger">{errors.repeatPassword.message}</p>}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                                            <div className="form-check _social_registration_form_check">
                                                <input className="form-check-input _social_registration_form_check_input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                                <label className="form-check-label _social_registration_form_check_label" htmlFor="flexRadioDefault2">I agree to terms & conditions</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                                            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                                                <button
                                                    type="submit"
                                                    className="_social_registration_form_btn_link _btn1 row"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Registering...' : 'Register Now'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="_social_registration_bottom_txt">
                                            <p className="_social_registration_bottom_txt_para">
                                                Already have an account? <Link href="/login">Login</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationPage;